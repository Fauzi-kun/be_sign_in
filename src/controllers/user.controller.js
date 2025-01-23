const knex = require("../../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const user = await knex("user").select("*");
  res.status(201).json(user);
};

const addUser = async (req, res) => {
  const newUser = req.body;
  const hashPassword = await bcrypt.hash(newUser.password, 10);

  await knex("user").select("*").insert({
    fullname: newUser.fullname,
    username: newUser.username,
    password: hashPassword,
    email: newUser.email,
  });
  res.status(201).json(newUser);
};

const login = async (req, res) => {
  const searchUser = req.body;
  try {
    const user = await knex("user").select("*");
    const loginUser = user.find((item) => item.email === searchUser.email);
    const isMatch = await bcrypt.compare(
      searchUser.password,
      loginUser.password
    );
    if (isMatch) {
      const token = jwt.sign(
        { fullname: loginUser.fullname, username: loginUser.username },
        "secret"
      );
      res.status(200).json({ message: "berhasil login", "token anda": token });
    } else {
      res.status(400).json({ message: "password salah" });
    }
  } catch (err) {
    res.status(400).json({ message: "user tidak ditemukan" });
  }
};

module.exports = {
  getUser,
  addUser,
  login,
};
