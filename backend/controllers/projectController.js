const Project = require('../models/Project.js')
const Tasks = require('../models/Tasks.js')

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().where('creator').equals(req.user.id)
        return res.json(projects)
    } catch (error) {
        return res.json({ msg: error.message })
    }
}
const createProject = async (req, res) => {
    const data = req.body;
    if (!data.name) {
        const error = new Error('El nombre del proyecto no puede estar vacío')
        return res.status(400).json({ msg: error.message });
    }
    if (!data.description) {
        const error = new Error('La descripción del proyecto no puede estar vacío')
        return res.status(400).json({ msg: error.message });
    }
    if (!data.client) {
        const error = new Error('El nombre del cliente no puede estar vacío')
        return res.status(400).json({ msg: error.message });
    }

    const project = new Project(req.body);
    project.creator = req.user.id;

    try {
        const newProject = await project.save();
        return res.json(newProject)
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }


}
const getProject = async (req, res) => {
    const { id } = req.params;
    let project;
    try {
        project = await Project.findById(id);
    } catch (error) {
        return res.json({ msg: error.message })
    }

    if (!project) {
        const error = new Error('Recurso no encontrado');
        return res.status(404).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user.id.toString()) {
        const error = new Error('Acceso no autorizado');
        return res.status(401).json({ msg: error.message })
    }

   
    try {
        const tasks = await Tasks.find().where('project').equals(id);
        return res.json({
            project, 
            tasks
        })
    } catch (error) {
        return res.json({ msg: error.message })
    }
}
const updateProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            const error = new Error('Recurso no encontrado');
            return res.status(404).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user.id.toString()) {
            const error = new Error('Acceso no autorizado');
            return res.status(401).json({ msg: error.message })
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;
        project.creator = req.body.creator || project.creator;
        project.dateDeliver = req.body.dateDeliver || project.dateDeliver;

        const savedProject = await project.save();
        res.json(savedProject);
    } catch (error) {
        return res.json({ msg: error.message })
    }
}
const deleteProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            const error = new Error('Recurso no encontrado');
            return res.status(404).json({ msg: error.message })
        }
        if (project.creator.toString() !== req.user.id.toString()) {
            const error = new Error('Acceso no autorizado');
            return res.status(401).json({ msg: error.message })
        }
        await project.deleteOne()
        return res.json({ msg: 'Proyecto eliminado con éxito' });
    } catch (error) {
        return res.json({ msg: error.message })
    }
}
const addColaborator = async (req, res) => { }
const deleteColaborator = async (req, res) => { }

module.exports = {
    getProjects,
    getProject,
    deleteProject,
    updateProject,
    createProject,
    addColaborator,
    deleteColaborator
}