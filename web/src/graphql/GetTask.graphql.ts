import gql from "graphql-tag";

export const GET_TASK = gql`
  query GetTask($id: String!) {
    task: getTask(id: $id) {
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
