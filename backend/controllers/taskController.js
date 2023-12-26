const Project = require('../models/Project.js');
const Tasks = require('../models/Tasks.js');

const addTask = async (req, res) => {
    const { project } = req.body;
    let foundProject;
    try {
        foundProject = await Project.findById(project)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    if (!foundProject) {
        const error = new Error('El proyecto no existe')
        return res.status(404).json({ message: error.message })
    }

    if (req.user.id.toString() !== foundProject.creator.toString()) {
        const error = new Error('No está autorizado a este recursos')
        return res.status(401).json({ message: error.message })
    }

    try {
        const newTask = await Tasks.create(req.body);
        return res.json(newTask)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id).populate('project');
        if (!task) {
            const error = new Error('El recurso no existe')
            return res.status(404).json({ message: error.message })
        }
        if (req.user.id.toString() !== task.project.creator.toString()) {
            const error = new Error('No está autorizado a este recurso')
            return res.status(401).json({ message: error.message })
        }
        return res.json(task)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const updateTask = async (req, res) => {
    const { id } = req.params;
    let task;
    try {
        task = await Tasks.findById(id).populate('project');
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    if (!task) {
        const error = new Error('El recurso no existe')
        return res.status(404).json({ message: error.message })
    }
    if (req.user.id.toString() !== task.project.creator.toString()) {
        const error = new Error('No está autorizado a este recurso')
        return res.status(401).json({ message: error.message })
    }
    
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dateDelivery = req.body.dateDelivery || task.dateDelivery;

    try {
        const keptTask = await task.save();
        res.json(keptTask)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const deleteTask = async (req, res) => { 
    const { id } = req.params;
    try {
        const task = await Tasks.findById(id).populate('project');
        if (!task) {
            const error = new Error('El recurso no existe')
            return res.status(404).json({ message: error.message })
        }
        if (req.user.id.toString() !== task.project.creator.toString()) {
            const error = new Error('No está autorizado a este recurso')
            return res.status(401).json({ message: error.message })
        }
        await task.deleteOne()
        return res.json({message: 'El recurso fue eliminado exitosamente'})
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const changeState = async (req, res) => { }

module.exports = {
    addTask,
    getTask,
    updateTask,
    deleteTask,
    changeState
}