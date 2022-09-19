import { PointData, pointData2GraphData } from 'utils/pointData2GraphData.js'

describe('pointData2GraphData()', () => {
	it('should convert point data to graph data', () => {
		const pointData: PointData = [
			{
				week: 38,
				club: 'Trondheim',
				points: 1.4,
			},
			{
				week: 39,
				club: 'Trondheim',
				points: 5.4,
			},
			{
				week: 38,
				club: 'Oslo',
				points: 0.7,
			},
			{
				week: 39,
				club: 'Oslo',
				points: 4.4,
			},
		]

		expect(pointData2GraphData(pointData)).toMatchObject({
			labels: ['', 'Week 38', 'Week 39'],
			datasets: [
				{
					label: 'Trondheim',
					data: [0, 1.4, 5.4],
					fill: false,
					borderColor: 'rgb(0 169 206)', // Use a static map of team name to color
					tension: 0.1,
				},
				{
					label: 'Oslo',
					data: [0, 0.7, 4.4],
					fill: false,
					borderColor: 'rgb(255,205,0)',
					tension: 0.1,
				},
			],
		})
	})
})
