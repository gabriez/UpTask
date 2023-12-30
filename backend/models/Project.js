const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaProjects = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    dateDeliver: {
        type: Date,
        default: Date.now()
    },
    client: {
        type: String,
        trim: true,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    colaborators: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ], 
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tasks'
        }
    ]
},
    {
        timestamps: true
    });

const Project = mongoose.model('Project', schemaProjects)

module.exports = Project