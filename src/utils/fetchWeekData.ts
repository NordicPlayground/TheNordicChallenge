import type { StravaObject } from 'app/pages/Strava'

export const fetchWeekData = async (): Promise<{
	weekData: StravaObject[]
	exp: number | undefined
}> => {
	const weekData = []
	let exp
	for (let weekNum = 4; weekNum < 8; weekNum++) {
		try {
			const res = await fetch(
				`https://lenakh97.github.io/Nordic-strava-application/summary-week-${weekNum
					.toString()
					.padStart(2, '0')}.json?`,
			)
			weekData.push(await res.json())
			exp = parseInt(
				res?.headers.get('cache-control')?.split('=')?.[1] ?? '3600',
				10,
			)
		} catch {
			// Pass, week does not exist
		}
	}
	return { weekData, exp }
}
