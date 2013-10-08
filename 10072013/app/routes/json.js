// ---------- Include Schemas
    var Team = require('./models/schemas.js');

// ---------- JSON 
    exports.allTeams = function(req, res){
        Team.find({}, function(err, item){
            res.contentType('json');
            res.send({
                data: item
            })
        })
    }

    exports.displayTeam = function(req, res) {
      var teamName = req.params.teamName;
      Team.findOne({'teamName': teamName}, function(err, item){
        res.contentType('json');
        res.send({
          data: item
        });
      });
    }