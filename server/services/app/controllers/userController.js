const { User, Product, Category, Images } = require("../models");
const { Op } = require("sequelize");

class UserController {
  static async userShowAllProducts(req, res, next) {
    try {
      let { filter, search } = req.query;

      search = search || "";

      let obj = {
        include: [Category, Images],
        order: [["id", "ASC"]],
        where: {
          name: { [Op.iLike]: `%${search}%` },
        },
      };

      if (filter) {
        obj.where.categoryId = filter;
      }

      console.log(obj, "<<<");

      const products = await Product.findAll(obj);

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async userShowOneProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        include: [Category, Images],
      });

      if (!product) {
        throw { name: "productNotFound" };
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async userAddProduct(req, res, next) {
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
        authorId: 1,
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

  static async userUpdateProduct(req, res, next) {
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
      next(error); // 404 & 403
    }
  }

  static async userDeleteProduct(req, res, next) {
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
}

module.exports = UserController;
