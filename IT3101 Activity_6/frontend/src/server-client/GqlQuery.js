import { gql } from "@apollo/client";

const POSTS_SUBSCRIPTION = gql`
  subscription {
    postCreated {
      id
      title
      content
    }
  }
`;

export default POSTS_SUBSCRIPTION;