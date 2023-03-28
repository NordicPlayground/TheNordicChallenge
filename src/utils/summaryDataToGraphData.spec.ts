import { summaryDataToGraphData } from 'utils/summaryDataToGraphData.js'

describe('summaryDataToGraphData()', () => {
	it('should convert weekly summary to graph data', () => {
		const weeklySummary = [
			{
				weekNumber: 13,
				distance: 3752.898100000002,
				teamInformation: [
					{
						teamId: 838205,
						teamName: 'Finland',
						points: 1,
						minutesPerAthlete: 247.232,
						distance: 1029.1915000000004,
					},
					{
						teamId: 982093,
						teamName: 'Poland',
						points: 2,
						minutesPerAthlete: 390.5,
						distance: 565.6912,
					},
				],
			},
			{
				weekNumber: 14,
				distance: 3752.898100000002,
				teamInformation: [
					{
						teamId: 838205,
						teamName: 'Finland',
						points: 3,
						minutesPerAthlete: 247.232,
						distance: 1029.1915000000004,
					},
					{
						teamId: 982093,
						teamName: 'Poland',
						points: 4,
						minutesPerAthlete: 390.5,
						distance: 565.6912,
					},
				],
			},
		]

		expect(summaryDataToGraphData(weeklySummary)).toMatchObject({
			labels: ['', 'Week 13', 'Week 14'],
			datasets: [
				{
					label: 'Finland',
					data: [0, 1, 4],
					fill: false,
					borderColor: '#D0DF00', // Use a static map of team name to color
					tension: 0.1,
				},
				{
					label: 'Poland',
					data: [0, 2, 6],
					fill: false,
					borderColor: '#EE2F4E',
					tension: 0.1,
				},
			],
		})
	})
})
