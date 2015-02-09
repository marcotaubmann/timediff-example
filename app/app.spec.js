describe('timediff-example module', function () {
  beforeEach(module('timediff-example'));

  describe('toArray filter', function () {
    it('should convert an object to an array of objects', inject(function (toArrayFilter) {
      var obj = {name: 'Tester', id: 21};
      var arr = toArrayFilter(obj);
      expect(arr).toEqual([
        {key: 'name', value: 'Tester'},
        {key: 'id', value: 21}
      ]);
    }));
  });

  describe('uppercase filter', function () {

    it('should make the first letter of each word in a string uppercase', inject(function (uppercaseFilter) {
      var result = uppercaseFilter('hello my friend');
      expect(result).toBe('Hello My Friend');
    }));

  });

  describe('ExampleController', function () {
    var $scope;
    var $interval;
    var controller;

    function hasTrueKey (object) {
      for (var key in object) {
        if (object[key]) {
          return true;
        }
      }
      return false;
    };

    function hasOnlyTrueKeys (object) {
      for (var key in object) {
        if (!object[key]) {
          return false;
        }
      }
      return true;
    }

    beforeEach(inject(function (_$rootScope_, _$controller_, _$interval_) {
      $scope = _$rootScope_.$new();
      $interval = _$interval_;
      controller = _$controller_('ExampleController', {
        $scope: $scope,
        $interval: $interval
      });
      spyOn($scope, 'updateDiff');
    }));

    it('should initialy have all possible units active', function () {
      expect(hasOnlyTrueKeys($scope.diffOpts.units)).toBe(true);
    });

    it('should have at least one of the units active', function () {
      $scope.toggle('years');
      $scope.toggle('months');
      $scope.toggle('weeks');
      $scope.toggle('days');
      $scope.toggle('hours');
      $scope.toggle('minutes');
      $scope.toggle('seconds');
      $scope.toggle('milliseconds');
      expect(hasTrueKey($scope.diffOpts.units)).toBe(true);
      $scope.toggle('weeks');
      $scope.toggle('milliseconds');
      $scope.toggle('weeks');
      expect(hasTrueKey($scope.diffOpts.units)).toBe(true);
      $scope.toggle('months');
      $scope.toggle('weeks');
      $scope.toggle('months');
      expect(hasTrueKey($scope.diffOpts.units)).toBe(true);
      $scope.toggle('years');
      $scope.toggle('months');
      $scope.toggle('years');
      expect(hasTrueKey($scope.diffOpts.units)).toBe(true);
    });

  });
});
