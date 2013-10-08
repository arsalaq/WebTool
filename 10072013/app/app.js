// ---------- Include Files
	var express = require('express')
	  , http = require('http')
	  , path = require('path')
	  , mongoose = require('mongoose')
	  , verbose = process.env.NODE_ENV != 'test'
	  , survey = require('./routes/survey')
	  , data = require('./routes/data')
	  , json = require('./routes/json')
	  , dev = require('./routes/dev')
	  , surveyImportOld = require('./routes/surveys_importData')
	  , importSample = require('./routes/importSample');


	var app = express();

	app.map = function(a, route){
	  route = route || '';
	  for (var key in a) {
	    switch (typeof a[key]) {
	      // { '/path': { ... }}
	      case 'object':
	        app.map(a[key], route + key);
	        break;
	      // get: function(){ ... }
	      case 'function':
	        if (verbose) console.log('%s %s', key, route);
	        app[key](route, a[key]);
	        break;
	    }
	  }
	};

// ---------- All Environments
	app.set('port', process.env.PORT || 80);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

// ---------- For development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

// ---------- Setting up connection to mongodb Database and module | Only needed for BSON usage
	var mongo = require('mongodb');

	var Server = mongo.Server,
	    Db = mongo.Db,
	    BSON = mongo.BSONPure;


	var server = new Server('localhost', 27017, {auto_reconnect: true});
	db = new Db('ScorecardProduction', server);

	db.open(function(err, db) {
	    if(!err) {
	        console.log("Connected to 'ScorecardProduction' database");
	    }
	});

// ---------- Mongoose Connect
	var mongoose = require('mongoose');
	mongoose.connect("mongodb://localhost/ScorecardProduction", function(err){
	  if (err) console.log("Cannot connect to database");
	  else console.log("Connected to database Development")
	});

// ---------- Routes Map
	app.map({
		'/mapper':{
			get: function(req, res){
				res.render('dev/mapper')
			}
		},
		'/': {
			get: function(req, res){
					res.render('survey/beginSurvey')
				}
		},
		// '/import': {
		// 	get: importSample.importSampleTeam
		// },
		'/surveys': {
			get: survey.findAll,
			'/add': {
				get: survey.addSurvey, 
				'/new': {
					post: survey.addNewTeamAndReadySurvey
				},
				'/:teamName': {
					post: survey.readySurveyByTeam,
					put: survey.readySurveyByTeam,
					get: survey.readySurveyByTeamGet
				}, 
				'/submit': {
					'/:id': {
						post: survey.addSurveyToTeam
					}
				}
			}, 
			'/change': {
				'/markDisbanded': {
					put: survey.markDisbanded
				}
			}
		},
		'/team': {
			'/issues': {
				get: survey.toolIssues
			}
		},
		'/data': {
			'/quarterAnalysis': {
				get: data.quarterView
			},
			'/questionAnalysis': {
				get: data.questionView
			},
			'/overallAnalysis': {
				get: data.overallView
			},
			'/team': {
				'/:teamName': {
					get: data.displayTeamView,
					'/print': {
						get: data.printTeam
					}
				}
			},
			'/submissionStatus': {
				get: data.submissionStatus
			},
		}, 
		'/JSON': {
			'/allTeams': {
				get: json.allTeams
			},
			'/:teamName': {
				get: json.displayTeam
			}
		},
		'/test': {
			get: dev.test
		}, 
		'/tests':{
			get: dev.results
		}
	});


// for importing teams and survey after Q1 & Q2 2013. Do not use. 
	 app.get('/import/jsonSurvey/:begin/:end', surveyImportOld.importJSONSurveys);
	// app.get('/import/jsonTeam', surveyImportOld.importJSONTeam);


// ---------- Delete Requests

// app.delete('/surveys/:id', surveys.deleteSurvey); 

// ---------- Create Server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
