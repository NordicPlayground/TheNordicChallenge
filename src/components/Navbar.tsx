import {
	AwardIcon,
	GameIcon,
	IconWithText,
	InfoIcon,
} from 'components/FeatherIcon'
import styles from 'components/Navbar.module.css'
import { useAppConfig } from 'hooks/useAppConfig'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo-with-text.svg'

export const Navbar = () => {
	const {
		manifest: { backgroundColor, shortName, name },
	} = useAppConfig()
	const [navbarOpen, setNavbarOpen] = useState<boolean>(false)

	const close = () => {
		setNavbarOpen(false)
	}

	return (
		<header>
			<nav
				className="navbar navbar-expand-lg navbar-dark"
				style={{
					backgroundColor,
				}}
			>
				<div className="container-fluid">
					<Link className="navbar-brand d-flex align-items-center" to="/">
						<img
							src={logo}
							alt={name}
							width="100"
							height="24"
							className="d-inline-block align-text-top me-1"
						/>
						<span className={styles.assetName}>{shortName}</span>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						aria-controls="navbar"
						aria-expanded={navbarOpen}
						aria-label="Toggle navigation"
						onClick={() => {
							setNavbarOpen((open) => !open)
						}}
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className={`navbar-collapse ${navbarOpen ? '' : 'collapse'}`}
						id="navbar"
					>
						<div className="d-flex justify-content-between align-items-center">
							<ul className="navbar-nav me-4">
								<li className="nav-item">
									<Link className="nav-link" to="/strava" onClick={close}>
										<IconWithText>
											<GameIcon /> Strava
										</IconWithText>
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/about" onClick={close}>
										<IconWithText>
											<InfoIcon /> About
										</IconWithText>
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/clubgoals" onClick={close}>
										<IconWithText>
											<AwardIcon /> Club Goals
										</IconWithText>
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/weeklysummaries"
										onClick={close}
									>
										<IconWithText>
											<AwardIcon /> Weekly Summaries
										</IconWithText>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<img
						src={'/api_logo_pwrdBy_strava_stack_white.svg'}
						alt={'name'}
						width="100"
						height="34"
						className="d-inline-block align-text-top me-1"
					/>
				</div>
			</nav>
		</header>
	)
}
