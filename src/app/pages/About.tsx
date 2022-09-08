import { Main } from 'components/Main'

export const About = () => {
	return (
		<Main>
			<div className="card">
				<div className="card-header">About</div>
				<div className="card-body">
					<p>
						Each week the kilometers for each club will be added up and then
						divided by the size of the office/location headcount. The club with
						the highest average will be declared a winner by the competition
						committee. As biking is more efficient in km than running/walking,
						we will be using a ratio for cycling amount, and for each 3km cycled
						= 1km run/walk. For the same reason, 1km of swimming equals 4km of
						running/walking.
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
						If you have the "Followers" option, you need to follow Lena
						Haraldseid in your local club. The "Only you" option will not be
						part of the club statistics.
					</p>
				</div>
			</div>
			<div className="card mt-4">
				<div className="card-header">Rules</div>
				<div className="card-body">
					<dl>
						<ul>
							<li>The challenge starts ??? and ends ???.</li>
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
								Remember to check your privacy setting, if they are not open
								your activities will not count. If you are unsure whether your
								activities register, follow Lena Haraldseid in your Strava club
								(this will fix it most times).
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
