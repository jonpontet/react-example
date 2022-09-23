import jwt from 'jsonwebtoken'
import fs from 'fs-extra'
import { randomBytes, randomUUID } from 'crypto'

const exists = fs.pathExistsSync(`/var/lib/data/._hsh`)

if (!exists) fs.writeFileSync(`/var/lib/data/._hsh`, randomBytes(1024).toString('hex'), { encoding: 'utf8' })

const hash = fs.readFileSync(`/var/lib/data/._hsh`, { encoding: 'utf8' })

export const authorization = (req, res, next) => {
	const {token} = req.cookies.tk_auth || req.body;

  console.log('token ->', token)
	if (!token) {
		req.connected = false
		return next()
	}
	try {
		jwt.verify(token, hash, (err, decoded) => {
      console.log('decoded', decoded)
			console.log('error',err)
			if (err) {
				req.connected = false
				return next()
			}
      for(let k in decoded) {
        req[k] = decoded[k]
      }
			req.connected = true
			return next()
		})
	} catch {
		req.connected = false
		return next()
	}
}

export const addAuthorization = (dataso, res) => {
	const token = jwt.sign(dataso, hash);
	return res
		.cookie("tk_auth", token, {
			httpOnly: true,
			secure: true,
		})
		.status(200)
		.json(
			{
				id: randomUUID(),
				date: new Date().toISOString(),
				connected: true,
        token,
				message: "Authorization action successfully 😊 👌" 
			}
		);
}
