const express = require('express');
const { NoteModel } = require('../Models/noteModel');
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "masai");
    try {

        if (decode) {
            const note = await NoteModel.find({ userID: decode.userID });
            res.status(200).send(note)
        }

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});


noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).send({ "msg": "A New Notes will be added" })

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});


noteRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, payload);
        res.status(200).send({ "msg": "A  Notes data will be updated" });

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});

noteRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "masai");

    try {
        await NoteModel.findByIdAndDelete({ _id: id });
        res.status(200).send({ "msg": "A  Notes data will be Deleted" });

    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
});


module.exports = {
    noteRouter
}