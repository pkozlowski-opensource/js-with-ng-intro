//slide:start:ctrl;
angular.module('users', [])

  .controller('UsersCtrl', function ($scope, UserStorage) {

    // ex:start
    $scope.cleanUser = {};
    $scope.users = UserStorage.getAll();

    $scope.save = function () {
      UserStorage.save($scope.user);
      $scope.cleanUser = {};
      $scope.clear();
      $scope.users = UserStorage.getAll();
    };

    //slide:end

    $scope.remove = function (userId) {
      UserStorage.remove(userId);
      $scope.users = UserStorage.getAll();
    };

    $scope.edit = function (user) {
      $scope.cleanUser = angular.copy(user);
      $scope.clear();
    };
    //ex:end

    $scope.hasEdits = function () {
      return !angular.equals($scope.user, $scope.cleanUser);
    };

    $scope.clear = function () {
      $scope.user = angular.copy($scope.cleanUser);
    };

    $scope.clear();
  });
