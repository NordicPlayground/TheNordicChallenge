import { About } from 'app/pages/About'
import { Strava } from 'app/pages/Strava'
import { Navbar } from 'components/Navbar'
import { useAppConfig } from 'hooks/useAppConfig'
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom'
import { ClubGoals } from './pages/Clubgoals'

export const App = () => {
	const { basename } = useAppConfig()

	return (
		<Router basename={basename}>
			<Navbar />
			<Routes>
				<Route index element={<Navigate to="/strava" />} />
				<Route path="/strava" element={<Strava />} />
				<Route path="/about" element={<About />} />
				<Route path="/clubgoals" element={<ClubGoals />} />
			</Routes>
		</Router>
	)
}
