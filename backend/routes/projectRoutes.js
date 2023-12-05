const express = require('express');
const { getProjects, createProject, deleteProject, getProject, updateProject, addColaborator, deleteColaborator } = require('../controllers/projectController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.use(checkAuth)

// routes to get projects and create projects 
router.route('/')
    .get(getProjects)
    .post(createProject)

//routes to get a project, update it and delete it
router.route('/:id')
    .get(getProject)
    .put(updateProject)
    .delete(deleteProject);

//Routes to get tasks, add colaborators and delete colaborators
router.post('/add-colaborators', addColaborator);
router.post('/delete-colaborators', deleteColaborator);

module.exports = router