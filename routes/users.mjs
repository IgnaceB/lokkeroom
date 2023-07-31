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


router.post('/signUp',async(req,res)=>{
	let email=req.body.email
	let password=req.body.password
	const request=`insert into users (email,userpassword,isadmin) values ('${email}','${password}','0')`
	await connectDB(request)
	res.end()
})


router.post('/', async(req,res,next)=>{
	try{
		let email=req.body.email
		let password=req.body.password
		const request=`select *from users where email='${email}' and userpassword='${password}'`
		const response = await connectDB(request)
		console.log(response.length)
		if (response.length>0 ){
			res.send('match')
			next()

		}
		else {
			return res.status(401).send("no user")
			
		}
	}
	catch(error){
		error
	}
})

router.get('/test', async (req,res)=>{
	const request='select *from users'
	const results=await connectDB(request)
	res.json(results)

})

export default router