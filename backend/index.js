const express = require("express");
const connectDB = require('./config/db.js')
const dotenv = require('dotenv');
const routerUser = require('./routes/userRoutes.js')
const routerProject = require('./routes/projectRoutes.js')
const routerTasks = require('./routes/taskRoutes.js')


const app = express();
app.use(express.json())
dotenv.config()
connectDB();

const PORT = process.env.PORT || 4000;

app.use('/users', routerUser);
app.use('/projects', routerProject);
app.use('/tasks', routerTasks)


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})