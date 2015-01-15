describe('age-format module', function () {
  beforeEach(module('age-format'));

  describe('age filter', function () {

    beforeEach(function () {
      jasmine.clock().install();
    });

    afterEach(function () {
      jasmine.clock().uninstall();
    });

    it('should convert "now" to "0d"', inject(function (ageFilter) {
      expect(ageFilter(new Date (), false, false, false, false)).toBe('0d');
    }));

    it('should convert the same day to "0d"', inject(function (ageFilter) {
      jasmine.clock().mockDate(new Date(2015, 1, 1));
      expect(ageFilter(new Date (2015, 1, 01), false, false, false, false)).toBe('0d');
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

});
