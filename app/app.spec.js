describe('timediff-example module', function () {
  beforeEach(module('timediff-example'));

  describe('timediff filter', function () {

    it('should convert the same day to zero string', inject(function (timediffFilter) {
      var result = timediffFilter(new Date(), new Date(), {units: {years: true, months: true, weeks: true, days: true}});
      expect(result).toBe('0y 0m 0w 0d');
    }));

    it('should convert 20 days to "20d"', inject(function (timediffFilter) {
      var result = timediffFilter('2015-01-01', '2015-01-21', {units: {days: true}});
      expect(result).toBe('20d');
    }));

  });

  describe('ExampleController', function () {
    var $controller;

    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
    }));

    it('should initialy have all of years, months, weeks and days active', function () {
      var $scope = {};
      var controller = $controller('ExampleController', {$scope: $scope});
      expect( $scope.show.years && $scope.show.months && $scope.show.weeks && $scope.show.days).toBe(true);
    });

    it('should have at least one of years, months, weeks or days active', function () {
      var $scope = {};
      var controller = $controller('ExampleController', {$scope: $scope});
      $scope.toggle('years');
      $scope.toggle('months');
      $scope.toggle('weeks');
      $scope.toggle('days');
      expect( $scope.show.years || $scope.show.months || $scope.show.weeks || $scope.show.days).toBe(true);
      $scope.toggle('weeks');
      $scope.toggle('days');
      $scope.toggle('weeks');
      expect( $scope.show.years || $scope.show.months || $scope.show.weeks || $scope.show.days).toBe(true);
      $scope.toggle('months');
      $scope.toggle('weeks');
      $scope.toggle('months');
      expect( $scope.show.years || $scope.show.months || $scope.show.weeks || $scope.show.days).toBe(true);
      $scope.toggle('years');
      $scope.toggle('months');
      $scope.toggle('years');
      expect( $scope.show.years || $scope.show.months || $scope.show.weeks || $scope.show.days).toBe(true);
    });
  });
});
