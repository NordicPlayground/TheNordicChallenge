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
import { options } from 'utils/graphOptions'
import { sortSummaryByHours } from 'utils/sortSummaryByHours'
import { summaryDataToGraphData } from 'utils/summaryDataToGraphData'
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
)

export type WeeklySummary = {
	weekNumber: number
	distance: number
	teamInformation: TeamInformation
}

export type TeamInformation = {
	teamId: number
	teamName: string
	points: number
	minutesPerAthlete: number
	distance: number
	totPoints?: number
}[]

export type Summary = {
	overall: {
		// Hardcoded goal from last year
		distanceGoal: number
		currentDistance: number
		totalHours: number
		teamInfo: Record<string, { memberCount: number }>
	}
	weeks: WeeklySummary[]
}

export const Strava = () => {
	const [exp, setExp] = useState<number>()
	const [timestreamData, setTimestreamData] = useState<Summary>()
	const distanceGoal = timestreamData?.overall.distanceGoal
	const currentDistance = timestreamData?.overall.currentDistance

	const fetchData = async () => {
		const result = await fetch(
			`https://l3svp5tprslh63jdazjgg6mdta0ocgkr.lambda-url.eu-central-1.on.aws/`,
		)
		setTimestreamData(await result.json())
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
	if (timestreamData === undefined) {
		return (
			<Main>
				<h1>Data loading</h1>
			</Main>
		)
	}
	let currenWeektTeamInformation = []
	for (const weeks of timestreamData.weeks) {
		if (weeks.weekNumber === weekNumber) {
			currenWeektTeamInformation.push(weeks.teamInformation)
		} else {
			currenWeektTeamInformation = []
			currenWeektTeamInformation.push(weeks.teamInformation)
		}
	}
	const weeklyHoursSorted = sortSummaryByHours(currenWeektTeamInformation[0])

	const graphData = summaryDataToGraphData(timestreamData.weeks)

	for (const team of graphData.datasets) {
		for (const teamName of currenWeektTeamInformation[0]) {
			if (team.label === teamName.teamName) {
				teamName.totPoints = team.data.slice(-1)[0]
			}
		}
	}

	const tableData = (currenWeektTeamInformation[0] ?? []).sort(
		(a: { points: number }, b: { points: number }) => b.points - a.points,
	)
	console.log(tableData)

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
								value={((currentDistance ?? 0) / (distanceGoal ?? 0)) * 100}
								text={`${Math.round(
									((currentDistance ?? 0) / (distanceGoal ?? 0)) * 100,
								)}%`}
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
									.map(
										(
											item: { teamName: string; minutesPerAthlete: number },
											k,
										) => (
											<tr key={k}>
												<td style={{ padding: '2px 10px' }} key={item.teamName}>
													{item.teamName.split('-').pop()}
												</td>
												<td
													style={{ padding: '2px 10px', textAlign: 'right' }}
													key={item.minutesPerAthlete}
												>
													{Math.round(item.minutesPerAthlete)}
												</td>
											</tr>
										),
									)}
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
								Total distance goal is 15726.7km, we're now at{' '}
								{currentDistance?.toFixed(1)}km.
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
							{tableData.map(
								(
									item: {
										teamName: string
										distance: number
										minutesPerAthlete: number
										points: number
										totPoints?: number
									},
									k,
								) => (
									<tr key={k}>
										<td key={item.teamName}>
											{item.teamName.split('-').pop()}
										</td>
										<td key={item.points} style={{ textAlign: 'right' }}>
											{item.points.toFixed(1)}
										</td>
										<td key={item.distance} style={{ textAlign: 'right' }}>
											{Math.round(item.distance)}
										</td>
										<td
											key={item.minutesPerAthlete}
											style={{ textAlign: 'right' }}
										>
											{Math.round(item.minutesPerAthlete)}
										</td>
										<td key={item.points - 2} style={{ textAlign: 'right' }}>
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
