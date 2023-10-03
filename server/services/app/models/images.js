"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Images.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  Images.init(
    {
      productId: DataTypes.INTEGER,
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image URL is required",
          },
          notEmpty: {
            msg: "Image URL cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};
