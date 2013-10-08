// ---------- Mongoose Connect
    var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    teamName: String,
    business: String,
    subBusiness: String,
    site: String,
    scrumMaster: {
        first: String,
        last: String,
        SSO: Number
    },
    productOwner:  {
        first: String,
        last: String,
        SSO: Number
    },
    interactionDesigner:  {
        first: String,
        last: String,
        SSO: Number
    },
    qualityEngineer:  {
        first: String,
        last: String,
        SSO: Number
    },
    architect:  {
        first: String,
        last: String,
        SSO: Number
    },
    teamMembers: [ 
        {
            first: String,
            last: String,
            SSO: Number
        },
        {
            first: String,
            last: String,
            SSO: Number
        },
        {
            first: String,
            last: String,
            SSO: Number
        }
    ],
    disbanded: Boolean,
    surveys: [SurveySchema]
})
var SurveySchema = new mongoose.Schema({
    quarter: String,
    currentProduct: String,
    currentProject: String,
      team: [Number],
      environment: [Number],
      informationRadiators: [Number],
      process: [Number],
      definitionOfReady: [Number],
      definitionOfDone: [Number],
      qualityMetrics: [Number],
      continuousIntegration: [Number],
      buildTime: Number,
      hardeningSprints: Number,
      subjective: [Number],
      improvementGoal: String,
      issues: String
});

var Storage = new mongoose.Schema({
    business: [String],
    subBusiness: [String],
    site: [String],
    Options: [String],
    team: [String],
    environment: [String],
    informationRadiators: [String],
    process: [String],
    definitionOfReady: [String],
    definitionOfDone: [String],
    qualityMetrics: [String],
    continuousIntegration: [String],
    subjective: [String]
})

    module.exports = mongoose.model('teams', TeamSchema);


