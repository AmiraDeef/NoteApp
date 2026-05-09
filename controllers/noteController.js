const Note = require('../models/Note')
const { noteSchema } = require('./validation/noteValidation')

const getAllNotes = async (req, res) => {
    try {
        const userId = req.user
        const existingNotes = await Note.find({ user: userId })
        if (!existingNotes) {
            return res.status(400).json({
                msg: "not found"
            })
        }
        return res.status(200).json({
            notes: existingNotes
        })
    } catch (error) {
       next(error)
    }
}
const getNoteById = async (req, res) => {
    try {
        const userId = req.user
        console.log(req.params.id);

        const existingNote = await Note.findById(req.params.id)
        if (!existingNote) {
            return res.status(400).json({
                msg: "not found"
            })
        }
        return res.status(200).json({
            note: existingNote
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "server error"
        })
    }

}
const addNote = async (req, res) => {
    try {
        const { error, value } = noteSchema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        if (error) {
            return res.status(400).json({
                error: error.details.map((err) => err.message)
            })
        }
        const userId = req.user

        const { title,description } = value
        const note=await Note.findOne({title})
        if(note){
            return res.status(400).json({
            msg: "title must be unique",
        });
        }
        const newNote = await Note.create({ title, user: userId })
        res.status(201).json({
            msg: "Done Created New Note",
        });


    } catch (error) {console.error(error);
      next(error)
    }
}

const deleteNote = async (req, res) => {

    try {
        console.log(req.params.id);

        const existingNote = await Note.findByIdAndDelete(req.params.id)
        if (!existingNote) {
            return res.status(400).json({
                msg: "not found"
            })
        }

        return res.status(200).json({
            msg: "deleted successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "server error"
        })
    }

}
const editNote = async (req, res) => {
    try {
        console.log(req.params.id);
        const { error, value } = noteSchema.validate(req.body, {
            abortEarly: false, stripUnknown: true

        })
        if (error) {
            return res.status(400).json({
                error: error.details.map((err) => err.message)
            })
        }
        const existingNote = await Note.findByIdAndUpdate({ _id: req.params.id, user: req.user }, { $set: value }, { new: true, runValidators: true })
        if (!existingNote) {
            return res.status(400).json({
                msg: "not found"
            })
        }

        return res.status(200).json({
            msg: "edited successfully", note: existingNote
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "server error"
        })
    }
}

module.exports = { getAllNotes, addNote, getNoteById, deleteNote, editNote }