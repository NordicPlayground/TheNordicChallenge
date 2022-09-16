export type PointData = {
	week: number
	club: string
	points: number
}[]

const teamColors = {
	Trondheim: {
		color: 'rgb(0 169 206)',
	},
	Oslo: {
		color: 'rgb(255,205,0)',
	},
}

export const pointData2GraphData = (data: PointData): GraphData => {
	const result: GraphData = {} as any
	result.labels = ['']
	result.datasets = []
	for (const weeklyData of data) {
		let duplicate = false
		if (result.labels.includes(`Week ${weeklyData.week.toString()}`)) {
			console.log('already in list')
		} else {
			result.labels.push(`Week ${weeklyData.week.toString()}`)
		}
		for (const dataset of result.datasets) {
			if (dataset.label.includes(weeklyData.club)) {
				dataset.data.push(weeklyData.points)
				duplicate = true
			}
		}
		const clubName = weeklyData.club
		if (!duplicate) {
			result.datasets.push({
				label: clubName,
				data: [0, weeklyData.points],
				fill: false,
				borderColor: teamColors.Trondheim.color,
				tension: 0.1,
			})
		}
	}
	console.log(result.datasets)
	return result
}

export type GraphData = {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		fill: boolean
		borderColor: string
		tension: number
	}[]
}
