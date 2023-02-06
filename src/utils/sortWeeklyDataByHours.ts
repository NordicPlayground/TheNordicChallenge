import { HourlyPoints, SummaryData } from 'utils/hourlyPoints.js'

export const sortWeeklyDataByHours = (
	weeklyHoursSortedArray: SummaryData[],
	summaryArray: SummaryData[],
): SummaryData[] => {
	const sortedDataForGraph = []
	let i = 0
	for (const sortedHours of weeklyHoursSortedArray) {
		const summary = summaryArray[i]
		sortedDataForGraph.push(HourlyPoints(sortedHours, summary))
		i++
	}
	return sortedDataForGraph
}
