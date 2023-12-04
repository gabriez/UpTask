const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI
        )

        console.log(`MongoDB conectado en: ${connection.connection.host}:${connection.connection.port}`)
    } catch (error) {
        console.error(`Error ===> ${error.message}`)
    }
}
module.exports = connectDB;