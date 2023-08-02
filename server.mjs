import express from 'express'
const PORT=3000
const app=express()
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import {connectDB} from './helpers/database.mjs'
import cookieParser from 'cookie-parser'



import routerUsers from './routes/users.mjs'
import routerLobby from './routes/lobby.mjs'
import routerUser_to_lobby from './routes/user_to_lobby.mjs'
import routerMessage from './routes/message.mjs'


app.use(express.json())
app.use(bodyParser.urlencoded({extended :true}))
app.use(cookieParser())

const authentication=(req,res,next)=>{
	const authHeader=req.cookies.authorization
	const token = authHeader 
	console.log(authHeader)
	if (token==null){
		return res.sendStatus(401)
	}
	else {
		jwt.verify(authHeader,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
			if (err) return res.sendStatus(403)
				else 
			req.user=user
			console.log(user)
			next()
		})
	}
}


app.use('/users',routerUsers)


app.use('/lobby',authentication, routerLobby)
app.use('/message',authentication, routerMessage)


app.get('/',(req,res)=>{
	res.redirect('/users')
})

app.listen(PORT,()=>{
	console.log('backend server running')
})
