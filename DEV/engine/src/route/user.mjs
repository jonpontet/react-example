import express from 'express'
import bcrypt from 'bcrypt'
import {createHash,  randomBytes, randomUUID} from 'crypto'
import cryptoJS from 'crypto-js'
import slugify from 'slugify'
import fs from 'fs-extra'
import { join } from 'path'
import { endPage, PATH_DATA } from '../lib/index.mjs'

import { addAuthorization } from '../controller/jwt.mjs'

const saltRounds = 10

const md5 = (str) => createHash('md5').update(str).digest("hex")


export const route = express.Router()

route.get("/", (req, res)=> {
  res.redirect("/")
})

route.get("/logout", (req, res)=> {
  res.cookie('user', 'deconnected', {maxAge: 100, httpOnly: false})
  res.cookie('userv', 'deconnected', {maxAge: 100})
  return endPage(res, 'deconnected')
})

route.post('/login',(req,res)=>{
  const { login, password } = req.body

  if(!(login && password)) return endPage(res,null,null,'bad request', 403)

  const fileName = md5(slugify(login)),
    pathUserFile = join(PATH_DATA, fileName)

  fs.pathExists(pathUserFile)
  .then(exists=>{
    if(!exists) {
      console.error('User dont exist')
      endPage(res,null,null,'User unknown', 403)
      return
    }
    fs.readJson(pathUserFile)
    .then(pkgUser => {
      bcrypt.compare(password, pkgUser.hash, function(error, result) {
        if(error) {
          console.log('brcypt error', error)
          endPage(res,null,null,error, 500)
          return
        }
        if(!result) return endPage(res,null,null,'error authentication', 403)
        if(result) {
          const dataCookieString = JSON.stringify(pkgUser.data),
            encryptCookie = cryptoJS.AES.encrypt(dataCookieString, pkgUser.secretKey).toString()
          res.cookie('user', dataCookieString , {maxAge: (1 * 60 * 60 * 1000), httpOnly: false})
          
          res.cookie('userv', encryptCookie, {maxAge: (1 * 60 * 60 * 1000), httpOnly: true})
          const data = {
            _id: randomUUID(),
            connected: true,
            user: pkgUser.data,
          }
          return addAuthorization(
            data,
            res
          )
        }
      })
    })
    .catch(error=>{
      console.error('readFile error', error)
      endPage(res,null,null,error, 500)
    })
  })
  .catch(error=>{
    console.error('pathExists error', error)
    endPage(res,null,null,error, 500)
  })
})

const byteSize = str => new Blob([str]).size

route.post('/add',(req,res)=>{
  const { login, password, permissions } = req.body

  if(!(login && password && permissions)) return endPage(res,null,null,'bad request', 403)

  const fileName = md5(slugify(login)),
    pathUserFile = join(PATH_DATA, fileName)

  fs.pathExists(pathUserFile)
  .then(exists=>{
    if(exists) return endPage(res,null,null,'user exists', 403)
    const pkgUser = {}
    bcrypt.hash(password, saltRounds, function(error, hash) {
      if(error) return endPage(res,null,null,error, 500)
      pkgUser.hash = hash
      pkgUser.secretKey = randomBytes(64).toString('hex')
      pkgUser.data = {
        login,
        createdAt: new Date().toISOString(),
        permissions,
      }
      fs.writeJson(pathUserFile, pkgUser)
      .then(()=>endPage(res, 'User added'))
      .catch(error=>endPage(res,null,null,error, 500))
    })
  })
  .catch(error=>endPage(res,null,null,error, 500))
})
