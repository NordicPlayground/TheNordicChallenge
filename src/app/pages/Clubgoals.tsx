import { Main } from 'components/Main'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

export const ClubGoals = () => {
    /*
	const clubGoalFinland = 3637.2
	const clubGoalPoland = 943.7
	const clubGoalOslo = 1799.5
	const clubGoalUSA = 492.3
	const clubGoalAPAC = 991.6
	const clubGoalEurope = 816
	const clubGoalTrondheim = 2029.8
	const clubGoalOmega = 3391.7
    */
	return (
		<Main>
			<div style={{ width: 400, height: 200 }}>
				<div style={{ width: 200, height: 200 }}>
					<CircularProgressbar
						value={40}
						text={`${40}%`}
						styles={buildStyles({
							rotation: 0,
							strokeLinecap: 'butt',
							textSize: '16px',
							pathTransitionDuration: 0.5,
							pathColor: `rgba(62, 152, 199, ${70 / 100})`,
							textColor: '#f88',
							trailColor: '#d6d6d6',
							backgroundColor: '#3e98c7',
						})}
					/>
				</div>
				<div style={{ width: 200, height: 200 }}>
					<CircularProgressbar
						value={40}
						text={`${40}%`}
						styles={buildStyles({
							rotation: 0,
							strokeLinecap: 'butt',
							textSize: '16px',
							pathTransitionDuration: 0.5,
							pathColor: `rgba(62, 152, 199, ${70 / 100})`,
							textColor: '#f88',
							trailColor: '#d6d6d6',
							backgroundColor: '#3e98c7',
						})}
					/>
				</div>
			</div>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={40}
					text={`${40}%`}
					styles={buildStyles({
						rotation: 0,
						strokeLinecap: 'butt',
						textSize: '16px',
						pathTransitionDuration: 0.5,
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={40}
					text={`${40}%`}
					styles={buildStyles({
						rotation: 0,
						strokeLinecap: 'butt',
						textSize: '16px',
						pathTransitionDuration: 0.5,
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={40}
					text={`${40}%`}
					styles={buildStyles({
						rotation: 0,
						strokeLinecap: 'butt',
						textSize: '16px',
						pathTransitionDuration: 0.5,
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={40}
					text={`${40}%`}
					styles={buildStyles({
						rotation: 0,
						strokeLinecap: 'butt',
						textSize: '16px',
						pathTransitionDuration: 0.5,
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={40}
					text={`${40}%`}
					styles={buildStyles({
						rotation: 0,
						strokeLinecap: 'butt',
						textSize: '16px',
						pathTransitionDuration: 0.5,
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					value={40}
					text={`${40}%`}
					styles={buildStyles({
						rotation: 0,
						strokeLinecap: 'butt',
						textSize: '16px',
						pathTransitionDuration: 0.5,
						pathColor: `rgba(62, 152, 199, ${70 / 100})`,
						textColor: '#f88',
						trailColor: '#d6d6d6',
						backgroundColor: '#3e98c7',
					})}
				/>
			</div>
		</Main>
	)
}
