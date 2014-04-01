angular.module('userstorageHttpResource', ['mongolab'])
  .factory('User', function ($mongolabResource) {
    //ex:start

    return $mongolabResource('users');
    //ex:end
  });