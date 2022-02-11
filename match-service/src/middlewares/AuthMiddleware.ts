import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const checkAuth = async (req: express.Request, res: express.Response, next: Function) => {
  const nonSecurePaths: string[] = [];
  if (nonSecurePaths.includes(req.path)) return next();

  const token = req.headers.authorization && req.headers.authorization.split(" ")[1] || ""

  const publicKEY = fs.readFileSync('./public.key', 'utf8');

  jwt.verify(token, publicKEY, { algorithms: ['RS256'] }, (err, value) => {
    console.log(err, value)
    if (err) {
      res.status(400).json(err)
    } else {
      next()
    }
  })
}