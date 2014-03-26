var UsersCtrl = function ($scope) {

  var userStorage = new UserStorage();

  $scope.cleanUser = {};
  $scope.users = userStorage.getAll();

  $scope.save = function () {
  };

  $scope.remove = function (userId) {
  };

  $scope.edit = function (user) {
  };

  $scope.hasEdits = function () {
  };

  $scope.clear = function () {
  };

  $scope.clear();
};