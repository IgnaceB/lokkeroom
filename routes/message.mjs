import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import {connectDB} from '../helpers/database.mjs'
const app = express()
const router = express.Router()


router.get('/', async (req,res)=>{
	const request='select *from users'
	const results=await connectDB(request)
	res.json(results)

})
export default router