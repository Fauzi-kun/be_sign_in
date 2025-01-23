const knex = require("../../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const user = await knex("user").select("*");
  res.json(user);
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
  res.json(newUser);
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
      res.json({ ingfo: "berhasil login", "token anda": token });
    } else {
      res.json("gagal login");
    }
  } catch (err) {
    res.json("cok");
  }
};

module.exports = {
  getUser,
  addUser,
  login,
};
