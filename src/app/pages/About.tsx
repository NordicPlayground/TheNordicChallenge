import { Main } from 'components/Main'

export const About = () => {
	return (
		<Main>
			<div className="card">
				<div className="card-header">About</div>
				<div className="card-body">
					<p>
						Each week the kilometers for each club will be added up and then
						divided by the size of the office/location headcount.
					</p>
					<p>
						As biking/skiing is more efficient in km than running/walking, we
						will be using a ratio for this, and for each 3km cycled = 1km
						run/walk.{' '}
					</p>
					<p>
						This ratio counts for the following activities: <b>Ride</b>,{' '}
						<b>Virtual Bike</b>, <b>Roller Ski</b>,<b> Nordic Ski</b>,{' '}
						<b>BackCountry Ski</b> and <b>Mountain Bike Ride</b>.
					</p>
					For the same reason, 1km of <b>swimming</b> equals 4km of
					running/walking.
					<p>
						<b> E-Bike Ride </b> has a 5:1 km ratio.
					</p>
					<b> Snowboard </b>
					and <b>Alpine Ski</b> is given 0km in the statistics.
					<p>
						All time spent doing activities counts towards the statistics, and
						all activities not mentioned above will give a 1:1km ratio in the
						statistics.
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
						<strong> Muted activited is not included in the statistics.</strong>
					</p>
				</div>
			</div>
			<div className="card mt-4">
				<div className="card-header">Rules</div>
				<div className="card-body">
					<dl>
						<ul>
							<li>
								The challenge starts Semptember 19th and ends October 16th.
							</li>
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
