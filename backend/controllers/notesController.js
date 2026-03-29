import note from "../models/note.js"

export async function getNotes(req,res){
    try{
        const notes = await note.find().sort({createdAt: -1}); //newest note first
        res.status(200).json(notes)
    }catch(err){
        console.log("error in getting all notes")
        res.status(500).send({message:"Internal server error"})
    }
}

export async function getNoteById(req,res){
    try{
        const noteId = req.params.id;
        const noteData = await note.findById(noteId)
        res.status(200).json(noteData)

    }catch(err){
        console.log("error in getting note by give id: ",err)
        res.status(500).send({message:"Internal server error"})
    }
}

export async function postNotes(req,res){
    try{
        const {title,content} = req.body;
        const newNote = new note({title,content})


        const savedNote = await newNote.save()
        res.status(200).json(savedNote)
    }catch(err){
        console.log("error in adding note")
        res.status(500).send({message:"Internal server error"})
    }
}

export async function updateNotes(req,res){
    try{
        const {title,content} = req.body;
        const updatedNote = await note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updatedNote){
            return res.status(404).send({message:"Note not found"}) 
        }

        res.status(200).json(updatedNote)
    }catch(err){
        console.log("error in updating note: ",err)
        res.status(500).send({message:"Internal server error"})
    }

}

export async function deleteNotes(req,res){
    try{
        const deletedNote = await note.findByIdAndDelete(req.params.id)
        
        res.status(200).json(deletedNote)
    }catch(err){
        console.log("error in deleting note: ",err)
        res.status(500).send({message:"Internal server error"})
    }
}   