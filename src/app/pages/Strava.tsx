import axios from 'axios'
import { Main } from 'components/Main'
import { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

export type StravaObject = {
	timestamp: number
	totalData: { totalDistance: number; totalHours: number; totalPoints: number }
	weekly_summary: {
		weekNumber: number
		updates: {
			name: string
			distance: number
			hours: number
			clubPoints: number
			elevation: number
		}[]
	}[]
}

export const Strava = () => {
	const [exp, setExp] = useState<number>()
	const [data, setData] = useState<StravaObject>()
	const totalDist2021 = 14101.8
	const totalDist2022 = 5000

	const fetchData = async () => {
		const result = await axios.get<StravaObject>(
			`https://lenakh97.github.io/Nordic-strava-application/JSONObject.json?${Date.now()}`,
		)

		setData(result.data)
		setExp(parseInt(result.headers['cache-control'].split('=')[1], 10))
	}
	useEffect(() => {
		if (exp === undefined) {
			fetchData().catch(console.error)
			return
		}
		const interval = setInterval(() => {
			fetchData().catch(console.error)
		}, exp * 1000)
		return () => clearInterval(interval)
	}, [exp])

	if (data?.weekly_summary === undefined) {
		return (
			<>
				<h1>Data undefined</h1>
			</>
		)
	}
	const weekly_summary1 = data?.weekly_summary[0].updates
	const sortedDataWeek1 = (weekly_summary1 ?? []).sort(
		(a: { clubPoints: number }, b: { clubPoints: number }) =>
			b.clubPoints - a.clubPoints,
	)
	return (
		<Main>
			<h1>Distance goal</h1>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={(totalDist2022 / totalDist2021) * 100}
					text={`${Math.round((totalDist2022 / totalDist2021) * 100)}%`}
					styles={buildStyles({
						// Rotation of path and trail, in number of turns (0-1)
						rotation: 0,

						// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
						strokeLinecap: 'butt',

						// Text size
						textSize: '16px',

						// How long animation takes to go from one percentage to another, in seconds
						pathTransitionDuration: 0.5,

						// Can specify path transition in more detail, or remove it entirely
						// pathTransition: 'none',

						// Colors
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
			<br></br>
			<br></br>
			<br></br>
			<div>
				<h1>Strava Result week 1</h1>
				<table>
					<thead>
						<tr>
							<th>Strava club</th>
							<th>Weekly points</th>
							<th>Weekly distance</th>
							<th>Weekly hours</th>
							<th>Elevation</th>
						</tr>
					</thead>
					<tbody>
						{sortedDataWeek1.map(
							(item: {
								name: string
								distance: number
								hours: number
								clubPoints: number
								elevation: number
							}) => (
								<tr>
									<td key={item.name}>{item.name}</td>
									<td key={item.clubPoints}>{item.clubPoints}</td>
									<td key={item.distance}>{item.distance} km</td>
									<td key={item.hours}>{item.hours}</td>
									<td key={item.elevation}>{item.elevation} m</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			</div>
		</Main>
	)
}
