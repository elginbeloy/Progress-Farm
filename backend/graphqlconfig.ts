import { gql } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import { User, Task, Sprint } from './models';
import { Kind } from 'graphql/language';


export const typeDefs = gql`
  scalar Date

  type Tile {
    index: Int
    plant: String
    timeLeft: Float
  }

  input TileInput {
    index: Int
    plant: String
    timeLeft: Float
  }

  type User {
    id: ID!
    username: String
    password: String
    money: Float
    rows: Int
    columns: Int
    wisdom: Int
    experience: Int
    farmingSkill: Int
    tiles: [Tile]
  }

  input UserInput {
    username: String
    password: String
    money: Float
    rows: Int
    columns: Int
    wisdom: Int
    experience: Int
    farmingSkill: Int
    tiles: [TileInput]
  }

  type Task {
    id: ID!
    owner: User
    title: String
    body: String
    dateCreated: Date
    dueDate: Date
    impact: Float
    category: String
    state: String
  }

  input TaskInput {
    owner: String
    title: String
    body: String
    dateCreated: Date
    dueDate: Date
    impact: Float
    category: String
    state: String
  }

  type Sprint {
    id: ID!
    owner: User
    title: String
    body: String
    dateCreated: Date
    dueDate: Date
    impact: Float
    category: String
  }

  input SprintInput {
    owner: String
    title: String
    body: String
    dateCreated: Date
    dueDate: Date
    impact: Float
    category: String
  }

  type Query {
    getUser(id: String!): User
    listUsers: [User]
    getTask(id: String!): Task
    listTasks: [Task]
    getSprint(id: String!): Sprint
    listSprints: [Sprint]
  }

  type Mutation {
    addUser(user: UserInput!): User
    updateUser(id: String!, user: UserInput!): User
    deleteUser(id: String!): User
    addTask(task: TaskInput!): Task
    updateTask(id: String!, task: TaskInput!): Task
    deleteTask(id: String!): Task
    addSprint(sprint: SprintInput!): Sprint
    updateSprint(id: String!, sprint: SprintInput!): Sprint
    deleteSprint(id: String!): Sprint
  }
`;

interface UserInput {
  username: string;
  password: string;
  money: number;
  rows: number;
  columns: number;
  wisdom: number;
  experience: number;
  farmingSkill: number;
  tiles: [{
    index: number;
    plant: string;
    timeLeft: number;
  }]
}

interface TaskInput {
  title: string;
  body: string;
  dateCreated: Date;
  dueDate: Date;
  impact: number;
  category: string;
  state: string;
}

interface SprintInput {
  title: string;
  body: string;
  dateCreated: Date;
  dueDate: Date;
  impact: number;
  category: string;
}

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
  Query: {
    getUser: async (root: string, args: { id: string }) =>
      User.findById(args.id).exec(),
    listUsers: async (root: string) => User.find({}).exec(),
    getTask: async (root: string, args: { id: string }) =>
      Task.findById(args.id).exec(),
    listTasks: async (root: string) => Task.find({}).exec(),
    getSprint: async (root: string, args: { id: string }) =>
      Sprint.findById(args.id).exec(),
    listSprints: async (root: string) => Sprint.find({}).exec()
  },
  Mutation: {
    addUser: async (root: string, args: { user: UserInput }) => {
      try {
        const response = await User.create(args.user);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    updateUser: async (root: string, args: { id: string, user: UserInput }) => {
      try {
        const response = await User.findByIdAndUpdate(args.id, args.user);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    deleteUser: async (root: string, args: { id: string }) => {
      try {
        const response = await User.findByIdAndDelete(args.id);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    addTask: async (root: string, args: { task: TaskInput }) => {
      try {
        const response = await Task.create(args.task);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    updateTask: async (root: string, args: { id: string, task: TaskInput }) => {
      try {
        const response = await Task.findByIdAndUpdate(args.id, args.task);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    deleteTask: async (root: string, args: { id: string }) => {
      try {
        const response = await Task.findByIdAndDelete(args.id);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    addSprint: async (root: string, args: { sprint: SprintInput }) => {
      try {
        const response = await Sprint.create(args.sprint);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    updateSprint: async (root: string, args: { id: string, sprint: SprintInput }) => {
      try {
        const response = await Sprint.findByIdAndUpdate(args.id, args.sprint);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
    deleteSprint: async (root: string, args: { id: string }) => {
      try {
        const response = await Sprint.findByIdAndDelete(args.id);
        return response;
      } catch (e) {
        console.error(e);
        return e.message;
      }
    },
  },
};
