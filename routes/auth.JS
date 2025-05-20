import express from 'express';
import jwt from 'jsonwebtoken';
import {validateBody}

const router = express.Router();

router.post('login/login', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startswith("Basic ")) {
        return res.status(401).json({message: 'Missing Basic Authentication Header'});
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, oassword] = credentails.split(':');

    const user = db.select().from(users).where(and(eq(username, users.username), eq(password, users.password)))
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }
})