const express=require('express')
const router=express.Router()

const {
    getAllNotes,addNote,editNote,deleteNote,getNoteById
}=require('../controllers/noteController')

const {
    authMiddleware
}=require('../middleware/authMiddleware')

router.get('/notes',authMiddleware, getAllNotes)
router.post('/notes',authMiddleware, addNote)
router.put('/notes/:id',authMiddleware, editNote)
router.get('/notes/:id',authMiddleware, getNoteById)
router.delete('/notes/:id',authMiddleware, deleteNote)

module.exports=router

