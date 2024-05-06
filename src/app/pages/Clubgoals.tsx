import type { Summary } from 'app/pages/Strava'
import { Main } from 'components/Main'
import { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import Select from 'react-select'

export const ClubGoals = () => {
	//Goals are hardcoded from last years challenge
	const distanceRecord: Record<
		string,
		{
			clubGoalDistance: number
			currentDistance: number
			clubGoalTime: number
			currentTime: number
			officeHeadCount: number
			activeAthletes: number
		}
	> = {
		Finland: {
			clubGoalDistance: 3988.9,
			currentDistance: 0,
			clubGoalTime: 128,
			currentTime: 0,
			officeHeadCount: 307,
			activeAthletes: 0,
		},
		Poland: {
			clubGoalDistance: 1693.8,
			currentDistance: 0,
			clubGoalTime: 190,
			currentTime: 0,
			officeHeadCount: 109,
			activeAthletes: 0,
		},
		Oslo: {
			clubGoalDistance: 1967.4,
			currentDistance: 0,
			clubGoalTime: 128,
			currentTime: 0,
			officeHeadCount: 174,
			activeAthletes: 0,
		},
		USA: {
			clubGoalDistance: 1116.5,
			currentDistance: 0,
			clubGoalTime: 218,
			currentTime: 0,
			officeHeadCount: 72,
			activeAthletes: 0,
		},
		APAC: {
			clubGoalDistance: 1843.2,
			currentDistance: 0,
			clubGoalTime: 105,
			currentTime: 0,
			officeHeadCount: 212,
			activeAthletes: 0,
		},
		Europe: {
			clubGoalDistance: 1446.4,
			currentDistance: 0,
			clubGoalTime: 85,
			currentTime: 0,
			officeHeadCount: 124,
			activeAthletes: 0,
		},
		Trondheim: {
			clubGoalDistance: 5190.5,
			currentDistance: 0,
			clubGoalTime: 103,
			currentTime: 0,
			officeHeadCount: 407,
			activeAthletes: 0,
		},
		Omega: {
			clubGoalDistance: 5955.3,
			currentDistance: 0,
			clubGoalTime: 77,
			currentTime: 0,
			officeHeadCount: 500,
			activeAthletes: 0,
		},
	}
	const [exp, setExp] = useState<number>()
	const [timestreamData, setTimestreamData] = useState<Summary>()
	const [selectedTeam, setSelectedTeam] = useState<{
		value: string
		label: string
	}>({
		value: 'Trondheim',
		label: 'Trondheim',
	})

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
	for (const week of timestreamData.weeks) {
		for (const team of week.teamInformation) {
			distanceRecord[team.teamName].currentDistance += team.distance
			distanceRecord[team.teamName].currentTime += team.minutesPerAthlete
		}
	}
	const teams = Object.keys(distanceRecord)
	console.log(teams)
	console.log(timestreamData)

	for (const team of teams) {
		console.log(team)
		distanceRecord[team].activeAthletes =
			timestreamData.overall.teamInfo[team].memberCount
	}

	const options = [
		{ value: 'Trondheim', label: 'Trondheim' },
		{ value: 'Omega', label: 'Omega' },
		{ value: 'Finland', label: 'Finland' },
		{ value: 'APAC', label: 'APAC' },
		{ value: 'Oslo', label: 'Oslo' },
		{ value: 'USA', label: 'USA' },
		{ value: 'Europe', label: 'Europe' },
		{ value: 'Poland', label: 'Poland' },
	]
	const handleChange = (selectedOption: any) => {
		setSelectedTeam(selectedOption)
		console.log(`Option selected:`, selectedOption)
	}

	return (
		<Main>
			<Select
				options={options}
				onChange={handleChange}
				placeholder="Trondheim"
			/>
			<br></br>
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
							value={Math.round(
								(distanceRecord[selectedTeam.value].currentDistance /
									distanceRecord[selectedTeam.value].clubGoalDistance) *
									100,
							)}
							text={`${Math.round(
								(distanceRecord[selectedTeam.value].currentDistance /
									distanceRecord[selectedTeam.value].clubGoalDistance) *
									100,
							)}%`}
							styles={buildStyles({
								rotation: 0,
								strokeLinecap: 'butt',
								textSize: '16px',
								pathTransitionDuration: 0.5,
								pathColor: `rgba(62, 152, 199)`,
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
						Statistics
					</h1>
					<table className="HoursTable">
						<thead>
							<tr>
								<th style={{ padding: '2px 10px' }}>Name</th>
								<th style={{ padding: '2px 10px' }}>Value</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={{ padding: '2px 10px' }} key={'distance'}>
									{'Distance'}
								</td>
								<td
									style={{ padding: '2px 10px', textAlign: 'right' }}
									key={distanceRecord[selectedTeam.value].currentTime}
								>
									{Math.round(
										distanceRecord[selectedTeam.value].currentDistance,
									)}
								</td>
							</tr>
							<tr>
								<td style={{ padding: '2px 10px' }} key={'time'}>
									{'Time'}
								</td>
								<td
									style={{ padding: '2px 10px', textAlign: 'right' }}
									key={distanceRecord[selectedTeam.value].currentTime}
								>
									{Math.round(distanceRecord[selectedTeam.value].currentTime)}
								</td>
							</tr>
							<tr>
								<td style={{ padding: '2px 10px' }} key={'activeAthletes'}>
									{'Active athletes'}
								</td>
								<td
									style={{ padding: '2px 10px', textAlign: 'right' }}
									key={distanceRecord[selectedTeam.value].activeAthletes}
								>
									{Math.round(
										distanceRecord[selectedTeam.value].activeAthletes,
									)}
								</td>
							</tr>
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
							Club distance goal is{' '}
							{distanceRecord[selectedTeam.value].clubGoalDistance?.toFixed(1)}
							km,
							<br></br>
							you're now at{' '}
							{distanceRecord[selectedTeam.value].currentDistance?.toFixed(1)}
							km.
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
						<i>
							The values listed above are the <br></br>
							current values for your club.{' '}
						</i>
					</p>
				</div>
			</div>
			<br></br>
			<br></br>
			<br></br>
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
					<h1>Time goal</h1>
					<div className="ProgressBar">
						<CircularProgressbar
							value={Math.round(
								(distanceRecord[selectedTeam.value].currentTime /
									distanceRecord[selectedTeam.value].clubGoalTime) *
									100,
							)}
							text={`${Math.round(
								(distanceRecord[selectedTeam.value].currentTime /
									distanceRecord[selectedTeam.value].clubGoalTime) *
									100,
							)}%`}
							styles={buildStyles({
								rotation: 0,
								strokeLinecap: 'butt',
								textSize: '16px',
								pathTransitionDuration: 0.5,
								pathColor: `rgba(208, 223, 0)`,
								textColor: '#f88',
								trailColor: '#d6d6d6',
								backgroundColor: '#3e98c7',
							})}
						/>
					</div>
				</div>
				<div>
					<div
						className="progdiv"
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<h1
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
							}}
						>
							Athletes
						</h1>
						<div className="ProgressBar">
							<CircularProgressbar
								value={Math.round(
									(distanceRecord[selectedTeam.value].activeAthletes /
										distanceRecord[selectedTeam.value].officeHeadCount) *
										100,
								)}
								text={`${Math.round(
									(distanceRecord[selectedTeam.value].activeAthletes /
										distanceRecord[selectedTeam.value].officeHeadCount) *
										100,
								)}%`}
								styles={buildStyles({
									rotation: 0,
									strokeLinecap: 'butt',
									textSize: '16px',
									pathTransitionDuration: 0.5,
									pathColor: `rgba(245, 130, 32)`,
									textColor: '#f88',
									trailColor: '#d6d6d6',
									backgroundColor: '#3e98c7',
								})}
							/>
						</div>
					</div>
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
							Club time goal is{' '}
							{distanceRecord[selectedTeam.value].clubGoalTime?.toFixed(0)}
							min ,<br></br>
							you're now at{' '}
							{distanceRecord[selectedTeam.value].currentTime?.toFixed(0)}
							min.
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
						<i>
							Your club has {distanceRecord[selectedTeam.value].activeAthletes}{' '}
							active athletes,
							<br></br>out of{' '}
							{distanceRecord[selectedTeam.value].officeHeadCount} possible.
						</i>
					</p>
				</div>
			</div>
		</Main>
	)
}
