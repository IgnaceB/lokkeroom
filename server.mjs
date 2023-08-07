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
import routerLive from './routes/live.mjs'

app.use(express.json())
app.use(bodyParser.urlencoded({extended :true}))
app.use(cookieParser())



const authentication=(req,res,next)=>{
	const token=req.cookies.authorization
	console.log(token)
	let id 
	if (token==null){
		return res.sendStatus(401)
	}
	else {
		jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
			if (err) return res.sendStatus(403)
				else 
			console.log(user)
			id=(user.response[0].id)
			res.locals.id=id
			console.log(id)
			next()
		})
	}
	return id
}


app.use('/users',routerUsers)


app.use('/lobby',authentication, routerLobby)
app.use('/message',authentication, routerMessage)
app.use('/live',authentication,routerLive)

app.get('/',(req,res)=>{
	res.redirect('/users')
})

app.listen(PORT,()=>{
	console.log('backend server running')
})
