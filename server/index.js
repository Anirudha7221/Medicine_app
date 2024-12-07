const express = require('express');

const auth = require('./auth');

const bcrypt = require('bcrypt');
const saltround=10;

const JWT = require("jsonwebtoken");

const cors = require('cors');

const connectDB= require('./database');

connectDB();

const PORT = process.env.PORT || 8000;

const app =express();

app.use(express.json());
app.use(cors);


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await db.users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = JWT.sign(
            { id: user.id, email: user.email },
                process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/admin', auth, async (req, res) => {
    const userId = req.user.id;
    const user = await db.users.findOne({ where: { id: userId } });

    res.json({ message: `Welcome ${user.name}!`, user });
});

app.listen(PORT,()=>{
    console.log("app is running");
});