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
import 'react-circular-progressbar/dist/styles.css'
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

export const WeeklySummaries = () => {
	const [exp, setExp] = useState<number>()
	const [timestreamData, setTimestreamData] = useState<Summary>()

	const fetchData = async () => {
		const result = await fetch(
			`https://k66fzrj7leiarkgqtenq2udn3a0oznzh.lambda-url.us-east-2.on.aws/`,
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
	const allWeeks: TeamInformation[] = []
	for (const week of timestreamData.weeks) {
		const teamInfoWeek = []
		for (const teamInfo of week.teamInformation) {
			teamInfoWeek.push(teamInfo)
		}
		const sortedWeekly = teamInfoWeek.sort(
			(a: { points: number }, b: { points: number }) => b.points - a.points,
		)
		allWeeks.push(sortedWeekly)
	}

	return (
		<Main>
			<>
				<div className="tableRowResults">
					<div className="resultTable">
						<h1>First week</h1>
						<div style={{ width: '0.99' }}>
							<table>
								<thead style={{ backgroundColor: 'rgba(0, 169, 206, 0.31)' }}>
									<tr>
										<th>Team</th>
										<th>Pts.</th>
										<th>Dist. (km)</th>
										<th>
											<abbr title="Minutes">Min.</abbr>
										</th>
									</tr>
								</thead>
								<tbody>
									{allWeeks[0].map(
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
											</tr>
										),
									)}
								</tbody>
							</table>
						</div>
					</div>
					<br></br>
					<div className="resultTable">
						<h1>Second week</h1>
						<table>
							<thead style={{ backgroundColor: 'rgba(0, 169, 206, 0.31)' }}>
								<tr>
									<th>Team</th>
									<th>Pts.</th>
									<th>Dist. (km)</th>
									<th>
										<abbr title="Minutes">Min.</abbr>
									</th>
								</tr>
							</thead>
							<tbody>
								{allWeeks[1].map(
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
										</tr>
									),
								)}
							</tbody>
						</table>
					</div>
					<br></br>
				</div>
				<div className="tableRowResults">
					<div className="resultTable">
						<h1>Third week</h1>
						<table>
							<thead style={{ backgroundColor: 'rgba(0, 169, 206, 0.31)' }}>
								<tr>
									<th>Team</th>
									<th>Pts.</th>
									<th>Dist. (km)</th>
									<th>
										<abbr title="Minutes">Min.</abbr>
									</th>
								</tr>
							</thead>
							<tbody>
								{allWeeks[2].map(
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
										</tr>
									),
								)}
							</tbody>
						</table>
					</div>
					<br></br>
					<div className="resultTable">
						<h1>Last week</h1>
						<table>
							<thead style={{ backgroundColor: 'rgba(0, 169, 206, 0.31)' }}>
								<tr>
									<th>Team</th>
									<th>Pts.</th>
									<th>Dist. (km)</th>
									<th>
										<abbr title="Minutes">Min.</abbr>
									</th>
								</tr>
							</thead>
							<tbody>
								{allWeeks[3].map(
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
										</tr>
									),
								)}
							</tbody>
						</table>
					</div>
				</div>
			</>
		</Main>
	)
}
