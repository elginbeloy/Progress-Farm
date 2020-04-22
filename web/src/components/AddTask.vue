<template>
  <div class="add-task">
    <input type="text" placeholder="Task Title" class="task-input title-input" v-model="task.title" />
    <textarea class="task-input body-input" placeholder="Task Body..." v-model="task.body" />
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
          backgroundColor: categoryColors[category] + '35'
        }"
        @click="task.category = category"
      >
        <span :class="categoryIcons[category]" />
      </div>
    </div>
    <button class="create-task-button" @click="submit">Create Task</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Task,
  TaskCategory,
  TaskState,
  categoryIcons,
  categoryColors
} from "@/types/Task.ts";

@Component
export default class AddTask extends Vue {
  @Prop({ required: true })
  addTask!: (task: Omit<Task, "id">) => void;

  TaskCategory = TaskCategory;
  categoryIcons = categoryIcons;
  categoryColors = categoryColors;

  task: Omit<Task, "id"> = {
    title: "",
    body: "",
    impact: 1,
    dateCreated: new Date(),
    dueDate: new Date(),
    category: TaskCategory.WORK,
    state: TaskState.AWAITING
  };

  submit() {
    this.addTask(this.task);
    this.task = {
      title: "",
      body: "",
      impact: 1,
      dateCreated: new Date(),
      dueDate: new Date(),
      category: TaskCategory.WORK,
      state: TaskState.AWAITING
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add-task {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 600px;
  height: 400px;
  padding: 20px;
  margin-bottom: 20px;

  box-shadow: 0 0 4px 1px #00000020;
  border-radius: 8px;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.task-input {
  position: relative;
  width: 100%;

  border: 0;
  outline: 0;
  font-family: "Montserrat", sans-serif;
  color: #000;

  background-color: #ffffff;
  font-family: inherit;
}

.title-input {
  font-size: 22px;
}

.body-input {
  font-size: 14px;
  height: 150px;
  margin-top: 20px;
  resize: none;
}

.categories-container {
  position: relative;
  width: 100%;
  height: 50px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.category-option {
  position: relative;
  width: 50px;
  height: 50px;

  border-radius: 8px;
  transition: 0.1s linear all;
  -webkit-filter: grayscale(1);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &--selected {
    -webkit-filter: none;
  }
}

.create-task-button {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
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
</style>
