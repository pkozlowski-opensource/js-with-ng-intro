angular.module('pagination', [])

  .filter('pagination', function () {
    return function (inputArray, selectedPage, pageSize) {
      // filtering code goes here
      if (!angular.isArray) {
        return inputArray;
      }
      pageSize = pageSize || 10;
      var start = selectedPage * pageSize;
      return inputArray.slice(start, start + pageSize);
    };
  })

  .directive('bsPagination', function () {

  });