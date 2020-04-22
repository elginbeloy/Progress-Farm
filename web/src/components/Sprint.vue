<template>
  <div class="sprint">
    <div class="sprint-background" :style="sprintBackground">
      <span :class="categoryIcons[sprint.goals[0].category]" />
    </div>
    <div class="sprint-info">
      <div class="sprint-title">{{ sprint.title }}</div>
      <div class="sprint-amount">
        <span class="icon-dollar-sign" />
        {{ sprint.money }}
      </div>
      <div class="flex-row" :style="{ alignItems: 'flex-end' }">
        <div
          :style="{ color: categoryColors[this.sprint.goals[0].category] }"
          class="sprint-current"
        >5</div>
        <div class="sprint-goal">/ {{ sprint.goals[0].amount }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Sprint as SprintType } from "@/types/Sprint.ts";
import { categoryIcons, categoryColors } from "@/types/Task.ts";

@Component
export default class Sprint extends Vue {
  @Prop({ required: true })
  sprint!: SprintType;

  categoryIcons = categoryIcons;
  categoryColors = categoryColors;

  sprintBackground = {
    // Use the first goal (usually sole or primary) to categorize sprint.
    // Add A0 (Hexidecimal) opacity to current non-opacity Hex string.
    color: categoryColors[this.sprint.goals[0].category] + "A0",
    backgroundColor: categoryColors[this.sprint.goals[0].category] + "20"
  };

  goalBackground = {
    color: categoryColors[this.sprint.goals[0].category]
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sprint {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 275px;
  height: 200px;
  margin-right: 50px;
  margin-bottom: 50px;

  background-color: #ffffff;
  box-shadow: 0 0 4px 1px #00000010;
  border-radius: 6px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.sprint-background {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 50%;

  font-size: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.sprint-info {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 50%;
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
}

.sprint-title {
  font-size: 14px;
  color: #000000;
  margin-bottom: 5px;
}

.sprint-amount {
  font-size: 12px;
  color: #424242;
  margin-bottom: 10px;
}

.sprint-current {
  font-size: 24px;
  margin-right: 10px;
}

.sprint-goal {
  font-size: 12px;
  color: #424242;
}
</style>
