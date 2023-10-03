import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      name
      price
      mainImg
    }
  }
`;

export const GET_PRODUCTS_ID = gql`
  query ProductById($productByIdId: ID) {
    productById(id: $productByIdId) {
      name
      description
      price
      mainImg
      id
      Category {
        name
      }
      Author {
        username
      }
    }
  }
`;
