<template>
  <div
    class="farm-tile"
    :style="{ top: y + 'px', left: x + 'px' }"
    @click="selectTile(tile)"
    @mousemove="hoverTile"
  >
    <img :src="plantStats.avatar(stage)" disabled />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tile, plants, PlantType } from "../types/Tile";

@Component
export default class FarmTile extends Vue {
  @Prop({ required: true })
  tile!: Tile;

  @Prop({ required: false })
  x!: number;

  @Prop({ required: false })
  y!: number;

  @Prop({ required: true })
  selectTile!: (tile: Tile) => void;

  get plantStats() {
    return plants[this.tile.plant];
  }

  get stage(): number | null {
    const { plantStats, tile } = this;

    if (tile.plant === PlantType.DIRT) {
      return null;
    }

    return (
      Math.floor(
        ((plantStats.growthPoints - tile.timeLeft) / plantStats.growthPoints) *
          plantStats.stages
      ) + 1
    );
  }

  hoverTile(event: MouseEvent) {
    if (event.buttons == 1 || event.buttons == 3) {
      this.selectTile(this.tile);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.farm-tile {
  position: absolute;
  width: 50px;
  height: 50px;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
}
</style>
