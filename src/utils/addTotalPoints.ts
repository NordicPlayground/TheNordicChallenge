import type { PointData } from 'utils/pointData2GraphData.js'
import type { Summary } from './addTotalPoints.spec'
import { weekNumber } from './getWeek'

export const addTotalPoints = (
	data: Summary,
	pointData: PointData,
): Summary => {
	const result: Summary = []
	if (data === undefined) {
		return data
	}
	let newData = [...data]
	for (const club of data) {
		for (const pointClub of pointData) {
			console.log(weekNumber)
			if (
				club.name.includes(`${pointClub.club}`) &&
				pointClub.week === weekNumber - 2
			) {
				club.elevation = club.clubPoints + pointClub.points
			}
		}
	}
	console.log(data)

	return data
}
