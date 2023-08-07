import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'


import {connectDB} from '../helpers/database.mjs'
const app = express()
const router = express.Router()
router.use(cookieParser())

router.get('/login', async (req,res)=>{
	const request='select *from users'
	const results=await connectDB(request)
	res.json(results)

})


router.post('/sign',async(req,res)=>{
	let email=req.body.email
	let password=req.body.password
	let admin=req.body.admin
	const request=`insert into users (email,userpassword,isadmin) values ('${email}','${password}','${admin}')`
	await connectDB(request)
	res.send(`create user ${email}`)
})


router.post('/login', async(req,res)=>{
	try{
		let email=req.body.email
		let password=req.body.password
		const request=`select id from users where email='${email}' and userpassword='${password}'`
		const response = await connectDB(request)
		console.log(response.length)
		if (response.length>0 ){
			let user={response}
		
		const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)

		res.cookie('authorization',accessToken,{httpOnly : true})
		res.status(200).send('authorization')
	}
	else {

		return res.status(401).send("no user")

	}
}
catch(error){
	error
}
})

const authentication=(req,res,next)=>{
	const authHeader=req.cookies.authorization

	const token = authHeader 
	console.log(authHeader)
	if (token==null){
		return res.sendStatus(401)
	}
	else {
		jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
			if (err) return res.sendStatus(403)
				else 
			req.user=user
			console.log(user)
			next()
		})
	}
}



export default router