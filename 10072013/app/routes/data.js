// ---------- Include Schemas
    var Team = require('./models/schemas.js');

// ---------- Data 
    exports.quarterView = function(req, res){
        res.render('data/quarterView');
    };
    exports.questionView = function(req, res){
        res.render('data/questionView');
    };
    exports.overallView = function(req, res){
        res.render('data/overallView');
    };
    exports.displayTeamView = function(req, res){
        var teamName = req.params.teamName;
        Team.findOne({'teamName': teamName}, function(err, item){
            if(item.surveys.length < 1){
                res.redirect('surveys/add')
            } else {
                res.render('data/teamView', {
                    teamResult: item
                });
            }
        });
    };
    exports.printTeam = function(req, res){
        var teamName = req.params.teamName;
        Team.findOne({'teamName': teamName}, function(err, item){
            if(item.surveys.length < 1){
                res.redirect('surveys/add')
            } else {
                res.render('data/teamPrint', {
                    teamResult: item
                });
            }
        });
    };

    exports.submissionStatus = function(req, res){
        var teamName = req.params.teamName;
        Team.find({}, function(err, item){
                res.render('data/scorecardStatus', {
                    teamResult: item
                });
        });
    };