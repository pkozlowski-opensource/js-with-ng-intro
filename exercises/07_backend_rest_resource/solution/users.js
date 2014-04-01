angular.module('usersNgResource', [])

  .controller('UsersCtrl', function ($scope, User) {

    $scope.cleanUser = new User({});

    //slide:start:class;
    function refreshUsersList() {
      $scope.users = User.query({});
    }
    //slide:end:class;

    $scope.save = function () {
      //ex:start
      var action = $scope.user.getId() ? '$update' : '$save';
      $scope.user[action](function(){
        $scope.cleanUser = new User({});
        $scope.clear();
        refreshUsersList();
      });
      //ex:end
    };

    //slide:start:instance;
    $scope.remove = function (user) {
      //ex:start
      user.$remove(function() {
        refreshUsersList();
      });
      //ex:end
    };
    //slide:end:instance;

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
