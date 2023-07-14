import { gql } from "@apollo/client";

export const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(input: { title: $title, isActive: true }) {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($id: String!) {
        deleteTodo(id: $id)
    }
`;

export const UPDATE_TODO = gql`
  mutation ($title: String!, $id: String!, $isActive: Boolean!) {
    updateTodo(input: { id: $id, title: $title, isActive: $isActive }) {
      id
      title
      isActive
    }
  }
`;