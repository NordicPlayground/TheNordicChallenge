import { getWeek } from "date-fns"

describe('getWee()', () => {
    it('should return a week for a timestamp', () => {
        expect(getWeek(new Date(1662333889 * 1000), {
            weekStartsOn: 1,
            firstWeekContainsDate: 4
          })).toEqual(36)
    })
})