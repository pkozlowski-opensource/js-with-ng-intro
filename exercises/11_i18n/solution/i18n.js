angular.module('i18n', [])

  .constant('TRANSLATIONS', {
    "en-us": {
      "header_mange_users": "Manage users"
    },
    "pl-pl": {
      "header_mange_users": "Zarządzaj użytkownikami"
    }
  })

  .controller('I18nCtrl', function ($scope, $locale) {

    $scope.locale = $locale;

    $scope.now = new Date();
    $scope.number = 12453.538;
    $scope.amount = 100.456;

  })

  .filter('i18n', function ($locale, TRANSLATIONS) {
    return function (input) {
      if (!angular.isString(input)) {
        return input;
      }
      return TRANSLATIONS[$locale.id][input] || '?' + input + '?';
    };
  });