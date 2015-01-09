var app = angular.module('age-format', []);

app.filter('age', function () {
  return function (date, showYears, showMonths, showWeeks, showDays) {
    date = moment(date);
    var now = moment();
    var age = [];

    if (showYears) {
      var years = now.diff(date, 'years');
      if (years) age.push(years + 'y');
      date.add(years, 'years');
    }

    if (showMonths) {
      var months = now.diff(date, 'months');
      if (months) age.push(months + 'm');
      date.add(months, 'months');
    }

    if (showWeeks) {
      var weeks = now.diff(date, 'weeks');
      if (weeks) age.push(weeks + 'w');
      date.add(weeks, 'weeks');
    }

    if (showDays) {
      var days = now.diff(date, 'days');
      if (days) age.push(days + 'd');
      date.add(days, 'days');
    }

    if (age.length === 0) {
      if (showDays)
        age.push('0d');
      else if (showWeeks)
        age.push('0w');
      else if (showMonths)
        age.push('0m');
      else if (showYears)
        age.push('0y');
      else
        age.push('0d');
    }

    return age.join(' ');
  };
});

app.controller('AgeController', ['$scope', function ($scope) {
  $scope.birthday = new Date();
  $scope.showYears = true;
  $scope.showMonths = true;
  $scope.showWeeks = true;
  $scope.showDays = true;


}]);
