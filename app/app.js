var app = angular.module('timediff-example', []);

app.filter('timediff', function () {
  return function (start, end, options) {
    var units =  timediff( start, end, options);
    var strings = [];
    if (options.units.years ) strings.push(units.years + 'y');
    if (options.units.months) strings.push(units.months + 'm');
    if (options.units.weeks ) strings.push(units.weeks + 'w');
    if (options.units.days  ) strings.push(units.days + 'd');
    return strings.join(' ');
  };
});

app.controller('ExampleController', ['$scope', function ($scope) {
  $scope.start = new Date();
  $scope.end = new Date();

  $scope.show = {
    years: true,
    months: true,
    weeks: true,
    days: true
  };

  $scope.timediffOptions = {
    units: $scope.show,
    returnZeros: true,
    callback: null
  };

  $scope.units =[
    {key: 'years' , label: 'Years'},
    {key: 'months', label: 'Months'},
    {key: 'weeks' , label: 'Weeks'},
    {key: 'days'  , label: 'Days'}
  ];

  function forceTrue () {
    var sum = 0;
    for ( var unitKey in $scope.show ) {
      sum = sum + $scope.show[unitKey];
    }
    return sum <= 1;
  }

  $scope.toggle = function toggle (unitKey) {
    $scope.show[unitKey] = !$scope.show[unitKey] || forceTrue();
    $scope.timediffOptions.units = $scope.show;
  };

}]);
