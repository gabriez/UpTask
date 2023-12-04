const express = require('express');
const { getProjects, createProject, deleteProject, getProject, updateProject, getTasks, addColaborator, deleteColaborator } = require('../controllers/projectController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

// routes to get projects and create projects 
router.route('/')
    .get(checkAuth, getProjects)
    .post(checkAuth, createProject)

//routes to get a project, update it and delete it
router.route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, updateProject)
    .delete(checkAuth, deleteProject);

//Routes to get tasks, add colaborators and delete colaborators
router.get('/tasks/:id', checkAuth, getTasks);
router.post('/add-colaborators', checkAuth, addColaborator);
router.post('/delete-colaborators', checkAuth, deleteColaborator);

module.exports = router