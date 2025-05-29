import express from 'express';
import jwt from 'jsonwebtoken';
import {db} from '../db/db.js';

const router = express.Router();

router.post('/login', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({message: 'Missing Basic Authentication Header'});
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const user = db.select().from(users).where(and(eq(username, user.username), eq(password, user.password)))
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token = jwt.sign({username: user.username}, process.env.JWT_SECRET, { expires: "8h"});
    res.json({token});
})

export default router;