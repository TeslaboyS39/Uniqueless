const axios = require("axios");
const BASE_URL_PRODUCT = "http://localhost:4002/pub/products";
const BASE_URL_USER = "http://localhost:4001/users";
const redis = require("../config/redis");

class Orchestrator {
  static async showProducts(req, res) {
    try {
      const productCache = await redis.get("products");
      if (productCache) {
        const data = JSON.parse(productCache);
        return res.status(200).json(data);
      }

      const { data } = await axios.get(BASE_URL_PRODUCT);
      const stringProducts = JSON.stringify(data);
      await redis.set("products", stringProducts, "EX", 60); //expire dalam 1 menit
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async showDetailProduct(req, res) {
    try {
      const productId = req.params.id;

      const { data: product } = await axios.get(
        `${BASE_URL_PRODUCT}/${productId}`
      );
      console.log(product.product.UserMongoId, "<<<< INI PRODUCT");
      const { data: user } = await axios({
        method: "GET",
        url: BASE_URL_USER + "/" + product.UserMongoId,
      });
      console.log(user, "<<<INI USER DI CONTROLLER");

      res.status(200).json({ ...product, user });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addProduct(req, res) {
    try {
      const { name, description, price, mainImg, categoryId } = req.body;
      const slug = name.toLowerCase().replace(/\s+/g, "-");

      const { data } = await axios.post(BASE_URL_PRODUCT, {
        name,
        slug,
        description,
        price,
        mainImg,
        categoryId,
        authorId: 1,
      });

      await redis.del("products");

      res
        .status(201)
        .json({ message: "Product created successfully", newProduct: data });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const { name, description, price, mainImg, categoryId } = req.body;
      const slug = name.toLowerCase().replace(/\s+/g, "-");

      const { data } = await axios.put(`${BASE_URL_PRODUCT}/${productId}`, {
        name,
        slug,
        description,
        price,
        mainImg,
        categoryId,
      });

      await redis.del(`product:${productId}`);

      res.status(200).json({
        message: `Product with id ${productId} updated successfully`,
        updatedProduct: data,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;

      const { data } = await axios({
        method: "DELETE",
        url: `${BASE_URL_PRODUCT}/${productId}`,
      });

      await redis.del("products");

      res.status(200).json({
        message: `Product with id ${productId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async showUsers(req, res) {
    try {
      const userCache = await redis.get("users");
      if (userCache) {
        const data = JSON.parse(userCache);
        return res.status(200).json(data);
      }

      const { data } = await axios.get(BASE_URL_USER);
      const stringUsers = JSON.stringify(data);
      await redis.set("users", stringUsers, "EX", 60); //expire dalam 1 menit
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async addUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const { data } = await axios.post(BASE_URL_USER, {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      await redis.del("users");

      res
        .status(201)
        .json({ message: "User created successfully", newUser: data });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async showDetailUser(req, res) {
    try {
      const authorId = req.params.id;
      const userCache = await redis.get(`user:${authorId}`);
      if (userCache) {
        const data = JSON.parse(userCache);
        return res.status(200).json(data);
      }

      const { data } = await axios.get(`${BASE_URL_USER}/${authorId}`);
      const stringUser = JSON.stringify(data);
      await redis.set(`user:${authorId}`, stringUser, "EX", 120); //expire dalam 2 menit
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const authorId = req.params.id;

      const { data } = await axios({
        method: "DELETE",
        url: `${BASE_URL_USER}/${authorId}`,
      });

      await redis.del("users");

      res.status(200).json({
        message: `User with id ${authorId} deleted successfully`,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = Orchestrator;
