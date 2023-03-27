const express = require('express');
const { connections } = require('./Configs/db');
const { auth } = require('./Middleware/authMiddleware');
const { noteRouter } = require('./Routers/NotesRouter');
const { userRoter } = require('./Routers/UserRouters');
const cors = require('cors');
require('dotenv').config()




const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoter);
app.use(auth);
app.use("/notes", noteRouter);


app.listen(process.env.PORT, async () => {
    try {
        await connections
        console.log("Connected to DB")
    } catch (error) {
        console.log('error:', error);
    }
    console.log("Server listening");
})