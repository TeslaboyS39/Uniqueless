const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static users() {
    const usersCollection = getDb().collection("users");
    return usersCollection;
  }

  static async findByPk(userId) {
    return await this.users().findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
  }

  static async findAll() {
    return await this.users()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }

  static async deleteById(userId) {
    return await this.users().deleteOne({
      _id: new ObjectId(userId),
    });
  }

  static async create(user) {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;

    const result = await this.users().insertOne(user);
    // console.log(result);
    return result.insertedId;
  }
}

module.exports = User;
