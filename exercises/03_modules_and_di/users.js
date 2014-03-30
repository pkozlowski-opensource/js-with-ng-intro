angular.module('users', [])

  .controller('UsersCtrl', function ($scope, UserStorage) {


    $scope.hasEdits = function () {
      return !angular.equals($scope.user, $scope.cleanUser);
    };

    $scope.clear = function () {
      $scope.user = angular.copy($scope.cleanUser);
    };

    $scope.clear();
  });
