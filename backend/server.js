import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import rateLimiter from "./middleware/ratelimiter.js"
import path from "path"

dotenv.config()
console.log(process.env.mongo_uri)
const app = express()
const __dirname = path.resolve()
if(process.env.NODE_ENV ==="production"){
    app.use(cors({
        origin: ["http://127.0.0.1:5173"]
    }))
}

app.use(express.json())

app.use((req,res,next)=>{
    console.log("We just got a new req, this is middleware")
    next()
})

app.use(rateLimiter)
app.use("/api/notes",notesRoutes)

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/notes_app/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/notes_app","dist","index.html"))
    })
}


connectDB().then(()=>{
    app.listen(5001, ()=>{
    console.log("server listening on port 5001")
    })
})

