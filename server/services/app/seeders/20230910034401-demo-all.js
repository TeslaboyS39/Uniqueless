"use strict";
const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = require("../data/users.json");
    const categories = require("../data/categories.json");
    const products = require("../data/products.json");
    const images = require("../data/images.json");

    users.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.role = "admin";
      el.password = hashPassword(el.password);
    });
    categories.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    products.forEach((el) => {
      el.slug = el.name.toLowerCase().replace(/\s+/g, "-");
      el.createdAt = el.updatedAt = new Date();
    });
    images.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Users", users, {});
    await queryInterface.bulkInsert("Categories", categories, {});
    await queryInterface.bulkInsert("Products", products, {});
    await queryInterface.bulkInsert("Images", images, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
