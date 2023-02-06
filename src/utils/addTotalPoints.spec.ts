import { addTotalPoints } from 'utils/addTotalPoints.js'
import { weekNumber } from 'utils/getWeek.js'
import type { PointData } from 'utils/pointData2GraphData.js'

export type Summary = {
	name: string
	distance: number
	hours: number
	clubPoints: number
	elevation: number
	totPoints?: number
}[]

describe('addTotalPoints()', () => {
	it('should add total points to newSummary', () => {
		const newSummary: Summary = [
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 0.2,
				elevation: 104.1,
			},
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.012016460905349793,
				clubPoints: 0.1,
				elevation: 22.7,
			},
		]

		const oldPointData: PointData = [
			{
				week: weekNumber - 1,
				club: 'Finland',
				points: 1.4,
			},
			{
				week: weekNumber,
				club: 'Finland',
				points: 5.4,
			},
			{
				week: weekNumber - 1,
				club: 'Poland',
				points: 0.7,
			},
			{
				week: weekNumber,
				club: 'Poland',
				points: 4.4,
			},
		]

		expect(addTotalPoints(newSummary, oldPointData)).toMatchObject([
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 0.2,
				elevation: 104.1,
				totPoints: 0.2 + 1.4,
			},
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.012016460905349793,
				clubPoints: 0.1,
				elevation: 22.7,
				totPoints: 0.7 + 0.1,
			},
		])
	})
})
