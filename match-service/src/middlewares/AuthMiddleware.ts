import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const checkAuth = async (req: express.Request, res: express.Response, next: Function) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || ""

  const publicKEY = fs.readFileSync('./public.key', 'utf8');

  jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, (err, value) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.locals.user = (value as jwt.JwtPayload).data
      next()
    }
  })
}