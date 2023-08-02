import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import {connectDB} from '../helpers/database.mjs'
const app = express()
const router = express.Router()


router.post('/', async (req,res)=>{
	let id_lobby=req.body.idLobby
	let id_user=req.body.idUser
	const request='insert into user_to_lobby '
	const results=await connectDB(request)
	res.json(results)

})
export default router