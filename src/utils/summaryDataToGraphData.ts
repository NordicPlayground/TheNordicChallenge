import type { WeeklySummary } from 'app/pages/Strava.js'
import type { GraphData } from 'utils/pointData2GraphData.js'
import { teamColors } from 'utils/teamColors.js'

export const summaryDataToGraphData = (
	weeklySummary: WeeklySummary[],
): GraphData => {
	const result: GraphData = {} as any
	result.labels = ['']
	result.datasets = []
	for (const week of weeklySummary) {
		result.labels.push(`Week ${week.weekNumber}`)
		for (const team of week.teamInformation) {
			console.log(team)
			let duplicate = false
			for (const dataset of result.datasets) {
				if (dataset.label.includes(team.teamName)) {
					const lastWeekPoint = dataset.data.slice(-1)
					console.log(lastWeekPoint)
					let thisWeeksPoints = 0
					if (lastWeekPoint === undefined) {
						thisWeeksPoints = team.points
					} else {
						thisWeeksPoints = team.points + lastWeekPoint[0]
					}
					dataset.data.push(thisWeeksPoints)
					duplicate = true
				}
			}
			if (!duplicate) {
				result.datasets.push({
					label: team.teamName,
					data: [0, team.points],
					fill: false,
					borderColor: teamColors[team.teamName],
					tension: 0.1,
				})
				console.log(team.teamName, result.datasets[0].data)
			}
			//console.log(team.teamName, result.datasets[0].data)
		}
	}
	return result
}
