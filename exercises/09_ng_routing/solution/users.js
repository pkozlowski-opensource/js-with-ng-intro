angular.module('usersNgRoute', ['userstorageHttpResource'])

  .controller('UsersListCtrl', function ($scope, $location, User) {

    //ex:start
    function refreshUsersList() {
      User.getAll().then(function (users) {
        $scope.users = users;
      });
    }

    $scope.edit = function (user) {
      $location.path('/users/edit/' + user.getId());
    };

    $scope.remove = function (user) {
      user.$remove().then(function () {
        refreshUsersList();
      });
    };

    refreshUsersList();
    //ex:end
  })

  .controller('UserEditCtrl', function ($scope, $location, $routeParams, User) {

    //ex:start
    $scope.save = function () {
      $scope.user.$save().then(function () {
        $location.path('/users/list');
      });
    };

    $scope.hasEdits = function () {
      return !angular.equals($scope.user, $scope.cleanUser);
    };

    $scope.clear = function () {
      $scope.user = angular.copy($scope.cleanUser);
    };

    if ($routeParams.id) {
      User.getById($routeParams.id).then(function (user) {
        $scope.cleanUser = user;
        $scope.clear();
      });
    } else {
      $scope.cleanUser = new User({});
      $scope.clear();
    }
    //ex:end
  });
