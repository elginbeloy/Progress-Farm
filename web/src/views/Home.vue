<template>
  <div class="home">
    <AddTask :addTask="addTask" />
    <div class="header">Ongoing Sprints</div>
    <div class="sprints-container">
      <Sprint v-for="sprint in sprints" :key="sprint.id" :sprint="sprint" />
    </div>
    <div class="tasks-container">
      <div class="flex-column" style="margin-right: 60px; min-width: 600px;">
        <div class="header">
          <a>Overdue</a>
          <div class="header-badge">x2</div>
        </div>
        <Task v-for="task in overdueTasks" :key="task.id" :task="task" :deleteTask="deleteTask" />
      </div>
      <div class="flex-column" style="margin-right: 60px; min-width: 600px;">
        <div class="header">Today</div>
        <Task v-for="task in todaysTasks" :key="task.id" :task="task" :deleteTask="deleteTask" />
      </div>
      <div class="flex-column" style="min-width: 600px;">
        <div class="header">Coming Up</div>
        <Task v-for="task in comingUpTasks" :key="task.id" :task="task" :deleteTask="deleteTask" />
      </div>
      <div class="flex-column" style="margin-right: 60px; min-width: 600px;">
        <div class="header">
          <a>Completed!</a>
        </div>
        <Task v-for="task in completedTasks" :key="task.id" :task="task" :deleteTask="deleteTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Task as TaskType, TaskState } from "@/types/Task.ts";
import { Sprint as SprintType, currentSprints } from "@/types/Sprint.ts";
import { User } from "@/types/User.ts";
import gql from "graphql-tag";
import Task from "@/components/Task.vue";
import Sprint from "@/components/Sprint.vue";
import AddTask from "@/components/AddTask.vue";
import { LIST_TASKS } from "@/graphql/ListTasks.graphql.ts";

@Component({
  components: {
    Task,
    Sprint,
    AddTask
  },
  apollo: {
    tasks: LIST_TASKS,
    user: gql`
      query {
        user: getUser(id: "5e819b7d2bd59c41f04601b6") {
          username
          password
          money
        }
      }
    `
  }
})
export default class Home extends Vue {
  user!: User;
  tasks: TaskType[] = [];
  sprints: SprintType[] = currentSprints;

  deleteTask(id: string) {
    this.$apollo.mutate({
      mutation: gql`
        mutation deleteTask($id: String!) {
          deleteTask(id: $id) {
            id
            title
          }
        }
      `,
      variables: {
        id: id
      },
      update: store => {
        const data = store.readQuery({ query: LIST_TASKS });
        const index = data.tasks.findIndex((task: TaskType) => task.id == id);

        if (index !== -1) {
          data.tasks.splice(index, 1);
        }

        store.writeQuery({ query: LIST_TASKS, data });
      }
    });
  }

  addTask(task: Omit<TaskType, "id">) {
    this.$apollo.mutate({
      mutation: gql`
        mutation addTask($task: TaskInput) {
          addTask(task: $task) {
            id
            title
            body
            impact
            category
            state
            dueDate
            dateCreated
          }
        }
      `,
      variables: {
        task: task
      },
      update: (store, { data: { addTask } }) => {
        const data = store.readQuery({ query: LIST_TASKS });
        data.tasks.push(addTask);
        store.writeQuery({ query: LIST_TASKS, data });
      }
    });
  }

  get uncompletedTasks() {
    console.log(this.tasks.filter(task => task.state !== TaskState.COMPLETED));
    return this.tasks.filter(task => task.state !== TaskState.COMPLETED);
  }

  get completedTasks() {
    return this.tasks.filter(task => task.state === TaskState.COMPLETED);
  }

  get overdueTasks() {
    return this.uncompletedTasks.filter(
      task => new Date(task.dueDate).getDate() < new Date().getDate()
    );
  }

  get todaysTasks() {
    return this.uncompletedTasks.filter(
      task => new Date(task.dueDate).getDate() === new Date().getDate()
    );
  }

  get comingUpTasks() {
    return this.uncompletedTasks.filter(
      // If due date is tomorrow.
      task => new Date(task.dueDate).getDate() > new Date().getDate()
    );
  }
}
</script>

<style scoped lang="scss">
.home {
  position: absolute;
  top: 0;
  left: 100px;
  width: calc(100% - 100px);
  height: 100%;
  padding: 40px;

  background-color: #fafafd;
  overflow: auto;

  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.header-badge {
  position: relative;
  margin-left: 10px;
  padding: 4px 12px;

  border-radius: 4px;
  background-color: #ff572820;
  color: #ff5728;
  font-size: 12px;
}

.sprints-container,
.tasks-container {
  position: relative;
  max-width: 1000px;
  min-width: 600px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
