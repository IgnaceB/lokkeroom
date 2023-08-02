import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import {connectDB} from '../helpers/database.mjs'
const app = express()
const router = express.Router()


router.post('/:idmessage', async (req,res)=>{
	let user=req.body.idUser
	const request=`delete from message where id='${req.params.idmessage}'`
	const requestVerif=`select *from message 
	where id_user='${user}' and id='${req.params.idmessage}'`

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})

export default router