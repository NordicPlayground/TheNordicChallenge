import type { Summary } from 'utils/addTotalPoints.spec'
import { weekNumber } from 'utils/getWeek.js'
import type { PointData } from 'utils/pointData2GraphData.js'

export const addTotalPoints = (
	data: Summary,
	pointData: PointData,
): Summary => {
	if (data === undefined) {
		return data
	}
	const newData = [...data]
	for (const club of newData) {
		for (const pointClub of pointData) {
			if (
				club.name.includes(pointClub.club) &&
				pointClub.week === weekNumber - 1
			) {
				club.totPoints = club.clubPoints + pointClub.points
			}
		}
	}
	return data
}
