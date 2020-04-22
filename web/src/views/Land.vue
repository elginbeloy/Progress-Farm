<template>
  <div class="land">
    <div
      class="farm"
      :style="{
        width: user.rows * 50 + 'px',
        height: user.columns * 50 + 'px'
      }"
    >
      <FarmTile
        v-for="tile in user.tiles"
        :key="tile.index"
        :tile="tile"
        :x="Math.floor(tile.index % user.columns) * 50"
        :y="Math.floor(tile.index / user.columns) * 50"
        :selectTile="selectTile"
      />
    </div>
    <div class="action-bar">
      <div class="status">$ {{ user.money }}</div>
      <div
        class="action-bar__item"
        v-for="(plant, key) in pruchasablePlants"
        :key="plant.cost"
        @click="selectPlant(key)"
      >
        <img :src="plant.avatar(plant.stages)" />
        <div class="flex-colm">
          <a class="title">{{ key }}</a>
          <a class="growth">Growth: {{ plant.growthPoints }}</a>
        </div>
        <div class="info">
          <a class="gain">$ {{ plant.gain }}</a>
          <a class="cost" v-if="plant.cost !== 0">$ {{ plant.cost }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/types/User.ts";
import { Tile, PlantType, plants } from "@/types/Tile.ts";
import FarmTile from "@/components/FarmTile.vue";
import gql from "graphql-tag";

@Component({
  apollo: {
    user: gql`
      query {
        user: getUser(id: "5e819b7d2bd59c41f04601b6") {
          id
          username
          money
          rows
          columns
          tiles {
            index
            plant
            timeLeft
          }
        }
      }
    `
  },
  components: {
    FarmTile
  }
})
export default class Land extends Vue {
  user: User = {
    id: "5e819b7d2bd59c41f04601b6",
    username: "",
    password: "",
    money: 0,
    rows: 4,
    columns: 4,
    tiles: []
  };

  selectedPlant: PlantType | undefined;
  plants = plants;
  pruchasablePlants = Object.fromEntries(
    Object.entries(plants).filter(([k, v]) => k !== PlantType.DIRT)
  );
  PlantType = PlantType;

  selectTile(tile: Tile) {
    if (
      tile.plant === PlantType.DIRT &&
      this.selectedPlant &&
      this.user.money >= plants[this.selectedPlant].cost
    ) {
      const tileToPlant = {
        index: tile.index,
        plant: this.selectedPlant,
        timeLeft: plants[this.selectedPlant].growthPoints
      };

      this.$set(this.user.tiles, tile.index, tileToPlant);
      this.user.money -= plants[this.selectedPlant].cost;
      this.updateUser();
    } else if (tile.plant !== PlantType.DIRT && tile.timeLeft <= 0) {
      this.user.money += plants[tile.plant].gain;
      this.user.tiles[tile.index] = {
        index: tile.index,
        plant: PlantType.DIRT,
        timeLeft: 0
      };

      this.updateUser();
    }

    this.$forceUpdate();
  }

  selectPlant(plant: PlantType) {
    this.selectedPlant = plant;
  }

  updateUser() {
    const user = this.user;

    this.$apollo.mutate({
      mutation: gql`
        mutation updateUser($id: String!, $user: UserInput) {
          user: updateUser(id: $id, user: $user) {
            money
            rows
            columns
            tiles {
              index
              plant
              timeLeft
            }
          }
        }
      `,
      variables: {
        id: user.id,
        user: {
          money: user.money,
          rows: user.rows,
          columns: user.columns,
          tiles: user.tiles.map(({ index, plant, timeLeft }) => ({
            index,
            plant,
            timeLeft
          }))
        }
      }
    });
  }
}
</script>

<style scoped lang="scss">
.land {
  position: absolute;
  top: 0;
  left: 100px;
  width: calc(100% - 100px);
  height: 100%;

  background-color: #fafafd;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.farm {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;

  background-image: url("../assets/tiles/dirt.png");
  background-repeat: repeat;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.action-bar {
  position: absolute;
  top: 25%;
  right: 20px;
  width: 200px;
  height: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.status {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  margin-bottom: 40px;

  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 2px #00000015;

  display: flex;
  justify-content: center;
  align-items: center;
}

.action-bar__item {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-bottom: 20px;

  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 6px 2px #00000015;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin-right: 10px;
  }

  .title {
    font-size: 14px;
    margin-bottom: 2px;
  }

  .cost {
    font-size: 10px;
    font-weight: 600;
    color: red;
  }

  .gain {
    font-size: 12px;
    font-weight: 600;
    color: rgb(0, 200, 0);
    margin-bottom: 2px;
  }

  .growth {
    font-size: 10px;
    font-weight: 600;
    color: #000000a0;
  }
}

.info {
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  margin-left: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
</style>
