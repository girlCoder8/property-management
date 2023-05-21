const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
require("dotenv").config({ path: '../.env' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbURI = process.env.MONGODB_LOCAL_URI;

app.use(
    session({
        secret: process.env.mongoStoreSECRET,
        store: mongoStore.create({ mongoUrl: dbURI }),
        resave: false,
        saveUninitialized: false,
        ttl: 60 * 60 * 2
    })
);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}));
app.use('/auth', require('./routes/auth'));
app.use('/property', require('./routes/property'));
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err));

app.listen(9000, () => console.log("Server started on 9000 port"))