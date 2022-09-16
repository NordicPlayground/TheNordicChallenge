export const HourlyPoints = (weeklyHoursSorted: any, summary: any): void => {
	const weeklyHoursSliced = weeklyHoursSorted.slice(0, 4)
	console.log(summary)
	let points = 4
	for (const clubs of weeklyHoursSliced) {
		for (const summaryClubs of summary) {
			if (clubs.name === summaryClubs.name) {
				summaryClubs.clubPoints += points
			} else continue
			points -= 1
		}
	}
}
