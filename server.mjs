import express from 'express'
const PORT=3000
const app=express()
import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import {connectDB} from './helpers/database.mjs'

import routerUsers from './routes/users.mjs'
import routerLobby from './routes/lobby.mjs'
import routerUser_to_lobby from './routes/user_to_lobby.mjs'
import routerMessage from './routes/message.mjs'
let connection=0



app.use(express.json())
app.use(bodyParser.urlencoded({extended :true}))

app.use('/users',routerUsers)
app.use('/lobby',routerLobby)
app.use('/message',routerMessage)


app.get('/',(req,res)=>{
	res.send('loading')
})

app.listen(PORT,()=>{
	console.log('backend server running')
})
