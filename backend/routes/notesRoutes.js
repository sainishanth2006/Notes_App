import express from "express"
import { getNotes,getNoteById,postNotes,updateNotes,deleteNotes } from "../controllers/notesController.js"
import { get } from "mongoose"

const router = express.Router()

router.get("/",getNotes)
router.get("/:id",getNoteById)
router.post("/",postNotes)
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)

export default router   