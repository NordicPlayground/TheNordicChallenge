import 'app/pages/Strava.css'
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
import { HourlyPoints, SummaryData } from 'utils/hourlyPoints'
import {
	GraphData,
	PointData,
	pointData2GraphData,
} from 'utils/pointData2GraphData.js'
import { summaryDataToPointData } from 'utils/summaryDataToPointData'
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
		const result = await fetch(
			`https://lenakh97.github.io/Nordic-strava-application/summary-week-${weekNumber}.json?`,
		)
		setData(await result.json())
		setExp(
			parseInt(
				result?.headers.get('cache-control')?.split('=')?.[1] ?? '3600',
				10,
			),
		)
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

	if (data?.summary === undefined) {
		return (
			<Main>
				<h1>Data undefined</h1>
			</Main>
		)
	}

	const summary: SummaryData = data?.summary
	const hourSummary = [...summary]

	const weeklyHoursSorted = (hourSummary ?? []).sort(
		(a: { hours: number }, b: { hours: number }) => b.hours - a.hours,
	)

	const sortedDataForGraph = HourlyPoints(weeklyHoursSorted, summary)
	const graphSummaryData: StravaObject = { ...data }
	graphSummaryData.summary = sortedDataForGraph
	const summaryDataForGraph: StravaObject[] = [graphSummaryData]
	const pointData = summaryDataToPointData(summaryDataForGraph) as PointData
	const graphData: GraphData = pointData2GraphData(pointData)

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
					<div
						className="progdiv"
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
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
						<h1
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							Time
						</h1>
						<table className="HoursTable">
							<thead>
								<tr>
									<th style={{ padding: '2px 10px' }}>Strava club</th>
									<th style={{ padding: '2px 10px' }}>Minutes</th>
								</tr>
							</thead>
							<tbody>
								{weeklyHoursSorted
									.slice(0, 4)
									.map((item: { name: string; hours: number }, k) => (
										<tr key={k}>
											<td style={{ padding: '2px 10px' }} key={item.name}>
												{item.name.split('-').pop()}
											</td>
											<td
												style={{ padding: '2px 10px', textAlign: 'right' }}
												key={item.hours}
											>
												{Math.round(item.hours * 60)}
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
				<Line style={{ height: '1000px' }} options={options} data={graphData} />
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
					<h1>Results week {weekNumber - 1}</h1>
					<table>
						<thead style={{ backgroundColor: 'rgba(0, 169, 206, 0.31)' }}>
							<tr>
								<th>Team</th>
								<th>Pts.</th>
								<th>Dist. (km)</th>
								<th>
									<abbr title="Minutes">Min.</abbr>
								</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{sortedDataForGraph.map(
								(
									item: {
										name: string
										distance: number
										hours: number
										clubPoints: number
										elevation: number
									},
									k,
								) => (
									<tr key={k}>
										<td key={item.name}>{item.name.split('-').pop()}</td>
										<td key={item.clubPoints} style={{ textAlign: 'right' }}>
											{item.clubPoints.toFixed(1)}
										</td>
										<td key={item.distance} style={{ textAlign: 'right' }}>
											{Math.round(item.distance)}
										</td>
										<td key={item.hours} style={{ textAlign: 'right' }}>
											{Math.round(item.hours * 60)}
										</td>
										<td
											key={item.clubPoints - 2}
											style={{ textAlign: 'right' }}
										>
											{item.clubPoints.toFixed(1)}
										</td>
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
