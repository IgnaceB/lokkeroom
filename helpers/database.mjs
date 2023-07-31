import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const {Client}=pg

const connectDB=async(request)=>{
	try{
		const client=new Client({
			user : process.env.PGUSER,
			host : process.env.PGHOST,
			database : process.env.PGDATABASE,
			password : process.env.PGPASSWORD,
			port : process.env.PGPORT
		})
		await client.connect()
		const res = await client.query(request)
		await client.end()
		return res.rows
	}
	catch (error){
		console.log(error)
		throw error
	}
}


export {connectDB} 
