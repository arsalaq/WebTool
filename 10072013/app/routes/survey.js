	var mongo = require('mongodb');

	var Server = mongo.Server,
	    Db = mongo.Db,
	    BSON = mongo.BSONPure;

// ---------- Include Schemas
	var Team = require('./models/schemas.js');

// ---------- SURVEYS 
	//-- /surveys
	exports.findAll = function(req, res){
		Team.find({}, function(err, allTeams){
			res.render('survey/showTeams', {
				teams: allTeams
			});
		});
	};

	//-- /surveys/add
	exports.addSurvey = function(req, res){
		Team.find({}, function(err, item){
			res.render('survey/beginSurvey', {
				teams: item
			});
		});
	}; 

	//-- /surveys/add/new
	exports.addNewTeamAndReadySurvey = function(req, res){
		var body = req.body;
		new Team({
			teamName: body.teamName,
			business: body.business,
			site: body.site,
			scrumMaster: body.scrumMaster || "No Scrum Master", 
			productOwner: body.productOwner || "No Product Owner",
			interactionDesigner: body.interactionDesigner || "No Interaction Designer",
			qualityEngineer: body.qualityEngineer || "No Quality Engineer",
			architect: body.architect || "No Architect",
			teamMembers: body.teamMembers || "No Team Members"
		}).save(function(err, docs){
			if(err) res.json(err);
			Team.findOne({'teamName': body.teamName}, function(err, item){
				res.render('survey/addSurveyToTeam', {
					data: item,
					quarters: ["Q1 2013", "Q2 2013", "Q3 2013", "Q4 2013"]
				})
			})
		})
	}

	//-- /surveys/add/byTeam
	exports.readySurveyByTeam = function(req, res){
		var body = req.body;
		var i = 0;
		var id = body.placeholder;
		var numberOfTeamMembers = 0;
		if( typeof body.teamMembers.first === 'string' ) {
		    body.teamMembers.first = [ body.teamMembers.first ];
		    body.teamMembers.last = [ body.teamMembers.last ];
		    body.teamMembers.SSO = [ body.teamMembers.SSO ];
		}


		for(m=0; m< body.teamMembers.first.length; m++){
			if(body.teamMembers.first[m] != ""){
				numberOfTeamMembers++;
			}
		}
		body.teamMembers = [
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			}, 
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			}, 
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			},
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			},			
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			}, 
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			},
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			}, 
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			},
			{
				first: body.teamMembers.first[i],
				last: body.teamMembers.last[i],
				SSO:  body.teamMembers.SSO[i++]
			}
 		];
 		if(id != ''){
			Team.findOne({'_id': new BSON.ObjectID(id)}, function(err, docs){
				docs.teamName = body.teamName;
				docs.business = body.business;
				docs.site = body.site;
				docs.subBusiness = body.subBusiness;
				docs.scrumMaster.first = body.scrumMaster.first;
				docs.scrumMaster.last = body.scrumMaster.last;
				docs.scrumMaster.SSO = body.scrumMaster.SSO;
				docs.productOwner.first = body.productOwner.first;
				docs.productOwner.last = body.productOwner.last;
				docs.productOwner.SSO = body.productOwner.SSO;
				docs.interactionDesigner.first = body.interactionDesigner.first;
				docs.interactionDesigner.last = body.interactionDesigner.last;
				docs.interactionDesigner.SSO = body.interactionDesigner.SSO;
				docs.qualityEngineer.first = body.qualityEngineer.first;
				docs.qualityEngineer.last = body.qualityEngineer.last;
				docs.qualityEngineer.SSO = body.qualityEngineer.SSO;
				docs.architect.first = body.architect.first;
				docs.architect.last = body.architect.last;
				docs.architect.SSO = body.architect.SSO;
				console.log(docs.teamMembers.length + "   " + numberOfTeamMembers)
				for(var j=0; j<docs.teamMembers.length; j++){
					docs.teamMembers[j].first = body.teamMembers[j].first;
					docs.teamMembers[j].last = body.teamMembers[j].last;
					docs.teamMembers[j].SSO = body.teamMembers[j].SSO;
					console.log("saved")
				}
				numberOfTeamMembers = numberOfTeamMembers - docs.teamMembers.length;

				for( var k=0; k<numberOfTeamMembers; k++){
					docs.teamMembers.push(
						{
							'first': body.teamMembers[k + docs.teamMembers.length].first, 
							'last': body.teamMembers[k + docs.teamMembers.length].last, 
							'SSO': body.teamMembers[k + docs.teamMembers.length].SSO 
						}
					);
					console.log("pushed")
				}

				docs.save(function(err, result) {
		            if (err) {
		                console.log('Error updating team: ' + err);
		                res.send({'error':'An error has occurred'});
		            } else {
						Team.findOne({'teamName': body.teamName}, function(err, item){
							console.log(" Surveys length: " + item.surveys.length)
							if(item.surveys.length == 0){
								res.render('survey/addSurveyToTeam', {
									data: item,
									quarters: ["Q1 2013", "Q2 2013", "Q3 2013", "Q4 2013"]
								});
							} else {
								res.render('survey/addSurveyToTeam', {
									data: item,
									quarters: ["Q1 2013", "Q2 2013", "Q3 2013", "Q4 2013", "Q1 2014"]
								});
							}
						})
		            }
		        });
			});
 		} else {
 			Team.findOne({'teamName': body.teamName}, function(err, docs){
 				if(docs == null){
		 			var newTeam = new Team;
					newTeam.teamName = body.teamName;
					newTeam.business = body.business;
					newTeam.site = body.site;
					newTeam.subBusiness = body.subBusiness;
					newTeam.scrumMaster.first = body.scrumMaster.first;
					newTeam.scrumMaster.last = body.scrumMaster.last;
					newTeam.scrumMaster.SSO = body.scrumMaster.SSO;
					newTeam.productOwner.first = body.productOwner.first;
					newTeam.productOwner.last = body.productOwner.last;
					newTeam.productOwner.SSO = body.productOwner.SSO;
					newTeam.interactionDesigner.first = body.interactionDesigner.first;
					newTeam.interactionDesigner.last = body.interactionDesigner.last;
					newTeam.interactionDesigner.SSO = body.interactionDesigner.SSO;
					newTeam.qualityEngineer.first = body.qualityEngineer.first;
					newTeam.qualityEngineer.last = body.qualityEngineer.last;
					newTeam.qualityEngineer.SSO = body.qualityEngineer.SSO;
					newTeam.architect.first = body.architect.first;
					newTeam.architect.last = body.architect.last;
					newTeam.architect.SSO = body.architect.SSO;
					newTeam.disbanded = false;
					for( var k=0; k<numberOfTeamMembers; k++){
						newTeam.teamMembers.push(
							{
								'first': body.teamMembers[k].first, 
								'last': body.teamMembers[k].last, 
								'SSO': body.teamMembers[k].SSO 
							}
						);
					}
					newTeam.save(function(err, docs){
						if(err) res.json(err);
						Team.findOne({'teamName': body.teamName}, function(err, item){
							res.render('survey/addSurveyToTeam', {
								data: item, 
								quarters: ["Q1 2013", "Q2 2013", "Q3 2013", "Q4 2013"] 
							})
						})
					})
 				} else {
 					res.send('The team you are trying to create already exists!')
 				}
 			});

 		}
	}

	//-- /surveys/add/submit/:id
	exports.addSurveyToTeam = function(req, res){
		var body = req.body;
		var id = req.params.id;

		Team.findOne({'_id': new BSON.ObjectID(id)}, function(err, item){
			item.surveys.addToSet({
				quarter: body.quarter,
				currentProduct: body.currentProduct,
				currentProject: body.currentProject,
			      team: [
			      	Number(body.team.one) || 0,
			      	Number(body.team.two) || 0,
			      	Number(body.team.three) || 0,
			      	Number(body.team.four) || 0,
			        Number(body.team.five) || 0, 
			        Number(body.team.six) || 0, 
			        Number(body.team.seven) || 0, 
			        Number(body.team.eight) || 0,
			        Number(body.team.nine) || 0,
			        Number(body.team.ten) || 0
			      ],
			      environment: [
			      	Number(body.environment.one) || 0,
			      	Number(body.environment.two) || 0,
			      	Number(body.environment.three) || 0,
			      	Number(body.environment.four) || 0,
			        Number(body.environment.five) || 0, 
			        Number(body.environment.six) || 0, 
			        Number(body.environment.seven) || 0, 
			        Number(body.environment.eight) || 0,
			        Number(body.environment.nine) || 0,
			        Number(body.environment.ten) || 0
			      ],
			      informationRadiators: [
			      	Number(body.informationRadiators.one) || 0,
			      	Number(body.informationRadiators.two) || 0,
			      	Number(body.informationRadiators.three) || 0,
			      	Number(body.informationRadiators.four) || 0,
			        Number(body.informationRadiators.five) || 0, 
			        Number(body.informationRadiators.six) || 0, 
			        Number(body.informationRadiators.seven) || 0, 
			        Number(body.informationRadiators.eight) || 0,
			        Number(body.informationRadiators.nine) || 0,
			        Number(body.informationRadiators.ten) || 0
			      ],
			      process: [
			      	Number(body.process.one) || 0,
			      	Number(body.process.two) || 0,
			      	Number(body.process.three) || 0,
			      	Number(body.process.four) || 0,
			        Number(body.process.five) || 0, 
			        Number(body.process.six) || 0, 
			        Number(body.process.seven) || 0, 
			        Number(body.process.eight) || 0,
			        Number(body.process.nine) || 0,
			        Number(body.process.ten) || 0
			      ],
			      definitionOfReady: [
			      	Number(body.definitionOfReady.one) || 0,
			      	Number(body.definitionOfReady.two) || 0,
			      	Number(body.definitionOfReady.three) || 0,
			      	Number(body.definitionOfReady.four) || 0,
			        Number(body.definitionOfReady.five) || 0, 
			        Number(body.definitionOfReady.six) || 0, 
			        Number(body.definitionOfReady.seven) || 0, 
			        Number(body.definitionOfReady.eight) || 0,
			        Number(body.definitionOfReady.nine) || 0,
			        Number(body.definitionOfReady.ten) || 0
			      ],
			      definitionOfDone: [
			      	Number(body.definitionOfDone.one) || 0,
			      	Number(body.definitionOfDone.two) || 0,
			      	Number(body.definitionOfDone.three) || 0,
			      	Number(body.definitionOfDone.four) || 0,
			        Number(body.definitionOfDone.five) || 0, 
			        Number(body.definitionOfDone.six) || 0, 
			        Number(body.definitionOfDone.seven) || 0, 
			        Number(body.definitionOfDone.eight) || 0,
			        Number(body.definitionOfDone.nine) || 0,
			        Number(body.definitionOfDone.ten) || 0
			      ],
			      qualityMetrics: [
			      	Number(body.qualityMetrics.one) || 0,
			      	Number(body.qualityMetrics.two) || 0,
			      	Number(body.qualityMetrics.three) || 0,
			      	Number(body.qualityMetrics.four) || 0,
			        Number(body.qualityMetrics.five) || 0, 
			        Number(body.qualityMetrics.six) || 0, 
			        Number(body.qualityMetrics.seven) || 0, 
			        Number(body.qualityMetrics.eight) || 0,
			        Number(body.qualityMetrics.nine) || 0,
			        Number(body.qualityMetrics.ten) || 0
			      ],
			      continuousIntegration: [
			      	Number(body.continuousIntegration.one) || 0,
			      	Number(body.continuousIntegration.two) || 0,
			      	Number(body.continuousIntegration.three) || 0,
			      	Number(body.continuousIntegration.four) || 0,
			        Number(body.continuousIntegration.five) || 0, 
			        Number(body.continuousIntegration.six) || 0, 
			        Number(body.continuousIntegration.seven) || 0, 
			        Number(body.continuousIntegration.eight) || 0,
			        Number(body.continuousIntegration.nine) || 0,
			        Number(body.continuousIntegration.ten) || 0
			      ],
			      buildTime: Number(body.buildTime),
			      hardeningSprints: Number(body.hardeningSprints),
			      subjective: [
			     	Number(body.subjective[0]) || 0,
			      	Number(body.subjective[1]) || 0,
			      	Number(body.subjective[2]) || 0,
			      	Number(body.subjective[3]) || 0,
			        Number(body.subjective[4]) || 0, 
			        Number(body.subjective[5]) || 0, 
			        Number(body.subjective[6]) || 0, 
			        Number(body.subjective[7]) || 0,
			        Number(body.subjective[8]) || 0,
			        Number(body.subjective[9]) || 0
			      ],
			      improvementGoal: body.improvementGoal || "No Improvement Goal(s)",
			      issues: body.issues || "No Issues"
			});
			//console.log(item.surveys[1].continuousIntegration)

			item.save(function(err){
				if(err) console.log(err);
			});
		})
	//res.send(body)
		res.redirect('/surveys');
	}

	exports.saveChange = function(req, res){
		var body = req.body;

		Team.findOne({'_id': new BSON.ObjectID(body.placeholder)}, function(err, docs){
			docs.teamName= body.teamName;
			docs.business = body.business;
			docs.site = body.site;
			docs.scrumMaster = body.scrumMaster;
			docs.productOwner = body.productOwner;
			docs.interactionDesigner = body.interactionDesigner;
			docs.qualityEngineer = body.qualityEngineer;
			docs.architect = body.architect;
			docs.teamMembers = body.teamMembers;
			docs.save(function(err, result) {
	            if (err) {
	                console.log('Error updating team: ' + err);
	                res.send({'error':'An error has occurred'});
	            } else {
	                console.log('' + result + ' document(s) updated');
	                res.send("success!" );
	            }
	        });
		})
	}


	exports.markDisbanded = function(req, res){
		var body = req.body;
		console.log(body.placeholder)

		Team.findOne({'_id': new BSON.ObjectID(body.placeholder)}, function(err, docs){
			docs.disbanded = body.disbanded;
			docs.save(function(err, result) {
	            if (err) {
	                console.log('Error updating team: ' + err);
	                res.send({'error':'An error has occurred'});
	            } else {
	                console.log('' + result + ' document(s) updated');
	                res.send("This team has successfully been marked as disbanded!" );
	            }
	        });
		})
	}


	exports.toolIssues = function(req, res){
	    Team.find({}, function(err, allTeams){
	        res.render('survey/toolIssues');
	    });
	}

