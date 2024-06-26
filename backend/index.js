import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || 'localhost'

app.get('/api', (_, res) => {
    res.status(200).json({
        message: 'Api [scribble]'
    })
})

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
)

app.listen(PORT, () => console.log(`visit http://${HOST}:${PORT}`))
