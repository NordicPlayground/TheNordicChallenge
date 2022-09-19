import { getWeek } from 'date-fns'

describe('getWeek()', () => {
	it('should return a week for a timestamp', () => {
		expect(
			getWeek(new Date(1663592441 * 1000), {
				weekStartsOn: 1,
				firstWeekContainsDate: 1,
			}),
		).toEqual(39)
	})
})
