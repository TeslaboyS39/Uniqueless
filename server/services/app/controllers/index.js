const { User, Category, Product, Images } = require("../models");
const { comparePasswords } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({ message: `User with id ${user.id} is created` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "badRequest", message: "Email cannot be empty" };
      }

      if (!password) {
        throw { name: "badRequest", message: "Password cannot be empty" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "unauthenticated", message: "Invalid email" };
      }

      const validPass = comparePasswords(password, user.password);
      console.log(validPass);

      if (!validPass) {
        throw { name: "unauthenticated", message: "Invalid password" };
      }

      const access_token = createToken({ id: user.id });
      // console.log(access_token);
      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async showAllProducts(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [User, Category, Images],
      });

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async showOneProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: [User, Category],
      });

      if (!product) {
        throw { name: "productNotFound" };
      }

      res.status(200).json(product);
    } catch (error) {
      // console.log(error, '<<<<<<')
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    // console.log(req.body);
    try {
      const { name, slug, description, price, mainImg, categoryId } = req.body;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw { name: "categoryNotFound", error: "Category not found" };
      }

      const newProduct = await Product.create({
        name,
        slug,
        description,
        price,
        mainImg,
        categoryId,
        authorId: req.user.id,
      });

      res.status(201).json({
        message: `Product with id ${newProduct.id} has been created`,
        newProduct,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteOneProduct(req, res, next) {
    try {
      await Product.destroy({ where: { id: req.params.id } });

      res.status(200).json({
        message: `Product with id ${req.params.id} deleted succesfully.`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug, description, price, mainImg, categoryId } = req.body;
      const product = await Product.findByPk(id);

      if (!product) {
        throw { name: "productNotFound" };
      }

      let updatedProduct = await Product.update(
        {
          name,
          slug,
          description,
          price,
          mainImg,
          categoryId,
        },
        {
          where: { id },
        }
      );

      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
      next(error);
      // 404 & 403
    }
  }

  static async showAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    // console.log(req.body);
    try {
      const { name } = req.body;

      const newCategory = await Category.create({
        name,
      });

      res.status(201).json({
        message: `Category with id ${newCategory.id} has been created`,
        newCategory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
