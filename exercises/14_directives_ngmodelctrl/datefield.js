angular.module('datefield', [])

  .directive('momentDatefield', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        var dateFormat = attrs.momentDatefield || 'YYYY/MM/DD';

        ngModelCtrl.$parsers.push(function (viewValue) {
          //convert string input into moment data model
          var parsedMoment = moment(viewValue, dateFormat);

        });

        ngModelCtrl.$formatters.push(function (modelValue) {

          var isModelADate = angular.isDate(modelValue);
        });
      }
    };
  });

