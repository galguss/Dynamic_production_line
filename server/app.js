const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = 5200;

app.use(bodyParser.urlencoded({extended:false}));
const path = require('path');
app.use(express.static(path.join(__dirname ,'public')));
app.use(express.json());
app.use(morgan('dev'));
app.set("view engine", "ejs");

app.listen(port, (req, res) => {
    console.log(`The Server is running....`);
});

mongoose.connect(process.env.mongoDB);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log(`Now listening on port ${port}`);
});