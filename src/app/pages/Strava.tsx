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
import { addTotalPoints } from 'utils/addTotalPoints'
import { HourlyPoints, SummaryData } from 'utils/hourlyPoints'
import {
	GraphData,
	PointData,
	pointData2GraphData,
} from 'utils/pointData2GraphData.js'
import { sortSummaryByHours } from 'utils/sortSummaryByHours'
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
	const [dataWeek1, setDataWeek1] = useState<StravaObject>()
	const totalDist2022H = 15726.7
	const [dataWeek2, setDataWeek2] = useState<StravaObject>()
	const [dataWeek3, setDataWeek3] = useState<StravaObject>()

	//calculating totaldist from previous weeks and current week
	let totalDist2022 = 0
	if (
		dataWeek3?.totalData.totalDistance === undefined ||
		dataWeek2?.totalData.totalDistance === undefined ||
		dataWeek1?.totalData.totalDistance === undefined ||
		data?.totalData.totalDistance === undefined
	) {
		console.log('total distance undefined')
	} else {
		totalDist2022 =
			data?.totalData.totalDistance +
			dataWeek1?.totalData.totalDistance +
			dataWeek2?.totalData.totalDistance +
			dataWeek3?.totalData.totalDistance
	}
	const fetchData = async () => {
		const result = await fetch(
			`https://lenakh97.github.io/Nordic-strava-application/summary-week-42.json?`,
		)
		setData(await result.json())
		setExp(
			parseInt(
				result?.headers.get('cache-control')?.split('=')?.[1] ?? '3600',
				10,
			),
		)
		//fetching last weeks summary
		const week1 = await fetch(
			`https://lenakh97.github.io/Nordic-strava-application/summary-week-39.json?`,
		)
		setDataWeek1(await week1.json())
		setExp(
			parseInt(
				week1?.headers.get('cache-control')?.split('=')?.[1] ?? '3600',
				10,
			),
		)
		//fetching week2 summary
		const week2 = await fetch(
			`https://lenakh97.github.io/Nordic-strava-application/summary-week-40.json?`,
		)
		setDataWeek2(await week2.json())
		setExp(
			parseInt(
				week2?.headers.get('cache-control')?.split('=')?.[1] ?? '3600',
				10,
			),
		)
		//fetching week3 summary
		const week3 = await fetch(
			`https://lenakh97.github.io/Nordic-strava-application/summary-week-41.json?`,
		)
		setDataWeek3(await week3.json())
		setExp(
			parseInt(
				week3?.headers.get('cache-control')?.split('=')?.[1] ?? '3600',
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

	if (
		data?.summary === undefined ||
		dataWeek1 === undefined ||
		dataWeek2 === undefined ||
		dataWeek3 === undefined
	) {
		return (
			<Main>
				<h1>Data undefined</h1>
			</Main>
		)
	}

	//Extract the summaries from the data
	const summary: SummaryData = data?.summary
	const summaryWeek1: SummaryData = dataWeek1?.summary
	const summaryWeek2: SummaryData = dataWeek2?.summary
	const summaryWeek3: SummaryData = dataWeek3?.summary

	//Make a copy of the summary, and sort it based on hours
	const weeklyHoursSorted = sortSummaryByHours(summary)
	const weeklyHoursSortedWeek1 = sortSummaryByHours(summaryWeek1)
	const weeklyHoursSortedWeek2 = sortSummaryByHours(summaryWeek2)
	const weeklyHoursSortedWeek3 = sortSummaryByHours(summaryWeek3)

	//sort data from current week based og hourly points
	const sortedDataForGraph = HourlyPoints(weeklyHoursSorted, summary)
	const graphSummaryData: StravaObject = { ...data }
	graphSummaryData.summary = sortedDataForGraph
	graphSummaryData.timestamp = 1665898292

	//Sorted week1-data for graph with hourly points
	const sortedDataForGraphWeek1 = HourlyPoints(
		weeklyHoursSortedWeek1,
		summaryWeek1,
	)
	const graphSummaryDataWeek1: StravaObject = { ...dataWeek1 }
	graphSummaryDataWeek1.summary = sortedDataForGraphWeek1
	//timestamp from summary is in the wrong week (timezone)
	graphSummaryDataWeek1.timestamp = 1664077513

	//Sorted week2-data for graph with hourly points
	const sortedDataForGraphWeek2 = HourlyPoints(
		weeklyHoursSortedWeek2,
		summaryWeek2,
	)
	const graphSummaryDataWeek2: StravaObject = { ...dataWeek2 }
	graphSummaryDataWeek2.summary = sortedDataForGraphWeek2
	//timestamp from summary is in the wrong week (timezone)
	graphSummaryDataWeek2.timestamp = 1664596756

	//Sorted week3-data for graph with hourly points
	const sortedDataForGraphWeek3 = HourlyPoints(
		weeklyHoursSortedWeek3,
		summaryWeek3,
	)
	const graphSummaryDataWeek3: StravaObject = { ...dataWeek3 }
	graphSummaryDataWeek3.summary = sortedDataForGraphWeek3
	//timestamp from summary is in the wrong week (timezone)
	graphSummaryDataWeek3.timestamp = 1664803631

	//Array of summaries from all week to use in graph to calculate pointdata
	const summaryDataForGraph: StravaObject[] = [
		graphSummaryDataWeek1,
		graphSummaryDataWeek2,
		graphSummaryDataWeek3,
		graphSummaryData,
	]
	//calculating point data based on summaryDataforGraph for all weeks
	const pointData = summaryDataToPointData(summaryDataForGraph) as PointData
	//takes pointdata and makes it into graphdata
	const graphData: GraphData = pointData2GraphData(pointData)
	//making a new summary, with hourly point
	let graphSummaryDataPlusTotalPoints: SummaryData = sortedDataForGraph.map(
		(s) => ({ ...s }),
	)
	// adding points from prev week from pointData to 'elevation' using elevation as 'totalpoints'
	graphSummaryDataPlusTotalPoints = addTotalPoints(
		graphSummaryDataPlusTotalPoints,
		pointData,
	)
	//optiongs used for the graph
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
	const tableData = (graphSummaryDataPlusTotalPoints ?? []).sort(
		(a: { elevation: number }, b: { elevation: number }) =>
			b.elevation - a.elevation,
	)

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
								value={(totalDist2022 / totalDist2022H) * 100}
								text={`${Math.round((totalDist2022 / totalDist2022H) * 100)}%`}
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
				<div
					style={{
						width: '400',
						height: '200',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<div className="progText">
						<p
							style={{
								textAlign: 'center',
								margin: '5px 10px 0 10px',
								fontSize: '15px',
							}}
						>
							<i>
								Total distance goal is 14101.8km, we're now at{' '}
								{totalDist2022.toFixed(1)}km.
							</i>
						</p>
					</div>
					<div className="hourText">
						<p
							style={{
								textAlign: 'center',
								margin: '5px 10px 0 10px',
								fontSize: '15px',
							}}
						>
							<i>Time is measured in minutes per club member.</i>
						</p>
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
					<h1>Results week {41}</h1>
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
							{graphSummaryDataPlusTotalPoints.map(
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
											{item.elevation.toFixed(1)}
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
