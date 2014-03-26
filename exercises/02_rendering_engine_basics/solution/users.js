var UsersCtrl = function ($scope) {

  var userStorage = new UserStorage();

  $scope.cleanUser = {};
  $scope.users = userStorage.getAll();

  $scope.save = function () {
    // ex:start
    userStorage.save($scope.user);
    $scope.cleanUser = {};
    $scope.clear();
    $scope.users = userStorage.getAll();
    // ex:end
  };

  $scope.remove = function (userId) {
    // ex:start
    userStorage.remove(userId);
    $scope.users = userStorage.getAll();
    // ex:end
  };

  $scope.edit = function (user) {
    // ex:start
    $scope.cleanUser = angular.copy(user);
    $scope.clear();
    // ex:end
  };

  $scope.hasEdits = function () {
    // ex:start
    return !angular.equals($scope.user, $scope.cleanUser);
    // ex:end
  };

  $scope.clear = function () {
    // ex:start
    $scope.user = angular.copy($scope.cleanUser);
    // ex:end
  };

  $scope.clear();
};