import { Main } from 'components/Main'

export const About = () => {
	return (
		<Main>
			<div className="card">
				<div className="card-header">About</div>
				<div className="card-body">
					<p>
						Each week the points for each club will be added up and then divided
						by the size of the office/location headcount. By doing it this way
						we make sure every activity counts positively against the challenge,
						no matter how short.
					</p>
					<p>
						In general activities will give a 1 km = 1 point ratio in the
						statistics, but we have some adjustments as described in this
						section.
					</p>
					<p>
						As biking/skiing is more efficient in km than running/walking, we
						will be using a ratio for this, and for each 3km cycled = 1 points.{' '}
					</p>
					<p>
						This ratio counts for the following activities: <b>Ride</b>,{' '}
						<b>Virtual Bike</b>, <b>Roller Ski</b>,<b> Nordic Ski</b>,{' '}
						<b>BackCountry Ski</b>, <b>Gravel Ride</b> and{' '}
						<b>Mountain Bike Ride</b>.
					</p>
					For the same reason, 1km of <b>swimming</b> equals 4 points.
					<p>
						<b> E-Bike Ride </b> has a 5 km = 1 points ratio.
					</p>
					<p>
						<b> Snowboard </b>
						and <b>Alpine Ski</b> is given 0 distance but will give points as an{' '}
						<b>activity without distance</b> as described below.
					</p>
					<p>
						<b>Activities without distance</b>; like <b>Yoga</b>,{' '}
						<b>WeightTraining</b> etc are given points based on time. The
						following formula shows how this is done:
					</p>
					<p>
						<b> Time [hours] * 5 points</b>
					</p>
					<p>
						This means that 1 hour of activity without distance is equivalent to
						5 points. 30 min of activity gives 2.5 points and so on.
					</p>
				</div>
			</div>
			<div className="card mt-4">
				<div className="card-header">Privacy Settings</div>
				<div className="card-body">
					<p>Strava has three different privacy options: </p>
					<ul>
						<li>Everyone</li>
						<li>Followers</li>
						<li>Only you</li>
					</ul>
					<p>
						If you have the "Everyone" option your statistics will be included.
						If you have the "Followers" option, you need to follow Strava Lena
						in your local club, and let her follow you back to be included in
						the statistics. The "Only you" option will not be part of the club
						statistics.
						<strong>Muted activites are not included in the statistics.</strong>
					</p>
				</div>
			</div>
			<div className="card mt-4">
				<div className="card-header">Rules</div>
				<div className="card-body">
					<dl>
						<ul>
							<li>The challenge starts May 6th and ends June 2nd.</li>
							<li>
								You need a user account on Strava to participate{' '}
								<a href="https://www.strava.com">www.strava.com</a>
							</li>
							<li>You need to join your local club on Strava to participate</li>
							<li>
								All activities need to be logged either manually or through a
								sports watch on Strava
							</li>
							<li>If it is not on Strava, it did not happen</li>
							<li>Cheating is not allowed</li>
							<li>
								Participating is voluntary, but by joining the club you accept
								that your results are a part of the competition, and data will
								be shared with Omega to be presented as a part of the
								accumulated total
							</li>
							<li>
								You are responsible for your personal settings on the app and
								what you decide to share with others
							</li>
							<li>
								The leaderboard site registers all activities in the club, even
								though not all your activities, such as hikes, will show on the
								leaderboard in your club.
							</li>
							<li>
								Remember to check your privacy settings, if they are not open
								your activities will not count. If you are unsure whether your
								activities register, follow Strava Lena in your Strava club
								(this will fix it most times). Muted activities does not count
								it looks like. If you have privacy setting set to “everyone”
								everything will count. If you do not want to have that, you can
								set it to “follower”, but then you have to follow Strava Lena
								and let her follow you back.
							</li>
							<li>
								If you do not know Strava, ask a colleague or do a quick search,
								as there are plenty of videos available on how to use it – and
								it is fairly simple😊
							</li>
							<li>
								Rules may change as we learn to make it fair, please forgive us
							</li>
						</ul>
					</dl>
				</div>
			</div>
		</Main>
	)
}
