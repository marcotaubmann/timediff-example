var app = angular.module('age-format', []);

app.filter('age', function () {
  return function (date, showYears, showMonths, showWeeks, showDays) {
    var units =  timediff( date, new Date(), {
      units: {
        years: showYears,
        months: showMonths,
        weeks: showWeeks,
        days: showDays
      },
      returnZeros: true
    });
    var strings = [];
    if (showYears) strings.push(units.years + 'y');
    if (showMonths) strings.push(units.months + 'm');
    if (showWeeks) strings.push(units.weeks + 'w');
    if (showDays) strings.push(units.days + 'd');
    return strings.join(' ');
  };
});

app.controller('AgeController', ['$scope', function ($scope) {
  $scope.birthday = new Date();
  $scope.showYears = true;
  $scope.showMonths = true;
  $scope.showWeeks = true;
  $scope.showDays = true;

  function forceTrue () {
    return  ($scope.showYears + $scope.showMonths + $scope.showWeeks + $scope.showDays) <= 1;
  }

  $scope.toggle = function toggle (field) {
    switch (field) {
      case 'years':
        $scope.showYears = !$scope.showYears || forceTrue();
        break;
      case 'months':
        $scope.showMonths = !$scope.showMonths || forceTrue();
        break;
      case 'weeks':
        $scope.showWeeks = !$scope.showWeeks || forceTrue();
        break;
      case 'days':
        $scope.showDays = !$scope.showDays || forceTrue();
        break;
    }
  };


}]);
