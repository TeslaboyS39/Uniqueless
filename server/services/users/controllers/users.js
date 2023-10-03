const User = require("../models/user");

class Users {
  static async findAll(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  static async findById(req, res) {
    const { userId } = req.params;
    console.log(req.params, "<<<< INI REQ PARAMNYA");
    const userById = await User.findByPk(userId);
    return res.json(userById);
  }

  static async deleteById(req, res) {
    const { userId } = req.params;

    const deletedUser = await User.deleteById(userId);

    // return res.json(deletedUser);
    if (deletedUser.deletedCount == 1) {
      return res.json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  }

  static async create(req, res) {
    const { username, email, password, role, phoneNumber, address } = req.body;

    const newUser = {
      username,
      email,
      password,
      role,
      phoneNumber,
      address,
    };

    try {
      const createdUser = await User.create(newUser);
      return res
        .status(201)
        .json({ message: `User with _id: ${createdUser} is created` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Users;
