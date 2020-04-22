<template>
  <div class="task" :class="{ 'task--completed': taskCompleted }">
    <div class="task-icon" :style="taskIconStyle">
      <span :class="categoryIcons[task.category]" />
    </div>
    <div class="flex-colm">
      <div class="title">
        {{ task.title }}
        <a class="title-badge" :style="taskIconStyle">{{ task.category }}</a>
      </div>
      <div class="body">{{ task.body }}</div>
    </div>
    <div class="flex-row">
      <span class="impact-icon icon-zap" />
      <span class="impact-text">{{ task.impact }}</span>
    </div>
    <div
      class="view-button"
      @click="viewTask"
      :class="{ 'view-button--completed': taskCompleted }"
    >View</div>
    <div class="delete-button" @click="deleteTask(task.id)">
      <span class="icon-trash"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  Task as TaskType,
  TaskState,
  categoryIcons,
  categoryColors
} from "@/types/Task.ts";
import gql from "graphql-tag";

@Component
export default class Task extends Vue {
  @Prop({ required: true })
  task!: TaskType;

  @Prop({ required: true })
  deleteTask!: (id: string) => void;

  categoryIcons = categoryIcons;
  categoryColors = categoryColors;

  viewTask() {
    this.$router.push("task/" + this.task.id);
  }

  get taskIconStyle() {
    return {
      color: categoryColors[this.task.category],
      // Add 20 (Hexidecimal) opacity.
      backgroundColor: categoryColors[this.task.category] + "20"
    };
  }

  get taskCompleted(): boolean {
    return this.task.state === TaskState.COMPLETED;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.task {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 700px;
  height: 90px;
  padding: 10px 20px;
  margin-bottom: 20px;

  background-color: #ffffff;
  box-shadow: 0 0 4px 1px #00000010;
  border-radius: 6px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &--completed {
    box-shadow: 0 0 4px 2px #01bf2c60;
  }
}

.task-icon {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  margin-right: 10px;

  border-radius: 6px;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: #000000;
  font-size: 12px;
  line-height: 24px;
  width: 350px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title-badge {
  position: relative;
  display: inline-block;
  padding: 3px 6px;
  margin-left: 10px;

  border-radius: 4px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
}

.body {
  color: #212121;
  font-size: 10px;
  line-height: 16px;
  width: 350px;
  max-height: 50px;
  overflow: hidden;
}

.impact-icon {
  font-size: 16px;
  margin-right: 8px;
  color: #1a45ff;
}

.impact-text {
  color: #212121;
  margin-right: 10px;
  font-size: 16px;
}

.view-button {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 80px;
  height: 40px;

  border-radius: 4px;
  background-color: #1a45ff;
  color: #ffffff;
  font-size: 11px;
  font-family: inherit;
  font-weight: bold;
  box-shadow: inset 0 0 4px 2px #00000005;
  transition: 0.1s linear all;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: inset 0 0 6px 2px #00000045;
  }

  &--completed {
    background-color: #01bf2c;
  }
}

.delete-button {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-left: 10px;

  font-size: 14px;
  color: #424242;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.1s linear all;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: red;
    color: white;
  }
}
</style>
