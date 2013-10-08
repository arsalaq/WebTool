// ---------- Include Schemas
	var Team = require('./models/schemas.js');

// ---------- IMPORT SAMPLE DATA
	exports.importSampleTeam = function(req, res){
		var teams = 
		[
			{
			    'teamName': 'Pikachu',
			    'business': 'CBS',
			    'subBusiness': 'Imaging',
			    'site': 'Seattle',
			    'scrumMaster': {
			        'name': 'David Robertson',
			        'SSO': '212626350'
			    },
			    'productOwner':  {
			        'name': 'Maria Buttitto',
			        'SSO': '212626351'
			    },
			    'interactionDesigner':  {
			        'name': 'Alex Bojanic',
			        'SSO': '212626352'
			    },
			    'qualityEngineer':  {
			        'name': 'Robin Landeck',
			        'SSO': '212626353'
			    },
			    'architect':  {
			        'name': 'Arsala Ahsan',
			        'SSO': '212626354'
			    },
			    'teamMembers': [ 
			        {
			            'name': 'Ash Ketchum',
			            'SSO': '212626355'
			        },
			        {
			            'name': 'Barry Benjamin ',
			            'SSO': '212626356'
			        }, 
			        {
			            'name': 'Jimmy Carter',
			            'SSO': '212626357'
			        }
			    ],
			    'disbanded': 'false'
			},
			{
			    'teamName': 'Snow Leopard',
			    'business': 'SS',
			    'subBusiness': 'Radiology',
			    'site': 'Barrington',
			    'scrumMaster': {
			        'name': 'Kirthi Banothu',
			        'SSO': '212326340'
			    },
			    'productOwner':  {
			        'name': 'Alex Rogers',
			        'SSO': '212326341'
			    },
			    'interactionDesigner':  {
			        'name': 'Kevin Smith',
			        'SSO': '212326342'
			    },
			    'qualityEngineer':  {
			        'name': 'Ben Franklin',
			        'SSO': '212326343'
			    },
			    'architect':  {
			        'name': 'Barack Obama',
			        'SSO': '212326344'
			    },
			    'teamMembers': [ 
			        {
			            'name': 'Grant Barry',
			            'SSO': '212326345'
			        },
			        {
			            'name': 'Webster Yom',
			            'SSO': '212326346'
			        },
			        {
			            'name': 'Vismay Shah',
			            'SSO': '212326347'
			        }
			    ],
			    'disbanded': 'true'
			},
			{
			    'teamName': 'Plantronics',
			    'business': 'CBS',
			    'subBusiness': 'Cardio',
			    'site': 'Seattle',
			    'scrumMaster': {
			        'name': 'Alejandro Santiago',
			        'SSO': '212041288'
			    },
			    'productOwner':  {
			        'name': 'Travis Frosch',
			        'SSO': '212042327'
			    },
			    'interactionDesigner':  {
			        'name': 'Joyce Thomas',
			        'SSO': '212039677'
			    },
			    'qualityEngineer':  {
			        'name': 'Hilda Garcia',
			        'SSO': '501705527'
			    },
			    'architect':  {
			        'name': 'Michael Purdue',
			        'SSO': '212039903'
			    },
			    'teamMembers': [ 
			        {
			            'name': '"Ajay Kumar',
			            'SSO': '212040654'
			        },
			        {
			            'name': 'David R Woods',
			            'SSO': '212039062'
			        }, 
			        {
			            'name': 'Marc Dukette',
			            'SSO': '212039248'
			        }
			    ],
			    'disbanded': 'false'
			},
			{
			    'teamName': 'ViewSonic',
			    'business': 'CBS',
			    'subBusiness': 'Sensory',
			    'site': 'Seattle',
			    'scrumMaster': {
			        'name': 'Leslie Ambrose',
			        'SSO': '212039772'
			    },
			    'productOwner':  {
			        'name': 'Carrie Dyball',
			        'SSO': '212039881'
			    },
			    'interactionDesigner':  {
			        'name': 'No Interaction Designer',
			        'SSO': '000000000'
			    },
			    'qualityEngineer':  {
			        'name': 'No Quality Engineer',
			        'SSO': '000000000'
			    },
			    'architect':  {
			        'name': 'No Architect',
			        'SSO': '000000000'
			    },
			    'teamMembers': [ 
			        {
			            'name': 'Bing Wu',
			            'SSO': '212040491'
			        },
			        {
			            'name': 'Carrie Dyball',
			            'SSO': '212039881'
			        },
			        {
			            'name': 'Chris Allen',
			            'SSO': '212039726'
			        }
			    ],
			    'disbanded': 'false'
			},
			{
			    'teamName': 'Adhavya',
			    'business': 'CBS',
			    'subBusiness': 'Metrics',
			    'site': 'Bangalore',
			    'scrumMaster': {
			        'name': 'Hilari Scott',
			        'SSO': '212031346'
			    },
			    'productOwner':  {
			        'name': 'Geoffrey Lay',
			        'SSO': '212043292'
			    },
			    'interactionDesigner':  {
			        'name': 'No Interaction Designer',
			        'SSO': '000000000'
			    },
			    'qualityEngineer':  {
			        'name': 'No Quality Engineer',
			        'SSO': '000000000'
			    },
			    'architect':  {
			        'name': 'No Architect',
			        'SSO': '000000000'
			    },
			    'teamMembers': [ 
			        {
			            'name': 'Anurag Chaturvedi',
			            'SSO': '212306756'
			        }
			    ],
			    'disbanded': 'false'
			}
		]
		for(var i = 0; i < teams.length; i++){
			console.log(teams[i].teamName + " " + teams[i].teamMembers[0].name + " ")
			new Team({
				teamName: teams[i].teamName,
			    business: teams[i].business,
			    subBusiness: teams[i].subBusiness,
			    site: teams[i].site,
			    scrumMaster: {
			        name: teams[i].scrumMaster.name,
			        SSO: teams[i].scrumMaster.SSO
			    },
			    productOwner:  {
			        name: teams[i].productOwner.name,
			        SSO: teams[i].productOwner.SSO
			    },
			    interactionDesigner:  {
			        name: teams[i].interactionDesigner.name,
			        SSO: teams[i].interactionDesigner.SSO
			    },
			    qualityEngineer:  {
			        name: teams[i].qualityEngineer.name,
			        SSO: teams[i].qualityEngineer.SSO
			    },
			    architect:  {
			        name: teams[i].architect.name,
			        SSO: teams[i].architect.SSO
			    },
			    teamMembers: [ 
			        {
			            name: teams[i].teamMembers[0].name,
			            SSO: teams[i].teamMembers[0].SSO
			        }
			    ],
			    disbanded: teams[i].disbanded
			}).save(function(err, docs){
				if(err) res.json(err);
			})		
		}
			res.json(teams);

	} 