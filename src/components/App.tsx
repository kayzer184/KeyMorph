import { invoke } from '@tauri-apps/api/core'
import { platform } from '@tauri-apps/plugin-os'
import { useState, useEffect } from 'react'
import TitleBar from './UI/TitleBar'
import KeyBoard from './UI/KeyBoard'
import '../styles/App.scss'

function App() {
	const [theme, setTheme] = useState<string>()
	const [os, setOs] = useState<string>()

	useEffect(() => {
		async function init() {
			setTheme(await invoke('plugin:theme|get_theme'))
			setOs(await platform())
		}
		init()
	}, [])

	useEffect(() => {
		if (theme) {
			invoke('plugin:theme|set_theme', { theme })

			const updateTheme = () => {
				document.documentElement.setAttribute(
					'data-theme',
					theme === 'auto'
						? window.matchMedia('(prefers-color-scheme: dark)').matches
							? 'dark'
							: 'light'
						: theme
				)
			}

			updateTheme()

			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
			mediaQuery.addEventListener('change', updateTheme)

			return () => mediaQuery.removeEventListener('change', updateTheme)
		}
	}, [theme])

	return (
		<>
			{os === 'windows' && <TitleBar />}
			<main
				className='container'
			>
				<div className='main-container'>
					<p>Theme: {theme}</p>
					<button onClick={() => setTheme('auto')}>Set auto theme</button>
					<button onClick={() => setTheme('light')}>Set light theme</button>
					<button onClick={() => setTheme('dark')}>Set dark theme</button>
					<KeyBoard />
				</div>
			</main>
		</>
	)
}

export default App
