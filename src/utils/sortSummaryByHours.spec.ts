import type { TeamInformation } from 'app/pages/Strava.js'
import { sortSummaryByHours } from 'utils/sortSummaryByHours.js'

describe('sortSummary()', () => {
	it('should sort a summary of Strava Data', () => {
		const summary: TeamInformation = [
			{
				distance: 1029.1915000000004,
				minutesPerAthlete: 247.232,
				points: 19.66958000000001,
				teamId: 838205,
				teamName: 'Finland',
			},
			{
				distance: 572.3494,
				minutesPerAthlete: 392.68333333333334,
				points: 36.18674814814814,
				teamId: 982093,
				teamName: 'Poland',
			},
		]

		expect(sortSummaryByHours(summary)).toMatchObject([
			{
				distance: 572.3494,
				minutesPerAthlete: 392.68333333333334,
				points: 36.18674814814814,
				teamId: 982093,
				teamName: 'Poland',
			},
			{
				distance: 1029.1915000000004,
				minutesPerAthlete: 247.232,
				points: 19.66958000000001,
				teamId: 838205,
				teamName: 'Finland',
			},
		])
	})
})
