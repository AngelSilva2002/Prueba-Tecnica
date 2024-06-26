import express from 'express'
import morgan from 'morgan'
import Authrouter from './routes/auth.routes.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use("/api/auth", Authrouter)

export default app