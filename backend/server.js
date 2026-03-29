import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.mongo_uri)
const app = express()

connectDB()

app.use(express.json())

app.use((req,res,next)=>{
    console.log("We just got a new req, this is middleware")
    next()
})

app.use("/api/notes",notesRoutes)


app.listen(5001, ()=>{
    console.log("server listening on port 5001")
})


