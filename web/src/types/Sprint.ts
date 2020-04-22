import { TaskCategory } from "./Task";

export interface SprintGoal {
  category: TaskCategory;
  amount: number;
}

export interface Sprint {
  id: string;
  title: string;
  dateCreated: Date;
  dueDate: Date;
  money: number;
  goals: SprintGoal[];
}

export const currentSprints: Sprint[] = [
  {
    id: "0",
    title: "Example Employee",
    dateCreated: new Date(2020, 3, 22),
    dueDate: new Date(2020, 4, 1),
    money: 1000,
    goals: [{ category: TaskCategory.WORK, amount: 150 }]
  },
  {
    id: "1",
    title: "Feeling Good About Work",
    dateCreated: new Date(2020, 3, 22),
    dueDate: new Date(2020, 3, 25),
    money: 200,
    goals: [{ category: TaskCategory.WORK, amount: 50 }]
  },
  {
    id: "2",
    title: "Conversational Chinese",
    dateCreated: new Date(2020, 3, 22),
    dueDate: new Date(2020, 4, 1),
    money: 150,
    goals: [{ category: TaskCategory.CHINESE, amount: 30 }]
  },
  {
    id: "3",
    title: "Major Bookworm",
    dateCreated: new Date(2020, 3, 22),
    dueDate: new Date(2020, 3, 25),
    money: 75,
    goals: [{ category: TaskCategory.READING, amount: 15 }]
  }
];
