const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    confirmation: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
},
    {
        timestamps: true
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.authenticatePassword = async function (passwordForm) {
    return await bcrypt.compare(passwordForm, this.password)
}

const User = mongoose.model('User', userSchema);
module.exports = User;