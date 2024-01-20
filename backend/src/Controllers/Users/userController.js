const Users = require("../../Models/UserModel/userModel");
const bcrypt = require("bcrypt");

const userController = () => {};

userController.createUser = async (req, res) => {
  try {
    if (!req?.body?.username || !req?.body?.email || !req?.body?.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { email, password, username } = req.body;

    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      email,
      password: hashedPassword,
      username,
    });

    if (user) {
      return res
        .status(201)
        .json({ message: "User registered successfully", user });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ user, message: "User logged in" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = userController;
