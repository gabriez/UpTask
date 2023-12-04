const express = require('express');
const {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeState
} = require('../controllers/taskController.js');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.use(checkAuth)

router.post('/', addTask);
router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);
router.put('/state/:id', changeState)

module.exports = router;