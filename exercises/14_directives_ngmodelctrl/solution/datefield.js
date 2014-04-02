angular.module('datefield', [])

  .directive('momentDatefield', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {

        var dateFormat = attrs.momentDatefield || 'YYYY/MM/DD';

        ngModelCtrl.$parsers.push(function (viewValue) {
          //convert string input into moment data model
          var parsedMoment = moment(viewValue, dateFormat);

          //ex:start
          //toggle validity
          ngModelCtrl.$setValidity('datefield', parsedMoment.isValid());

          //return model value
          return parsedMoment.isValid() ? parsedMoment.toDate() : undefined;
          //ex:end
        });

        ngModelCtrl.$formatters.push(function (modelValue) {

          var isModelADate = angular.isDate(modelValue);
          //ex:start
          ngModelCtrl.$setValidity('datefield', isModelADate);

          return isModelADate ? moment(modelValue).format(dateFormat) : undefined;
          //ex:end
        });
      }
    };
  });

