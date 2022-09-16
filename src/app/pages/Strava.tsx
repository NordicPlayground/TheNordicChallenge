import axios from 'axios'
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import { Main } from 'components/Main'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { weekNumber } from 'utils/getWeek'
import { HourlyPoints } from 'utils/hourlyPoints'
import type { GraphData } from 'utils/pointData2GraphData.js'
import './Strava.css'
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
)
export type StravaObject = {
	timestamp: number
	totalData: { totalDistance: number; totalHours: number; totalPoints: number }
	summary: {
		name: string
		distance: number
		hours: number
		clubPoints: number
		elevation: number
	}[]
}

export const Strava = () => {
	const [exp, setExp] = useState<number>()
	const [data, setData] = useState<StravaObject>()
	const totalDist2021 = 14101.8
	let totalDist2022 = data?.totalData.totalDistance
	if (totalDist2022 === undefined) {
		totalDist2022 = 0
	}
	const fetchData = async () => {
		const result = await axios.get<StravaObject>(
			`https://lenakh97.github.io/Nordic-strava-application/summary-week-${weekNumber}.json?`,
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
			HourlyPoints(weeklyHoursSorted, summary)
		}, exp * 1000)
		return () => clearInterval(interval)
	}, [exp])

	if (data?.summary === undefined) {
		return (
			<Main>
				<h1>Data undefined</h1>
			</Main>
		)
	}
	
	const summary = data?.summary
	const hourSummary = [...summary]

	const weeklyHoursSorted = (hourSummary ?? []).sort(
		(a: { hours: number }, b: { hours: number }) => b.hours - a.hours,
	)
	
	const sortedDataWeek1 = (summary ?? []).sort(
		(a: { clubPoints: number }, b: { clubPoints: number }) =>
			b.clubPoints - a.clubPoints,
	)
	/*
	const labels: (string | undefined)[] = summary.map(
		(item: { name: string }) => {
			return item.name.split('-').pop()
		},
	)
	const pointData: Number[] = summary.map((item: { clubPoints: number }) => {
		return item.clubPoints
	})
*/

	const graphData: GraphData = {
		labels: ['', 'week1', 'week2', 'week3', 'week4'],
		datasets: [
			{
				label: 'Trondheim',
				data: [0, 1.4 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: 'rgb(0 169 206)',
				tension: 0.1,
			},
			{
				label: 'Oslo',
				data: [0, 0.9 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: 'rgb(255,205,0)',
				tension: 0.1,
			},
			{
				label: 'Finland',
				data: [0, 1.8 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: '#D0DF00',
				tension: 0.1,
			},
			{
				label: 'Poland',
				data: [0, 1.9 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: '#EE2F4E',
				tension: 0.1,
			},
			{
				label: 'APAC',
				data: [0, 0.7 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: '#F58220',
				tension: 0.1,
			},
			{
				label: 'Europe',
				data: [0, 0.3 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: '#0033A0',
				tension: 0.1,
			},
			{
				label: 'USA',
				data: [0, 0.3 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: '#0077C8',
				tension: 0.1,
			},
			{
				label: 'Omega NTNU',
				data: [0, 1.3 /*,points week2, points week3, points week4 */],
				fill: false,
				borderColor: '#6AD1E3',
				tension: 0.1,
			},
		],
	}

	const options = {
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
	return (
		<Main>
			<>
				<div
					style={{
						width: '400',
						height: '200',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<div>
						<h1>Distance goal</h1>
						<div className="ProgressBar">
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
									//style={{padding: '5px 15px 5px 15px'}}
									// Colors
									pathColor: `rgb(0 169 206 / 80%)`,
									textColor: '#f88',
									trailColor: '#d6d6d6',
									backgroundColor: '#3e98c7',
								})}
							/>
						</div>
					</div>
					<div>
						<h1>Hours</h1>
						<table className="HoursTable">
							<thead>
								<tr>
									<th style={{ padding: '2px 10px' }}>Strava club</th>
									<th style={{ padding: '2px 10px' }}>Hours</th>
								</tr>
							</thead>
							<tbody>
								{weeklyHoursSorted
									.slice(0, 4)
									.map((item: { name: string; hours: number }) => (
										<tr>
											<td style={{ padding: '2px 10px' }} key={item.name}>
												{item.name.split('-').pop()}
											</td>
											<td style={{ padding: '2px 10px' }} key={item.hours}>
												{Math.round(item.hours)}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
				<br />
				<br />
				<br />
				<Line style={{ height: '500px' }} options={options} data={graphData} />
				<br />
				<br />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<h1>Results week {weekNumber}</h1>
					<table>
						<thead style={{ backgroundColor: 'rgba(0, 169, 206, 0.31)' }}>
							<tr>
								<th>Strava club</th>
								<th>Points</th>
								<th>Distance</th>
								<th>Hours</th>
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
										<td key={item.name}>{item.name.split('-').pop()}</td>
										<td key={item.clubPoints}>{item.clubPoints.toFixed(1)}</td>
										<td key={item.distance}>{Math.round(item.distance)} km</td>
										<td key={item.hours}>{Math.round(item.hours)}</td>
										<td key={item.elevation}>{Math.round(item.elevation)} m</td>
									</tr>
								),
							)}
						</tbody>
					</table>
				</div>
			</>
		</Main>
	)
}
