'use strict';


describe('Team List controllers', function() {
 
  describe('TeamListCtrl', function(){
    var scope, ctrl, $httpBackend;
 
    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/JSON/allTeams').
          respond({data: [
            {
              "teamName": "TestTeam",
              "site": "Barrington",
              "business": "CBS",
              "subBusiness": "Cardio",
              "surveys": [
                {
                  "quarter": "Q1 2013"
                }
              ]
            },
            {
              "teamName": "Helloo",
              "site": "Seattle",
              "business": "SS",
              "subBusiness": "Radiology",
              "surveys": [
                {
                  "quarter": "Q1 2013"
                }
              ]
            }
          ]});

      scope = $rootScope.$new();
      ctrl = $controller(TeamListCtrl, {$scope: scope});
    }));

  it('should create "teams" model with 2 teams fetched from xhr', function() {
    expect(scope.teams).toBeUndefined();
    $httpBackend.flush();
    expect(scope.teams.length).toEqual(2);
  });

  it('should create "business, subbusiness, and sites" array with a list of each unique value', function(){
    expect(scope.teams).toBeUndefined();
    $httpBackend.flush();

    expect(scope.sites).toEqual(['Barrington', 'Seattle']);
    expect(scope.business).toEqual(['CBS', 'SS']);
    expect(scope.subBusiness).toEqual(['Cardio', 'Radiology']);
  })

  it('should set the default value of orderProp model', function() {
    expect(scope.orderProp).toBe('teamName');
  });
  
  });
});

describe('Individual Team controllers', function() {
 
  describe('IndividualTeam', function(){
    var scope, ctrl, $httpBackend;
 
    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;

      $httpBackend.expectGET('/JSON/undefined').
          respond({data: [
            {
              "teamName": "TestTeam",
              "site": "Barrington",
              "business": "CBS",
              "subBusiness": "Cardio",
              "surveys": [
                {
                  "quarter": "Q1 2013"
                },
                {
                  "quarter": "Q2 2013"
                }
              ]
            },
            {
              "teamName": "Helloo",
              "site": "Seattle",
              "business": "SS",
              "subBusiness": "Radiology",
              "surveys": [
                {
                  "quarter": "Q1 2013"
                },
                {
                  "quarter": "Q2 2013"
                }
              ]
            }
          ]});

      scope = $rootScope.$new();
      ctrl = $controller(IndividualTeam, {$scope: scope});
    }));

  it('should create "teams" model with 2 teams fetched from xhr', function() {
    expect(scope.team).toBeUndefined();
    $httpBackend.flush();
    expect(scope.team.length).toEqual(2);
  });

  it('should check to see if question details are right', function() {
    expect(scope.surveys).toBeUndefined();
    $httpBackend.flush();
    expect(scope.surveys).toEqual(scope.team.surveys);
    expect(scope.subjective).toEqual([
                              "Happy", 
                              "Focused", 
                              "Work/life Balance", 
                              "Scope Confidence", 
                              "Quality Confidence", 
                              "Tech Debt under Control", 
                              "Backlog readiness", 
                              "No Knowledge Silos", 
                              "User Feedback", 
                              "Improving"
                              ])
    expect(scope.number).toEqual(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"])
  });
  
  });
});