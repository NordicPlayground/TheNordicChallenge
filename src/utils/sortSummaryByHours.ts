import type { TeamInformation } from 'app/pages/Strava.js'

export const sortSummaryByHours = (
	summary: TeamInformation,
): TeamInformation => {
	const copyOfSummary = [...summary]
	return (copyOfSummary ?? []).sort(
		(a: { minutesPerAthlete: number }, b: { minutesPerAthlete: number }) =>
			b.minutesPerAthlete - a.minutesPerAthlete,
	)
}
