import {Router} from 'express'
import {login, register, profile} from '../controllers/auth.controller.js'


const router = Router()

router.post("/register", register)

router.post("/login", login)


router.post("/profile", profile)


export default router