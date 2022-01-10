const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
	name: { type: String, required: true },
    assists: {type: Number, minimum: 0, required: true},
    goals: {type: Number, minimum: 0, required: true},
    blocks: {type: Number, minimum: 0, required: true},
    drops: {type: Number, minimum: 0, required: true},
    throwAways: {type: Number, minimum: 0, required: true},
}, {timestamps: true});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;