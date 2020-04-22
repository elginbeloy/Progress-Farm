import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    money: String,
    rows: Number,
    columns: Number,
    wisdom: Number,
    experience: Number,
    farmingSkill: Number,
    tiles: [{
      index: Number,
      plant: String,
      timeLeft: Number
    }]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const taskSchema = new Schema(
  {
    owner: {
      ref: 'User',
      type: String,
    },
    sprint: {
      ref: 'Sprint',
      type: String,
    },
    title: String,
    body: String,
    dateCreated: Date,
    dueDate: Date,
    impact: Number,
    state: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const sprintSchema = new Schema(
  {
    owner: {
      ref: 'User',
      type: String,
    },
    title: String,
    description: String,
    dateCreated: Date,
    dueDate: Date,
    impact: Number,
    icon: String,
    risk: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const User = mongoose.model('User', userSchema);
export const Task = mongoose.model('Task', taskSchema);
export const Sprint = mongoose.model('Sprint', sprintSchema);