import { HourlyPoints } from 'utils/hourlyPoints.js'

describe('hourlyPoint()', () => {
	it('should add hourly points to summary', () => {
		const summary = [
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 0.2,
				elevation: 104.1,
			},
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.012016460905349793,
				clubPoints: 0.1,
				elevation: 22.7,
			},
			{
				name: 'Nordic Semiconductor - Europe',
				distance: 5.1,
				hours: 0.011598765432098765,
				clubPoints: 0.1,
				elevation: 51.2,
			},
			{
				name: 'Nordic Semiconductor - APAC',
				distance: 11.006499999999999,
				hours: 0.023818342151675484,
				clubPoints: 0.1889920634920635,
				elevation: 62.2,
			},
			{
				name: 'Nordic Semiconductor - USA',
				distance: 0.9,
				hours: 0.023425925925925923,
				clubPoints: 0,
				elevation: 13.2,
			},
			{
				name: 'Nordic Semiconductor - Trondheim Office',
				distance: 14.507200000000001,
				hours: 0.020123832449781817,
				clubPoints: 0.13802025316455696,
				elevation: 343.3,
			},
			{
				name: 'Omega NTNU',
				distance: 41.6,
				hours: 0.01591812997300802,
				clubPoints: 0.1,
				elevation: 558.9,
			},
			{
				name: 'Nordic Semiconductor - Oslo Office',
				distance: 9.7,
				hours: 0.02918918918918919,
				clubPoints: 0.2,
				elevation: 54.8,
			},
		]

		const weeklyHoursSummary = [
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 0.2,
				elevation: 104.1,
			},
			{
				name: 'Nordic Semiconductor - Oslo Office',
				distance: 9.7,
				hours: 0.02918918918918919,
				clubPoints: 0.2,
				elevation: 54.8,
			},
			{
				name: 'Nordic Semiconductor - APAC',
				distance: 11.006499999999999,
				hours: 0.023818342151675484,
				clubPoints: 0.1889920634920635,
				elevation: 62.2,
			},
			{
				name: 'Nordic Semiconductor - USA',
				distance: 0.9,
				hours: 0.023425925925925923,
				clubPoints: 0,
				elevation: 13.2,
			},
			{
				name: 'Nordic Semiconductor - Trondheim Office',
				distance: 14.507200000000001,
				hours: 0.020123832449781817,
				clubPoints: 0.13802025316455696,
				elevation: 343.3,
			},
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.012016460905349793,
				clubPoints: 0.1,
				elevation: 22.7,
			},
			{
				name: 'Nordic Semiconductor - Europe',
				distance: 5.1,
				hours: 0.011598765432098765,
				clubPoints: 0.1,
				elevation: 51.2,
			},
			{
				name: 'Omega NTNU',
				distance: 41.6,
				hours: 0.01591812997300802,
				clubPoints: 0.1,
				elevation: 558.9,
			},
		]

		expect(HourlyPoints(weeklyHoursSummary, summary)).toMatchObject([
			{
				name: 'Nordic Semiconductor - Finland',
				distance: 12.2,
				hours: 0.032626633986928104,
				clubPoints: 4.2,
				elevation: 104.1,
			},
			{
				name: 'Nordic Semiconductor - Oslo Office',
				distance: 9.7,
				hours: 0.02918918918918919,
				clubPoints: 3.2,
				elevation: 54.8,
			},
			{
				name: 'Nordic Semiconductor - APAC',
				distance: 11.006499999999999,
				hours: 0.023818342151675484,
				clubPoints: 2.1889920634920635,
				elevation: 62.2,
			},
			{
				name: 'Nordic Semiconductor - USA',
				distance: 0.9,
				hours: 0.023425925925925923,
				clubPoints: 1,
				elevation: 13.2,
			},
			{
				name: 'Nordic Semiconductor - Trondheim Office',
				distance: 14.507200000000001,
				hours: 0.020123832449781817,
				clubPoints: 0.13802025316455696,
				elevation: 343.3,
			},
			{
				name: 'Nordic Semiconductor - Poland',
				distance: 2.2,
				hours: 0.012016460905349793,
				clubPoints: 0.1,
				elevation: 22.7,
			},
			{
				name: 'Nordic Semiconductor - Europe',
				distance: 5.1,
				hours: 0.011598765432098765,
				clubPoints: 0.1,
				elevation: 51.2,
			},
			{
				name: 'Omega NTNU',
				distance: 41.6,
				hours: 0.01591812997300802,
				clubPoints: 0.1,
				elevation: 558.9,
			},
		])
	})
})
