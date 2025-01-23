const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const coursesRouter = require("./src/routes/course.route");
const userRouter = require("./src/routes/user.route");
app.use(express.json());

app.use(coursesRouter);
app.use(userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port : ${process.env.PORT}`);
});
