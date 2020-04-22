export enum TaskState {
  AWAITING = "awaiting",
  COMPLETED = "completed",
  IN_PROGRESS = "in progress"
}

export enum TaskCategory {
  CODING = "coding",
  EDUCATION = "education",
  CHINESE = "chinese",
  WORK = "work",
  PROCESS_ANALYSIS = "process_analysis",
  FITNESS = "fitness"
}

export interface Task {
  id: string;
  title: string;
  body: string;
  dateCreated: Date;
  dueDate: Date;
  impact: number;
  category: TaskCategory;
  state: TaskState;
}

export const categoryIcons: { [key in TaskCategory]: string } = {
  [TaskCategory.CODING]: "icon-code",
  [TaskCategory.EDUCATION]: "icon-bookmark",
  [TaskCategory.CHINESE]: "icon-globe",
  [TaskCategory.WORK]: "icon-briefcase",
  [TaskCategory.PROCESS_ANALYSIS]: "icon-edit-2",
  [TaskCategory.FITNESS]: "icon-heart"
};

export const categoryColors: { [key in TaskCategory]: string } = {
  [TaskCategory.CODING]: "#2197f5",
  [TaskCategory.EDUCATION]: "#02E82F",
  [TaskCategory.CHINESE]: "#ff5728",
  [TaskCategory.WORK]: "#E80277",
  [TaskCategory.PROCESS_ANALYSIS]: "#300FC8",
  [TaskCategory.FITNESS]: "#E82F02"
};

export const stateIcons: { [key in TaskState]: string } = {
  [TaskState.AWAITING]: "icon-loader",
  [TaskState.IN_PROGRESS]: "icon-user",
  [TaskState.COMPLETED]: "icon-check"
};

export const stateColors: { [key in TaskState]: string } = {
  [TaskState.AWAITING]: "#2197f5",
  [TaskState.IN_PROGRESS]: "#ff5728",
  [TaskState.COMPLETED]: "#ADF7B6"
};
