var app = angular.module('cityzen', ['ionic'])

app.controller('ExampleController', ['$scope', function($scope) {
    $scope.helloWorld = function(spice) {
        $scope.greeting = "Hello World";
    };
}]);