const axios = require("axios");
const redis = require("../config/redis");

const baseUrlApp = "http://localhost:4002";
const baseUrlUser = "http://localhost:4001";

const productTypeDefs = `#graphql
type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    Category: Category
    Author: Author
    Image: Image
  }

  type Category {
    id: ID
    name: String
  }

  type Image {
    id: ID
    imgUrl: String
  }

  type Author {
    _id: ID
    username: String
  }

  type Query { # just like router, bawaan graphql
    allProducts: [Product]
    productById(id: ID): Product
  }

  input FormProduct {
    name: String,
    slug: String,
    description: String,
    price: Int,
    mainImg: String,
    categoryId: Int,
    authorId: Int,
  }

  type Mutation {
    addProduct(product: FormProduct): Product
    updateProduct(id: ID, product: FormProduct): Product
    deleteProduct(id: ID): Product
  }
`;

const productResolvers = {
  Query: {
    allProducts: async () => {
      try {
        const productCache = await redis.get("products");

        if (productCache) {
          const data = JSON.parse(productCache);
          return data;
        }

        const { data } = await axios.get(baseUrlApp + "/pub/products");
        const stringProducts = JSON.stringify(data);

        await redis.set("products", stringProducts, "EX", 60);

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    productById: async (_, args) => {
      try {
        const { id } = args;
        const productCache = await redis.get(`products-${id}`);

        if (productCache) {
          const data = JSON.parse(productCache);
          return data;
        }

        const { data: product } = await axios.get(
          baseUrlApp + "/pub/products/" + id
        );
        const { data: user } = await axios.get(
          baseUrlUser + "/users/" + product.UserMongoId
        );

        product.Author = user;

        const images = product.Images;
        const imageUrls = images.map((image) => ({
          id: image.id,
          imgUrl: image.imgUrl,
        }));
        product.Images = imageUrls;

        const stringProducts = JSON.stringify(product);

        await redis.set(`products-${id}`, stringProducts, "EX", 300);
        console.log(product, "<<<< KENAPA NEEH");
        return product;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addProduct: async (_, { product }) => {
      try {
        const { name, description, price, mainImg, categoryId, authorId } =
          product;

        const slug = name.toLowerCase().replace(/\s+/g, "-");

        const { data } = await axios.post(baseUrlApp + "/pub/products", {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId,
          authorId,
        });

        await redis.del("products");

        return { message: "Product created successfully", data };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateProduct: async (_, args) => {
      try {
        const { id, product } = args;
        const { name, description, price, mainImg, categoryId } = product;
        const slug = name.toLowerCase().replace(/\s+/g, "-");

        const { data } = await axios({
          method: "put",
          url: baseUrlApp + "/pub/products/" + id,
          data: { name, slug, description, price, mainImg, categoryId },
        });

        await redis.del("product: " + id);

        return {
          message: "Product with id " + id + " updated",
          updatedProduct: data,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: baseUrlApp + "/pub/products/" + id,
        });

        await redis.del("products");

        return { message: "Product deleted successfully" };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = {
  productTypeDefs,
  productResolvers,
};
