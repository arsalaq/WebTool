// ---------- Mongoose Connect
    var mongoose = require('mongoose');

    var SurveySchema = new mongoose.Schema({
        quarter: String,
        joinOrLeave: Boolean,
        membersJoined: [String],
        membersLeft: [String],
        currentProduct: String,
        currentProject: String,
          team: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          environment: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          informationRadiators: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          process: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          definitionOfReady: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          definitionOfDone: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          qualityMetrics: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          continuousIntegration: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number, 
            six: Number, 
            seven: Number, 
            eight: Number,
            nine: Number,
            ten: Number
          },
          buildTime: Number,
          hardeningSprints: Number,
          subjective: {
            one: Number,
            two: Number,
            three: Number,
            four: Number,
            five: Number,
            six: Number,
            seven: Number,
            eight: Number,
            nine: Number,
            ten: Number
          },
          improvementGoal: String,
          issues: String
    });

    var TeamSchema = new mongoose.Schema({
        teamName: String,
        business: String,
        site: String,
        scrumMaster: String,
        productOwner: String,
        interactionDesigner: String,
        qualityEngineer: String,
        architect: String,
        teamMembers: [String],
        disbanded: Boolean,
        surveys: [SurveySchema]
    })

    module.exports = mongoose.model('teams', TeamSchema);
