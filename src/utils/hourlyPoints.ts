export type SummaryData = {
	name: string
	distance: number
	hours: number
	clubPoints: number
	elevation: number
	totPoints?: number
}[]

export const HourlyPoints = (
	weeklyHoursSorted: SummaryData,
	summary: SummaryData,
): SummaryData => {
	const summaryData: SummaryData = summary.map((s) => ({ ...s }))
	weeklyHoursSorted = (weeklyHoursSorted ?? []).sort(
		(a: { hours: number }, b: { hours: number }) => b.hours - a.hours,
	)
	const weeklyHoursSliced = weeklyHoursSorted.slice(0, 4)

	let points = 4
	for (const club of weeklyHoursSliced) {
		for (const summaryClub of summaryData) {
			if (club.name === summaryClub.name) {
				summaryClub.clubPoints += points
			} else continue

			points -= 1
		}
	}
	const sortedDataForGraph = (summaryData ?? []).sort(
		(a: { clubPoints: number }, b: { clubPoints: number }) =>
			b.clubPoints - a.clubPoints,
	)
	return sortedDataForGraph
}
