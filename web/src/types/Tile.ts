export enum PlantType {
  DIRT = "dirt",
  POTATO = "potato",
  EGGPLANT = "eggplant",
  GRAPE = "grape",
  STRAWBERRY = "strawberry",
  TOMATO = "tomato",
  PUMPKIN = "pumpkin",
  APPLE_TREE = "apple_tree",
  LEMON_TREE = "lemon_tree"
}

export interface Tile {
  index: number;
  plant: PlantType;
  timeLeft: number;
}

export interface PlantStats {
  cost: number;
  growthPoints: number;
  gain: number;
  stages: number;
  removedOnHarvest: boolean;
  avatar: (stage: number) => string;
}

export const plants: { [key in PlantType]: PlantStats } = {
  [PlantType.DIRT]: {
    cost: 0,
    growthPoints: 0,
    gain: 0,
    stages: 1,
    removedOnHarvest: false,
    avatar: () => require("../assets/tiles/dirt.png")
  },
  [PlantType.POTATO]: {
    cost: 0.0,
    growthPoints: 100,
    gain: 0.25,
    stages: 5,
    removedOnHarvest: true,
    avatar: (stage: number) =>
      require("../assets/tiles/potato_" + Math.min(stage, 5) + ".png")
  },
  [PlantType.EGGPLANT]: {
    cost: 5,
    growthPoints: 150,
    gain: 5.5,
    stages: 5,
    removedOnHarvest: true,
    avatar: (stage: number) =>
      require("../assets/tiles/eggplant_" + stage + ".png")
  },
  [PlantType.GRAPE]: {
    cost: 15,
    growthPoints: 500,
    gain: 18,
    stages: 5,
    removedOnHarvest: true,
    avatar: (stage: number) =>
      require("../assets/tiles/grape_" + stage + ".png")
  },
  [PlantType.STRAWBERRY]: {
    cost: 25,
    growthPoints: 1000,
    gain: 30,
    stages: 5,
    removedOnHarvest: true,
    avatar: (stage: number) =>
      require("../assets/tiles/strawberry_" + stage + ".png")
  },
  [PlantType.TOMATO]: {
    cost: 50,
    growthPoints: 2500,
    gain: 75,
    stages: 5,
    removedOnHarvest: true,
    avatar: (stage: number) =>
      require("../assets/tiles/tomato_" + stage + ".png")
  },
  [PlantType.PUMPKIN]: {
    cost: 500,
    growthPoints: 3000,
    gain: 550,
    stages: 5,
    removedOnHarvest: true,
    avatar: (stage: number) =>
      require("../assets/tiles/pumpkin_" + stage + ".png")
  },
  [PlantType.APPLE_TREE]: {
    cost: 5000,
    growthPoints: 5000,
    gain: 250,
    stages: 2,
    removedOnHarvest: false,
    avatar: (stage: number) =>
      require("../assets/tiles/apple_tree_" + stage + ".png")
  },
  [PlantType.LEMON_TREE]: {
    cost: 25000,
    growthPoints: 75000,
    gain: 500,
    stages: 2,
    removedOnHarvest: false,
    avatar: (stage: number) =>
      require("../assets/tiles/lemon_tree_" + stage + ".png")
  }
};
