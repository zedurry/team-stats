// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const {application} = require('express')
const statsController = require('./controllers/team-store')


// initialize the express app
//----------------------------------------------------------------
const app = express();
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


// configure server settings
//----------------------------------------------------------------
require('dotenv').config();
const { PORT, DATABASE_URL } = process.env;

// Database Connection
mongoose.connect(DATABASE_URL);


// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));


// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on("error", (err) => console.log(err.message + " is mongo not running?"))
db.on("connected", () => console.log("mongo connected"))
db.on("disconnected", () => console.log("mongo disconnected"))

// routes ----------------------------------------------------------------
app.get('/', (req, res) => res.redirect('/team-stats'));

app.use('/team-stats', statsController);

app.get('*', (req, res) => res.render('404.ejs'));


//----------------------------------------------------------------
app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log(`Express is listening on port:${PORT}`);
});