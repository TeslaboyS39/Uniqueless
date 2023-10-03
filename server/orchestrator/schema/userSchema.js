const axios = require("axios");
const redis = require("../config/redis");
const baseUrlUser = "http://localhost:4001";

const userTypeDefs = `#graphql
type User {
    _id: ID
    username: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Query { # just like router, bawaan graphql
    users: [User]
    userById(_id: ID): User
  }

  input FormUser {
    username: String
    password: String
    email: String
    role: String
    phoneNumber: String
    address: String
  }

  type Mutation {
    addUser(user: FormUser): User
    deleteUser(id: ID): User
  }
`;

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const cacheUsers = await redis.get("users");
        if (cacheUsers) {
          const data = JSON.parse(cacheUsers);
          return data;
        }
        const { data } = await axios.get(baseUrlUser + "/users");

        const stringUser = JSON.stringify(data);
        await redis.set("users", stringUser);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    userById: async (_, args) => {
      try {
        const { _id } = args;
        const cacheUser = await redis.get(_id);

        if (cacheUser) {
          return JSON.parse(cacheUser);
        } else {
          const { data } = await axios.get(baseUrlUser + "/users/" + _id);
          await redis.set(_id, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addUser: async (_, { user }) => {
      try {
        const { username, email, password, role, phoneNumber, address } = user;

        const { data } = await axios.post(baseUrlUser + "/users", {
          username,
          password,
          email,
          role,
          phoneNumber,
          address,
        });

        await redis.del("users");

        return { message: "User is created" };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "DELETE",
          url: baseUrlUser + "/users/" + id,
        });

        await redis.del("users");

        return { message: "Product deleted successfully" };
      } catch (error) {}
    },
  },
};

module.exports = {
  userTypeDefs,
  userResolvers,
};
