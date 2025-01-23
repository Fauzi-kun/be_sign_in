const jwt = require("jsonwebtoken");

module.exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "failed auth" });
  }

  const token = authHeader.split(" ", [2])[1];
  if (!token) {
    return res.status(401).json({ message: "failed auth" });
  }

  try {
    const decoded = jwt.verify(token, "secret");
    next();
  } catch (err) {
    return res.status(401).json({ message: "failed auth" });
  }
};
