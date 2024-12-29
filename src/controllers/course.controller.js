const knex = require("../../knex");

const getCourses = async (req, res) => {
  const courses = await knex("courses").select("*");
  res.status(200).json(courses);
};

const getCourseDetail = async (req, res) => {
  const id = req.params.id;
  const course = await knex("courses").select("*").where({ id });
  res.status(200).json(course);
};

const addCourse = async (req, res) => {
  const course = req.body;
  await knex("courses").select("*").insert(course);
  res.status(201).json(course);
};

const updateCourse = async (req, res) => {
  const course = req.body;
  const id = req.params.id;
  await knex("courses").select("*").where({ id }).update(course);
  res.status(201).json(course);
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;
  const course = await knex("courses").select("*").where({ id }).del();
  res.status(200).json(`berhasil hapus ${course}`);
};

module.exports = {
  getCourses,
  getCourseDetail,
  addCourse,
  updateCourse,
  deleteCourse,
};
