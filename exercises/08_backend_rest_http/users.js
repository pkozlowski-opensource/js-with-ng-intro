angular.module('usersHttpResource', ['mongolab'])

  .controller('UsersCtrl', function ($scope, User) {

    $scope.cleanUser = new User({});

    function refreshUsersList() {
    }

    $scope.save = function () {
    };

    $scope.remove = function (user) {
    };

    $scope.edit = function (user) {
      $scope.cleanUser = angular.copy(user);
      $scope.clear();
    };

    $scope.hasEdits = function () {
      return !angular.equals($scope.user, $scope.cleanUser);
    };

    $scope.clear = function () {
      $scope.user = angular.copy($scope.cleanUser);
    };

    $scope.clear();
    refreshUsersList();

  });
