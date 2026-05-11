const express=require('express')
const router=express.Router()

const {
    getAllNotes,addNote,editNote,deleteNote,getNoteById
}=require('../controllers/noteController')
const imgNote=require('../middleware/uplodeMiddleware')

const {
    authMiddleware
}=require('../middleware/authMiddleware')

router.get('/notes',authMiddleware, getAllNotes)
router.post('/notes',imgNote,authMiddleware, addNote)
router.put('/notes/:id',imgNote,authMiddleware, editNote)
router.get('/notes/:id',authMiddleware, getNoteById)
router.delete('/notes/:id',authMiddleware, deleteNote)

module.exports=router

