const express = require("express");
const {
  getCourses,
  getCourseDetail,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");
const router = express.Router();

router.get("/course", getCourses);

router.get("/course/:id", getCourseDetail);

router.post("/course", addCourse);

router.put("/course/:id", updateCourse);

router.delete("/course/:id", deleteCourse);

module.exports = router;
