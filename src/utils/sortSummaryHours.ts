import type { SummaryData } from 'utils/hourlyPoints.js'
import { sortSummaryByHours } from 'utils/sortSummaryByHours.js'

export const sortSummaryHours = (
	summaryArray: SummaryData[],
): SummaryData[] => {
	const weeklyHoursSortedArray = []
	for (const summary of summaryArray) {
		weeklyHoursSortedArray.push(sortSummaryByHours(summary))
	}
	return weeklyHoursSortedArray
}
