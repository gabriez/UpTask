const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaTasks = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: Boolean, 
        default: false
    },
    dateDeliver: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    priority: {
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
},
{
    timestamps: true
})

const Tasks = mongoose.model('Tasks', schemaTasks);
module.exports = Tasks