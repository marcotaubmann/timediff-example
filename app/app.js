var app = angular.module('timediff-example', []);

app.directive('myTimediff', function () {
  return {
    templateUrl: 'my-timediff.html',
    restrict: 'E',
    scope: {
      timediff: '=',
      options: "=",
      units: '='
    }
  };
});

app.filter('toArray', function () {
  return function (input) {
    var array = [];
    for (var key in input) {
      array.push({key: key, value: input[key]});
    }
    return array;
  };
});

app.filter('uppercase', function () {
  return function (input) {
    if (!input) {
      return '';
    }
    var output = input
      .split(' ')
      .map(function (word) {return word.substr(0, 1).toUpperCase() + word.substr(1);})
      .join(' ');

    return output;
  };
});

app.controller('ExampleController', ['$scope', '$interval', 'toArrayFilter', function ($scope, $interval, toArrayFilter) {
  var intervalDelay = 200;
  var intervalPromise = null;

  $scope.start = moment().format('YYYY-MM-DD');
  $scope.end = 'now';
  $scope.timediff = 'unknown';

  $scope.diffOpts = {
    units: {
      years: true,
      months: true,
      weeks: true,
      days: true,
      hours: true,
      minutes: true,
      seconds: true,
      milliseconds: true
    },
    returnZeros: true,
    callback: null
  };

  $scope.units = [];
  for (var unit in $scope.diffOpts.units) {
    $scope.units.push({key: unit, label: unit.charAt(0).toUpperCase() + unit.slice(1)});
  }

  $scope.updateDiff = function updateDiff () {
    try {
      $scope.timediff = toArrayFilter(timediff($scope.start, $scope.end, $scope.diffOpts));
    } catch (e) {
      $scope.timediff = 'undefined';
    }
  }

  $scope.toggle = function toggle (toggleKey) {
    var sum = 0;
    for (var unitKey in $scope.diffOpts.units) {
      sum = sum + $scope.diffOpts.units[unitKey];
    }
    var forceTrue = sum <=1;
    $scope.diffOpts.units[toggleKey] = !$scope.diffOpts.units[toggleKey] || forceTrue;
    $scope.updateDiff();
  };

  function inputsUpdate () {
    $scope.updateDiff();
    if ($scope.start === 'now' || $scope.end === 'now') {
      // set interval if not yet set
      if (intervalPromise === null) {
        intervalPromise = $interval($scope.updateDiff, intervalDelay);
        return;
      }
      // keep the interval running
    } else {
      //there is no need to update the diff, remove the interval if set
      if (intervalPromise !== null) {
        $interval.cancel(intervalPromise);
        intervalPromise = null;
      }
    }
  }

  $scope.$watchGroup(['start', 'end'], inputsUpdate);

  inputsUpdate();

}]);
