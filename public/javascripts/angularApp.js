angular.module('UpLift', ['ui.router'])

.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home/{id}',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('userPick', {
                url: '/userPick',
                templateUrl: '/userPick.html',
                controller: 'UserCtrl'
            });

        $urlRouterProvider.otherwise('userPick');

    }
])

.factory('workouts', [function() {
    var o = {
        workouts: [
            {
                user: "ck",
                workouts: [
                    {title: "workout 1", lifts: ['hamster', 'gerbil']},
                    {title: "workout 2", lifts: ['cat', 'samoyed']}
                ]},
            {
                user: "jacqui",
                workouts: [
                    {title: "12345", lifts: ['tiramisu', 'chicken pot pie']},
                    {title: "54321", lifts: ['blackbean soup', 'chili con carne']}
                ]
            }

            ]
    };
    return o;
}])

.controller('UserCtrl', [
    '$scope',
    'workouts',
    function($scope, workouts) {
        $scope.users = workouts.workouts;
    }
])

.controller('MainCtrl', [
    '$scope',
    '$stateParams',
    'workouts',
    function($scope, $stateParams, workouts) {
        console.log($stateParams);
        $scope.workouts = workouts.workouts[$stateParams.id].workouts;
        $scope.name = workouts.workouts[$stateParams.id].user;
        $scope.lifts = [{id: 'lift1'}];
        $scope.addWorkout = function() {
            $scope.workouts.push({title: $scope.workoutDate, lifts: $scope.lifts});
            console.log("ADDWORKOUT CALLED");
        };
        $scope.addLift = function() {
            var newLiftNo = $scope.lifts.length + 1;
            $scope.lifts.push({id: 'lift' + newLiftNo});
        };
    }
]);
