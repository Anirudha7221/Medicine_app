const express = require('express');

const path = require('path');

const bcrypt = require('bcrypt')

const cors = require('cors');
const saltround=10;

// const connectDB= require('./database');

// connectDB();

const PORT = process.env.PORT || 8000;

const app =express();

app.use(express.json());
app.use(cors);

app.listen(PORT,()=>{
    console.log("app is running");
});