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

    //ex:start
    return {
      restrict: 'E',
      scope: {
        selectedPage: '=',
        collectionSize: '=',
        itemsPerPage: '='
      },
      templateUrl: 'pagination.tpl.html',
      link: function (scope, iElement, iAttrs) {

        function updatePagesModel() {

          //re-calculate new length of pages
          var pageCount = Math.ceil(scope.collectionSize / (scope.itemsPerPage || 10));

          //fill-in model needed to render pages
          scope.pageNumbers.length = 0;
          for (var i = 1; i <= pageCount; i++) {
            scope.pageNumbers.push(i);
          }

          //make sure that the selected page is within available pages range
          scope.selectPage(scope.selectedPage);
        }

        scope.pageNumbers = [];

        scope.hasPrevious = function () {
          return scope.selectedPage > 1;
        };

        scope.hasNext = function () {
          return scope.selectedPage < scope.pageNumbers.length;
        };

        scope.selectPage = function (pageNumber) {
          scope.selectedPage = Math.max(Math.min(pageNumber, scope.pageNumbers.length), 1);
        };

        //re-render pages on collection / page size changes
        scope.$watch('collectionSize', updatePagesModel);
        scope.$watch('itemsPerPage', updatePagesModel);

        //make sure that page is within available pages range on model changes
        scope.$watch('selectedPage', scope.selectPage);
      }
    };
    //ex:end
  });