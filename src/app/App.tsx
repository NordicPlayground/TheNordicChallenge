import { About } from 'app/pages/About'
import { ClubGoals } from 'app/pages/Clubgoals'
import { Strava } from 'app/pages/Strava'
import { WeeklySummaries } from 'app/pages/WeeklySummaries'
import { Navbar } from 'components/Navbar'
import { RedirectFrom404 } from 'components/RedirectFrom404'
import { useAppConfig } from 'hooks/useAppConfig'
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom'

export const App = () => {
	const { basename } = useAppConfig()

	return (
		<Router basename={(basename ?? '').replace(/\/$/g, '')}>
			<Navbar />
			<Routes>
				<Route index element={<Navigate to="/strava" />} />
				<Route path="/strava" element={<Strava />} />
				<Route path="/about" element={<About />} />
				<Route path="/clubgoals" element={<ClubGoals />} />
				<Route path="/weeklysummaries" element={<WeeklySummaries />} />
			</Routes>
			<RedirectFrom404 />
		</Router>
	)
}
