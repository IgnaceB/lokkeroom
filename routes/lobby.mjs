import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import {connectDB} from '../helpers/database.mjs'
const app = express()
const router = express.Router()


router.post('/create', async (req,res)=>{
	let admin=req.body.idUser
	let lobbyName=req.body.lobbyName
	const request=`insert into lobby (id_admin,name) VALUES ('${admin}','${lobbyName}')`
	const request2=`
	insert into user_to_lobby (id_lobby,id_user)
	select id,id_admin from lobby 
	where lobby.id not in(
	select lobby.id from lobby 
	inner join user_to_lobby on user_to_lobby.id_lobby = lobby.id)`
	const results=await connectDB(request)
	const updateTransiTable=await connectDB(request2)
	res.send("lobby created")
})


router.get('/:idlobby', async (req,res)=>{
	console.log(req.params)
	const request=`select *from message where id_lobby='${req.params.idlobby}'`
	const requestVerif=`select *from user_to_lobby where id_user='${req.body.idUser}' and id_lobby='${req.params.idlobby}'`
	const verif= await connectDB(requestVerif)
	console.log(verif)
	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})

router.post('/:idlobby', async (req,res)=>{
	let messageContent=req.body.content
	let user=req.body.idUser
	console.log(req.params.idLobby)
	const request=`insert into message (id_lobby,body,id_user) 
	VALUES ('${req.params.idlobby}','${messageContent}','${user}')`
	const requestVerif=`select *from user_to_lobby where id_user='${req.body.idUser}' and id_lobby='${req.params.idlobby}'`

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.send('message sent')
}
	else {
		res.sendStatus(404)
	}
})

router.get('/:idlobby/users', async (req,res)=>{
	let user=req.body.idUser
	const request=`select distinct users.id, users.email from users
	inner join user_to_lobby on user_to_lobby.id_user=users.id
	where user_to_lobby.id_lobby='${req.params.idlobby}'`
	const requestVerif=`select *from lobby 
	where lobby.id='${req.params.idlobby}' and lobby.id_admin='${user}' `

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})

router.get('/:idlobby/add-user', async (req,res)=>{
	let user=req.body.idUser
	let userToAdd=req.body.userToAdd
	const request=`insert into user_to_lobby (id_lobby,id_user) VALUES ('${req.params.idlobby},'${userToAdd}')`
	const requestVerif=`select *from lobby 
	where lobby.id='${req.params.idlobby}' and lobby.id_admin='${user}' `

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})

router.get('/:idlobby/remove-user', async (req,res)=>{
	let user=req.body.idUser
	let userToAdd=req.body.userToAdd
	const request=`delete user_to_lobby where id_lobby='${req.params.idlobby}' and id_user='${userToAdd}'`
	const requestVerif=`select *from lobby 
	where lobby.id='${req.params.idlobby}' and lobby.id_admin='${user}' `

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})

router.get('/:idlobby/:idmessage', async (req,res)=>{
	let user=req.body.idUser
	const request=`select *from message where id_lobby='${req.params.idlobby}' and id='${req.params.idmessage}'`
	const requestVerif=`select *from lobby 
	inner join message on message.id_lobby=lobby.id 
	inner join user_to_lobby on user_to_lobby.id_lobby=lobby.id
	where lobby.id='${req.params.idlobby}' and message.id='${req.params.idmessage}'`

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})

router.post('/:idlobby/:idmessage', async (req,res)=>{
	let user=req.body.idUser
	const request=`delete message where id='${req.params.idmessage}'`
	const requestVerif=`select *from lobby 
	inner join message on message.id_lobby=lobby.id 
	inner join user_to_lobby on user_to_lobby.id_lobby=lobby.id
	where lobby.id='${req.params.idlobby}' and message.id='${req.params.idmessage}' and message.user_id='${user}'`

	const verif= await connectDB(requestVerif)

	if (verif.length>0){
	const results=await connectDB(request)
	res.json(results)}
	else {
		res.sendStatus(404)
	}
})


export default router