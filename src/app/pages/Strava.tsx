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
import { fetchWeekData } from 'utils/fetchWeekData'
import { getSummaries } from 'utils/getSummaries'
import { weekNumber } from 'utils/getWeek'
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
		totPoints?: number
	}[]
}

export const Strava = () => {
	const [exp, setExp] = useState<number>()
	const totalDist2021 = 14101.8
	const [weeklyData, setWeeklyData] = useState<StravaObject[]>([])
	const [totalDist2022, setTotalDist] = useState<number>(0)

	const getTotalDistAndWeeklyData = async () => {
		const weeklyDataAndExp = await fetchWeekData()
		const weeklyData = weeklyDataAndExp.weekData
		const exp = weeklyDataAndExp.exp
		let totalDist2022 = 0
		for (const data of weeklyData) {
			totalDist2022 += data?.totalData.totalDistance
		}
		setWeeklyData(weeklyData)
		setTotalDist(totalDist2022)
		setExp(exp)
	}
	useEffect(() => {
		if (exp === undefined) {
			getTotalDistAndWeeklyData().catch(console.error)
			return
		}
		const interval = setInterval(() => {
			getTotalDistAndWeeklyData().catch(console.error)
		}, exp * 1000)
		return () => clearInterval(interval)
	}, [exp])

	//check if weeklyData is undefined before using it
	if (weeklyData === undefined) {
		return (
			<Main>
				<h1>Data undefined</h1>
			</Main>
		)
	}

	//Extract the summaries from the data

	const summaryArray = getSummaries(weeklyData)

	//Make a copy of the summary, and sort it based on hours
	const weeklyHoursSortedArray = []
	for (const summary of summaryArray) {
		weeklyHoursSortedArray.push(sortSummaryByHours(summary))
	}

	//sort data from all the weeks based on hourly points
	const sortedDataForGraph = []
	let i = 0
	for (const sortedHours of weeklyHoursSortedArray) {
		const summary = summaryArray[i]
		sortedDataForGraph.push(HourlyPoints(sortedHours, summary))
		i++
	}
	//Making a copy of the Strava object and add sorted summary
	let j = 0
	const summaryDataForGraph = []
	for (const sortedData of sortedDataForGraph) {
		const newObj: StravaObject = { ...weeklyData[j] }
		newObj.summary = sortedData
		//timestamp from prev week is wrong due to GMT timezone,
		//adding one hour to put the summary in the correct week
		newObj.timestamp = newObj.timestamp - 3600
		summaryDataForGraph.push(newObj)
		j++
	}

	//calculating point data based on summaryDataforGraph for all weeks
	const pointData = summaryDataToPointData(summaryDataForGraph) as PointData

	//takes pointdata and makes it into graphdata
	const graphData: GraphData = pointData2GraphData(pointData)

	//making a new summary, with hourly point after checking that sortedDataForGraph is defined
	if (sortedDataForGraph[sortedDataForGraph.length - 1] === undefined) {
		return (
			<Main>
				<h1>Data undefined</h1>
			</Main>
		)
	}
	let graphSummaryDataPlusTotalPoints: SummaryData = sortedDataForGraph[
		sortedDataForGraph.length - 1
	].map((s) => ({ ...s }))

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

	;(graphSummaryDataPlusTotalPoints ?? []).sort(
		(a: { totPoints?: number }, b: { totPoints?: number }) =>
			(b.totPoints ?? 0) - (a.totPoints ?? 0),
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
								{weeklyHoursSortedArray[weeklyHoursSortedArray.length - 1]
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
					<h1>Results week {weekNumber}</h1>
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
										totPoints?: number
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
											{item.totPoints?.toFixed(1)}
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
