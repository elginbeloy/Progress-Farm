<template>
  <div class="task">
    <div class="task-info">
      <input type="text" placeholder="Title..." class="task-input title-input" v-model="task.title" />
      <textarea class="task-input body-input" placeholder="Body..." v-model="task.body" />
      <input type="number" placeholder="Impact #" class="task-input" v-model.number="task.impact" />
      <div class="categories-container">
        <div
          class="category-option"
          v-for="category in TaskCategory"
          :title="category"
          :key="category"
          :class="{ 'category-option--selected': task.category === category }"
          :style="{
            color: categoryColors[category],
            backgroundColor: categoryColors[category] + '25'
          }"
          @click="task.category = category"
        >
          <span :class="categoryIcons[category]" />
        </div>
      </div>
      <div class="categories-container">
        <div
          class="category-option"
          v-for="state in TaskState"
          :title="state"
          :key="state"
          :class="{ 'category-option--selected': task.state === state }"
          :style="{
            color: stateColors[state],
            backgroundColor: stateColors[state] + '25'
          }"
          @click="task.state = state"
        >
          <span :class="stateIcons[state]" />
        </div>
      </div>
      <button class="update-task-button" @click="submit">Update</button>
    </div>
    <div class="focus">
      <div class="title">Growth / Second: {{ task.impact }}</div>
      <div class="title">Seconds this session: {{ secondsFarmed }}</div>
      <div class="focus-plant" v-for="tile in plantTiles" :key="tile.plant">
        <img :src="plants[tile.plant].avatar(getState(tile))" />
        <a>{{ tile.plant }}</a>
        <a>{{ tile.timeLeft }}</a>
      </div>
      <button
        class="focus-button"
        @click="toggleFocus"
      >{{ focusInterval ? "Stop Focus" : "Start Focus" }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "@/hooks.ts";
import { User } from "@/types/User.ts";
import { GET_TASK } from "@/graphql/GetTask.graphql.ts";
import gql from "graphql-tag";
import {
  Task,
  TaskCategory,
  TaskState,
  categoryColors,
  categoryIcons,
  stateColors,
  stateIcons
} from "../types/Task";
import { PlantType, plants, Tile } from "../types/Tile";

@Component({})
export default class Focus extends Vue {
  user: Pick<User, "id" | "tiles"> = { id: "", tiles: [] };
  task: Task = {
    id: "",
    title: "",
    body: "",
    impact: 1,
    category: TaskCategory.WORK,
    state: TaskState.IN_PROGRESS,
    dateCreated: new Date(),
    dueDate: new Date()
  };
  secondsFarmed = 0;

  TaskCategory = TaskCategory;
  categoryColors = categoryColors;
  categoryIcons = categoryIcons;

  TaskState = TaskState;
  stateColors = stateColors;
  stateIcons = stateIcons;

  plants = plants;
  focusInterval: NodeJS.Timeout | null = null;

  toggleFocus() {
    const growthPerSecond = this.task.impact;

    if (this.focusInterval) {
      clearInterval(this.focusInterval);
      this.focusInterval = null;
      this.secondsFarmed = 0;
      this.updateUser();
    } else {
      this.focusInterval = setInterval(() => {
        for (const tile of this.user.tiles) {
          if (tile.timeLeft !== 0 && tile.timeLeft - growthPerSecond < 0) {
            tile.timeLeft = 0;
          } else if (tile.timeLeft !== 0) {
            tile.timeLeft =
              Math.round(10 * (tile.timeLeft - growthPerSecond)) / 10;
          }
        }

        this.secondsFarmed += 1;
      }, 1000);
    }
  }

  get plantTiles() {
    return this.user.tiles.filter(tile => tile.plant !== PlantType.DIRT);
  }

  getState(tile: Tile) {
    const plantStats = this.plants[tile.plant];
    return (
      Math.floor(
        ((plantStats.growthPoints - tile.timeLeft) / plantStats.growthPoints) *
          plantStats.stages
      ) + 1
    );
  }

  get apollo() {
    return {
      user: {
        query: gql`
          query {
            user: getUser(id: "5e819b7d2bd59c41f04601b6") {
              id
              tiles {
                index
                plant
                timeLeft
              }
            }
          }
        `
      },
      task: {
        query: GET_TASK,
        prefetch: ({ route }) => ({ id: route.params.id }),
        variables(): { id: string } {
          return { id: this.$route.params.id };
        }
      }
    };
  }

  updateUser() {
    this.$apollo.mutate({
      mutation: gql`
        mutation updateUser($id: String!, $user: UserInput) {
          user: updateUser(id: $id, user: $user) {
            tiles {
              index
              plant
              timeLeft
            }
          }
        }
      `,
      variables: {
        id: this.user.id,
        user: {
          tiles: this.user.tiles.map(({ index, plant, timeLeft }) => ({
            index,
            plant,
            timeLeft
          }))
        }
      }
    });
  }

  submit() {
    this.$apollo.mutate({
      mutation: gql`
        mutation updateTask($id: String!, $task: TaskInput!) {
          task: updateTask(id: $id, task: $task) {
            title
            body
            impact
            category
            state
          }
        }
      `,
      variables: {
        id: this.task.id,
        task: {
          title: this.task.title,
          body: this.task.body,
          impact: this.task.impact,
          category: this.task.category,
          state: this.task.state
        }
      },
      update: (store, { data: { task } }) => {
        const data = store.readQuery({ query: GET_TASK });
        data.task = task;
        store.writeQuery({ query: GET_TASK, data });
      }
    });
  }
}
</script>

<style scoped lang="scss">
.task {
  position: absolute;
  top: 0;
  left: 100px;
  width: calc(100% - 100px);
  height: 100%;

  background-color: #fafafd;
  overflow: hidden;
}

.task-info {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  padding: 40px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.task-input {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  padding: 10px;
  margin-bottom: 40px;

  outline: 0;
  border: 1px solid #00000000;
  font-family: "Montserrat", sans-serif;
  color: #000;
  background-color: #ffffff00;
  border-radius: 4px;
  border: 1px solid #00000025;

  &:focus,
  &:active {
    border: 1px solid #00000050;
  }
}

.title-input {
  font-size: 18px;
}

.body-input {
  font-size: 14px;
  line-height: 25px;
  height: 400px;
}

.categories-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.category-option {
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  margin-right: 30px;

  border-radius: 8px;
  transition: 0.1s linear all;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &--selected {
    box-shadow: 0 0 4px 2px;
  }

  &:hover {
    transform: translateY(-5px);
  }
}

.update-task-button {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  padding: 10px 20px;
  margin: 10px;

  border: 0;
  outline: 0;
  background-color: #1a45ff;
  color: #ffffff;
  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
  transition: 0.1s linear all;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 4px 1px #00000040;
  }
}

.focus {
  position: absolute;
  top: 0;
  left: 40%;
  width: 60%;
  height: 100%;
  padding: 40px;

  font-size: 24px;
  background-color: #1a45ff;
  color: #fff;
  overflow: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.focus-plant {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  padding: 10px 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.focus-button {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  padding: 10px 20px;
  margin: 10px;

  border: 0;
  outline: 0;
  background-color: #fff;
  color: #1a45ff;
  font-family: inherit;
  font-weight: 600;
  font-size: 12px;
  border-radius: 6px;
  transition: 0.1s linear all;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 4px 1px #00000040;
  }
}
</style>
