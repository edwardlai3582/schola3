// students/route.js
const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const StudentController = require('./student.controller');

router.use(StudentController.getMonogoDB.bind(StudentController));
//get all students
router.get('/', StudentController.get.bind(StudentController));
//put
router.put('/', jsonParser, StudentController.put.bind(StudentController));
module.exports = router;
