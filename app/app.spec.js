describe('age-format module', function () {
  beforeEach(module('age-format'));

  describe('age filter', function () {

    beforeEach(function () {
      jasmine.clock().install();
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it('should convert "now" to empty string', inject(function (ageFilter) {
      expect(ageFilter(new Date (), false, false, false, false)).toBe('');
    }));

    it('should convert the same day to empty string', inject(function (ageFilter) {
      jasmine.clock().mockDate(new Date(2015, 1, 1));
      expect(ageFilter(new Date (2015, 1, 01), false, false, false, false)).toBe('');
    }));

    it('should convert 20 days to "20d"', inject(function (ageFilter) {
      jasmine.clock().mockDate(new Date(2015, 1, 21));
      expect(ageFilter(new Date (2015, 1, 1), false, false, false, true)).toBe('20d');
    }));

    it('should diff 2014-09-18 on 2015-01-10 to "16w 2d"', inject(function (ageFilter) {
      jasmine.clock().mockDate(new Date(2015, 1, 9));
      expect(ageFilter(new Date (2014, 9, 18), false, false, true, true)).toBe('16w 2d');
    }));

  });

  describe('age controller', function () {
    var $controller;

    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
    }));

    it('should initialy have all of years, months, weeks and days active', function () {
      var $scope = {};
      var controller = $controller('AgeController', {$scope: $scope});
      expect( $scope.showYears && $scope.showMonths && $scope.showWeeks && $scope.showDays).toBe(true);
    });

    it('should have at least one of years, months, weeks or days active', function () {
      var $scope = {};
      var controller = $controller('AgeController', {$scope: $scope});
      $scope.toggle('years');
      $scope.toggle('months');
      $scope.toggle('weeks');
      $scope.toggle('days');
      expect( $scope.showYears || $scope.showMonths || $scope.showWeeks || $scope.showDays).toBe(true);
      $scope.toggle('weeks');
      $scope.toggle('days');
      $scope.toggle('weeks');
      expect( $scope.showYears || $scope.showMonths || $scope.showWeeks || $scope.showDays).toBe(true);
      $scope.toggle('months');
      $scope.toggle('weeks');
      $scope.toggle('months');
      expect( $scope.showYears || $scope.showMonths || $scope.showWeeks || $scope.showDays).toBe(true);
      $scope.toggle('years');
      $scope.toggle('months');
      $scope.toggle('years');
      expect( $scope.showYears || $scope.showMonths || $scope.showWeeks || $scope.showDays).toBe(true);
    });
  });
});
