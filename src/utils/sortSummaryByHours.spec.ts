import type { Summary } from 'utils/addTotalPoints.spec'
import { sortSummaryByHours } from 'utils/sortSummaryByHours.js'

describe('sortSummary()', () => {
	it('should sort a summary of Strava Data', () => {
		const summary: Summary = [
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 0.2,
				elevation: 0.7,
			},
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.502016460905349793,
				clubPoints: 0.1,
				elevation: 0.2,
			},
		]

		expect(sortSummaryByHours(summary)).toMatchObject([
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.502016460905349793,
				clubPoints: 0.1,
				elevation: 0.2,
			},
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 0.2,
				elevation: 0.7,
			},
		])
	})
})
