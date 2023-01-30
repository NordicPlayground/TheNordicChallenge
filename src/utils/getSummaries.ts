import type { StravaObject } from 'app/pages/Strava'
import type { SummaryData } from 'utils/hourlyPoints.js'

export const getSummaries = (weeklyData: StravaObject[]): SummaryData[] => {
	const summaryArray = []
	for (const data of weeklyData) {
		summaryArray.push(data?.summary)
	}
	return summaryArray
}
