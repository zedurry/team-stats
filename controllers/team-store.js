//require express
const express = require('express');

// initialize the express router
const statsRouter = express.Router();

//require modles
const Player = require('../models/players');

// Routes

//Seed
const playersSeed = require('../models/playersSeed');

statsRouter.get('/seed', (req, res) => {
	Player.deleteMany({}, (error, allPlayers) => {});

    Player.create(playersSeed, (error, data) => {
		res.redirect('/team-stats');
	});
});

// Index ----------------------------------
statsRouter.get('/', (req, res) => {
    Player.find({}, (error, players) => {
		res.render('index.ejs', {players});
	});
});


// New --------------------------------------------------------------------------

// Delete ------------------------------------------------


// Update ----------------------------------



// Create----------------------------------------------------


// Edit ----------------------------------


// Show ------------------------------------------------
statsRouter.get('/:id', (req, res) => {
	Player.findById(req.params.id, (err, player) => {
		res.render('show.ejs', { player })
	
	});
});


module.exports = statsRouter;