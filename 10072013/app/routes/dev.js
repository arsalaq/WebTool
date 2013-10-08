// ---------- Include Schemas
    var Team = require('./models/schemas.js');

// ---------- DEV
	exports.results = function(req, res){
	    res.render('dev/runner')
	}
	exports.test = function(req, res){
	    res.render('test')
	}