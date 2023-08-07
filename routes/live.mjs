import express from 'express'
import dotenv from 'dotenv'
dotenv.config()


import {connectDB} from '../helpers/database.mjs'
const app = express()
const router = express.Router()

router.get('/',async (req,res)=>{
	let userId=res.locals.id
	const FindAllChat=`select distinct live.id_sender, users.email from live
	inner join users on id_sender=users.id
	 where id_receiver='${res.locals.id}'
	 `
	 const result=await connectDB(FindAllChat)
	 res.json(result)

})
router.get('/:idSender',async(req,res)=>{
	let userId=res.locals.id
	const FindAllMessages=`select *from live where id_sender='${req.params.idSender}' and id_receiver='${userId}'
	 `
	 const result=await connectDB(FindAllMessages)
	 if (result.length>0){
	 	res.json(result)
	 }
	 else {
	 	res.sendStatus(404)
	 }
})
router.post('/:idSender',async(req,res)=>{
	let userId=res.locals.id
	let content=req.body.content
	const createMessage=`insert into live (id_sender,id_receiver,body) 
	VALUES ('${req.params.idSender}','${userId}','${content}')
	 `
	 const result=await connectDB(createMessage)
	 res.json(`message sent to ${req.params.idSender}`)
})

export default router