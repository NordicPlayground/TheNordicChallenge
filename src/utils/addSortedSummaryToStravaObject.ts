import type { StravaObject } from 'app/pages/Strava'
import type { SummaryData } from 'utils/hourlyPoints.js'

export const addSortedSummaryToStravaObject = (
	sortedDataForGraph: SummaryData[],
	weeklyData: StravaObject[],
): StravaObject[] => {
	let j = 0
	const summaryDataForGraph = []
	for (const sortedData of sortedDataForGraph) {
		const newObj: StravaObject = { ...weeklyData[j] }
		newObj.summary = sortedData
		//timestamp from prev week is wrong due to GMT timezone,
		//adding one hour to put the summary in the correct week
		newObj.timestamp = newObj.timestamp - 3600
		summaryDataForGraph.push(newObj)
		j++
	}
	return summaryDataForGraph
}
