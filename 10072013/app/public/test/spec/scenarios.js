'use strict';

describe('Agile Scorecard App', function() {
 

  describe('Agile Teams View', function() {
 
    beforeEach(function() {
      browser().navigateTo('/surveys');
    });
     
    it('should search in Team Name field when filtering with designated team name', function() {
      input('search.teamName').enter('Adhavya');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual(['Adhavya']);
      // input('search.teamName').enter('Plantronics');
      // expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
      //   toEqual(['Plantronics']);
    });

    it('should show only the teams that have been disbanded when disbanded option is selected', function(){
      select('search.disbanded').option('true');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual(['PiXars']);
    })

    it('should show only results that are in the CBS business when CBS option is selected', function(){
      select('search.business').option('CBS');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual(["Adhavya","PiXars"]);
    })

    it('should show only results that are in the Imaging sub-business when Imaging option is selected', function(){
      select('search.subBusiness').option('Metrics');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual(['Adhavya']);
    })

    it('should show only results that are in Seattle location when Seattle option is selected', function(){
      select('search.site').option('Barrington');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual(["Adhavya","PiXars","TestTeam"]);
    })

    it('should be able to search through all fields given specific input', function(){
      input('search.$').enter('2120432');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual(['Adhavya']);
      input('search.$').enter('Barrington');
      expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
        toEqual([]);
      // input('search.$').enter('No Interaction Designer');
      // expect(repeater('#searchObjResults tr', 'team in teams').column('team.teamName')).
      //   toEqual(['Adhavya', 'ViewSonic']);
    })
  });


  describe('Survey Add View (+ Modify Teams)', function() {
 
    beforeEach(function() {
      browser().navigateTo('/surveys/add');
    });

    it('should start with a blank value', function(){
      expect(element('#teamName').val()).toEqual("")
      expect(element('#existingTeamName').val()).toEqual("?")
    })

    it('should change values of form to TestTeam', function(){
      select('selection').option('TestTeam');
      expect(element('#teamName').val()).toEqual("TestTeam")
    })

    it('should have all subsequent values to echo that of TestTeam', function(){
      select('selection').option('TestTeam');
      expect(element('#business').val()).toEqual("SS");
      expect(element('#subBusiness').val()).toEqual("Cardio");
      expect(element('#site').val()).toEqual("San Ramon");
      expect(element('#scrumMasterFirst').val()).toEqual("Scrum");
      expect(element('#scrumMasterLast').val()).toEqual("Master");
      expect(element('#scrumMasterSSO').val()).toEqual("777777777");
    })

    it('should check the remove and add option for Team Members', function(){
      select('selection').option('TestTeam');
      element('#teamMembersAdd a:contains("[ Add another Team Member ]")').click();
      expect(element('#teamMemberFirst').val()).toEqual('Team')
      element('#teamMembers a:contains("[ Remove ]")').click();
    })

  });

});