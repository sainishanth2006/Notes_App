import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js"

dotenv.config()
console.log(process.env.mongo_uri)
const app = express()



app.use(express.json())

app.use((req,res,next)=>{
    console.log("We just got a new req, this is middleware")
    next()
})

app.use(rateLimiter)
app.use("/api/notes",notesRoutes)


connectDB().then(()=>{
    app.listen(5001, ()=>{
    console.log("server listening on port 5001")
    })
})



