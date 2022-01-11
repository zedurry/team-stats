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

statsRouter.get('/scores', (req, res) => {
    Player.find({}, (error, players) => {
		res.render('scores.ejs', {players});
	});
});

statsRouter.get('/turns', (req, res) => {
    Player.find({}, (error, players) => {
		res.render('turns.ejs', {players});
	});
});

statsRouter.get('/blocks', (req, res) => {
    Player.find({}, (error, players) => {
		res.render('blocks.ejs', {players});
	});
});

// New --------------------------------------------------------------------------
statsRouter.get('/new', (req, res) => {
	res.render('new.ejs')
});

// Delete ------------------------------------------------
statsRouter.delete("/:id", (req, res) => {
	Player.findByIdAndDelete(req.params.id, (err, data) => {
		res.redirect("/")
	})
})

// Update ----------------------------------
statsRouter.put("/:id", (req, res) => {
	
	Player.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
		  new: true,
		},
		(error, updatedPlayer) => {
		  res.redirect(`/team-stats/${req.params.id}`)
		}
	  ) 
     });


// Create----------------------------------------------------
statsRouter.post('/', (req, res) => {
	Player.create(req.body, (error, newPlayer) => {
		res.redirect('/');
	});
});


// Edit ----------------------------------
statsRouter.get("/:id/edit", (req, res) => {
	Player.findById(req.params.id, (error, player) => {
	  res.render("edit.ejs", { player })
	})
  })

// Show ------------------------------------------------
statsRouter.get('/:id', (req, res) => {
	Player.findById(req.params.id, (err, player) => {
		res.render('show.ejs', { player })
	
	});
});


module.exports = statsRouter;