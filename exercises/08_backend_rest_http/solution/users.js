angular.module('usersHttpResource', ['mongolab'])

  .controller('UsersCtrl', function ($scope, User) {

    $scope.cleanUser = new User({});

    //slide:start:getAll;
    function refreshUsersList() {
      //ex:start
      User.getAll().then(function (users) {
        $scope.users = users;
      });
      //ex:end
    }
    //slide:end:getAll;

    //slide:start:save;
    $scope.save = function () {
      //ex:start
      $scope.user.$save().then(function () {
        $scope.cleanUser = new User({});
        $scope.clear();
        refreshUsersList();
      });
      //ex:end
    };
    //slide:end:save;

    $scope.remove = function (user) {
      //ex:start
      user.$remove().then(function() {
        refreshUsersList();
      });
      //ex:end
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
