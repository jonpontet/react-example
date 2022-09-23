import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { route as routeUser } from './route/user.mjs'

import { endPage } from './lib/index.mjs'
import { authorization } from './controller/jwt.mjs'

dotenv.config()


const app = express()

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://rci.localhost'}))
app.use(morgan('dev'))

app.use(cookieParser())

const PORT = 3000

app.get('/',authorization, (req,res)=>{
  console.log('cookies', JSON.parse(JSON.stringify(req.cookies)))
  endPage(res, 'welcome', {connected: req.connected})
})

app.post('/',authorization, (req,res)=>{
  console.log('cookies', JSON.parse(JSON.stringify(req.cookies)))
  console.log('vonnected', req.connected)
  endPage(res, 'welcome', {connected: req.connected})
})

app.use('/user', routeUser)

app.listen(PORT,()=>{
  console.log('App listen on port ', PORT)
  console.log('test', `http://localhost:${PORT}`)
})