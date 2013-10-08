'use strict';

/* Controllers */
function TeamListCtrl($scope, $http) {
  var pathArray = window.location.pathname.split( '/' );

  $http.get('/JSON/allTeams').success(function(data) {
    $scope.teams = data.data;
    
    if(pathArray[2] == 'add'){
      $scope.teams[$scope.teams.length] = {
                'teamName': 'Create new team', 
                'teamMembers': [{}]
              }
    } 
    $scope.business = [];
    $scope.subBusiness = [];
    $scope.sites = [];



    $scope.i;
    for($scope.i=0; $scope.i<$scope.teams.length; $scope.i++){
      if($.inArray($scope.teams[$scope.i].business, $scope.business) == -1){
        $scope.business[$scope.business.length] = $scope.teams[$scope.i].business;
      }
    }

    for($scope.i=0; $scope.i<$scope.teams.length; $scope.i++){
      if($.inArray($scope.teams[$scope.i].subBusiness, $scope.subBusiness) == -1){
        $scope.subBusiness[$scope.subBusiness.length] = $scope.teams[$scope.i].subBusiness;
      }
    }

    for($scope.i=0; $scope.i<$scope.teams.length; $scope.i++){
      if($.inArray($scope.teams[$scope.i].site, $scope.sites) == -1){
        $scope.sites[$scope.sites.length] = $scope.teams[$scope.i].site;
      }
    }

  });
 
  $scope.orderProp = 'teamName';
}
 
TeamListCtrl.$inject = ['$scope', '$http'];

function IndividualTeam($scope, $http){
  var pathArray = window.location.pathname.split( '/' );

  $http.get('/JSON/'+pathArray[3]).success(function(data) {
    $scope.team = data.data
    $scope.surveys = $scope.team.surveys;
    $scope.subjective = [
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
                              ];
    $scope.CI = [
                              "Build triggered", 
                              "Install generated", 
                              "Unit tests run", 
                              "Smoke test run", 
                              "Acceptance/regression tests run", 
                              "Static code analysis run", 
                              "Results recorded", 
                              "Team notified of breaks through email", 
                              "Team notified of breaks through dashboard or ambient tech", 
                              "Gated check-in (if any step fails, the change is rejected)"
                              ]
    $scope.qualityMetrics = [
                              "Number of hours of user engagement", 
                              "Number of open bugs (internal or external discovery, any severity)", 
                              "Number of static code analysis warnings", 
                              "Number of the top 10 performance/scalability requirements passing", 
                              "Number of passing builds (CI on check-in, or scheduled)", 
                              "Number of automated tests (xUnit and acceptance/regression)", 
                              "Automated unit test percent code coverage", 
                              "Percent of regression tests automated", 
                              "Number of hardening sprints expected to be required for final testing, fixing, documentation, and other release activities", 
                              "Story point burn-up sampled daily (to show flow vs. scrum-fall)"
                              ];
    $scope.definitionOfDone =  [
                              "Verification dry run", 
                              "Validation dry run, including formative usability testing", 
                              "Automated unit tests", 
                              "TDD", 
                              "Automated acceptance/regression tests", 
                              "BDD", 
                              "All bugs associated with the story closed", 
                              "User documentation complete", 
                              "QMS design documents content updated", 
                              "User/customer feedback"
                              ];
    $scope.definitionOfReady =  [
                              "Story name follows conventions", 
                              "Spike considered", 
                              "Independent (of other stories and teams)", 
                              "Negotiable", 
                              "Valuable (to end user preferably - PO understands and accepts value)", 
                              "Estimated (relative story points assigned by whole team)", 
                              "Small (enable continuous flow of stories closing 6-10 per sprint)", 
                              "Testable (acceptance criteria documented and failure modes considered)", 
                              "Prioritized", 
                              "UX complete if applicable (wireframes/mock-ups/screens)"
                              ];
    $scope.process=  [
                              "Backlog grooming meeting every sprint", 
                              "Sprint planning meeting fast and effective", 
                              "Daily stand-up meetings fast and effective", 
                              "Demo/review meeting effective and focused on showing product", 
                              "Retrospective meeting varied and effective - follow through on improvements", 
                              "Two week sprints", 
                              "Quarterly release trains", 
                              "Scrum of scrums effective managing dependencies (or only one team)", 
                              "Definition of Ready (before sprint planning) checklist posted and used", 
                              "Definition of Done checklist posted and used"
                              ];
    $scope.informationRadiators=  [
                              "Vision", 
                              "Product data sheet", 
                              "Roadmap", 
                              "Revenue trend", 
                              "Personas", 
                              "User workflow/context scenario list", 
                              "Architecture block diagram", 
                              "Architecture sequence diagram", 
                              "Agile scorecard", 
                              "Metric trends"
                              ];        
    $scope.environment=  [
                              "Same time zone", 
                              "Same office building", 
                              "Same area of office", 
                              "Shared team space", 
                              "Physical scrum board", 
                              "Team Wiki", 
                              "Meeting area easily available", 
                              "Pairing stations easily available", 
                              "Whiteboards easily available", 
                              "Projector easily available"
                              ];  
    $scope.teamCat=  [
                              "Team size ten or fewer", 
                              "Scrum master supports two or fewer teams", 
                              "Scrum master dedicated role (full time as a scrum master)", 
                              "Product owner supports three or fewer teams", 
                              "Product owner local and easily available for meetings and conversations", 
                              "Quality engineer local and easily available for meetings and conversations", 
                              "Interaction designer (UX) local and easily available for meetings and conversations", 
                              "Architect local and easily available for meetings and conversations", 
                              "Developers only on one team", 
                              "Testers only on one team"
                              ]; 
    $scope.number = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    $scope.color = 'blue';
  });
 
}

IndividualTeam.$inject = ['$scope', '$http'];
