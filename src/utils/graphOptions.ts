export const options = {
	responsive: true,
	interaction: {
		mode: 'index' as const,
		intersect: false,
	},
	stacked: false,
	plugins: {
		title: {
			display: true,
			text: 'Strava competition - points',
		},
	},
	scales: {
		y: {
			type: 'linear' as const,
			display: true,
			position: 'left' as const,
		},
	},
}
