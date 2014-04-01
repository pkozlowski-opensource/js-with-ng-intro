angular.module('userstorageHttpResource', ['mongolab'])
  .factory('User', function ($mongolabResource) {
    return $mongolabResource('users');
  });