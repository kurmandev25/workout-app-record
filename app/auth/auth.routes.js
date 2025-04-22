import express from 'express'
import { authUser, RegisterUser } from './auth.controllers.js'

const router = express.Router()

router.post('/login', authUser)
router.post('/register', RegisterUser)


export default router
