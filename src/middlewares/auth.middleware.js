const jwt = require("jsonwebtoken");

module.exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: "gagal di middleware" });
  }

  const token = authHeader.split(" ", [2])[1];
  if (!token) {
    return res.json({ message: "invalid" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    next();
  } catch (err) {
    return res.json({ message: "error token" });
  }
};
