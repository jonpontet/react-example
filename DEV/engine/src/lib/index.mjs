
import crypto from 'crypto'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs-extra'
import {fileURLToPath} from 'url'

dotenv.config()



const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const PATH_DATA = '/var/lib/data' // path.resolve(__dirname, '../', process.env.PATH_DATA)

console.log("PATH_DATA", PATH_DATA)

fs.ensureDir(PATH_DATA)
export const endPage = (response, message = null, data = null, error = null, status = null) => {

  console.log('COOKIES', response.cookie.userv)
  const ojson = {}
  ojson._id = crypto.randomUUID()
  ojson.date = new Date().toISOString()

  if(error) {
    ojson.error = error
    return response.status((status)?status:400).json(ojson)
  }

  ojson.message = (message)? message: 'welcome'
  if(data) ojson.data = data
  return response.status((status)?status:200).json(ojson)
}