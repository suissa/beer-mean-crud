window.app = angular.module('Beers', []);


window.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', { templateUrl: '/', controller: IndexController }).
        otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}]);


function IndexController($scope){

};