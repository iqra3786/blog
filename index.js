const express = require('express');
const app = express();
const mongoose = require('mongoose');
const route = require('./src/routes/route');
require('dotenv').config()

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(express.static('storage'))

mongoose.connect(process.env.dbURL,
    
{useNewUrlParser:true})
.then(() => console.log("MongoDb is connected"))
.catch((err) => console.log(err.message))
app.use('/', route);

app.listen(process.env.PORT, ()=> 
console.log(`Port running on ${process.env.PORT}`))


