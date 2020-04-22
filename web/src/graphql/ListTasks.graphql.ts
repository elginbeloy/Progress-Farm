import gql from "graphql-tag";

export const LIST_TASKS = gql`
  query listTasks {
    tasks: listTasks {
      id
      title
      body
      dueDate
      dateCreated
      impact
      category
      state
    }
  }
`;
