import { useEffect, createContext, type ReactNode } from 'react'
import { RouterProvider, Outlet } from '@tanstack/react-router'
import { invoke } from '@tauri-apps/api/core'
import { router } from '../router'
import TitleBar from './TitleBar'
import { Sidebar } from './SideBar'

interface ThemeContextType {
	theme?: string
	setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
	setTheme: () => {},
})

interface AppLayoutProps {
	os?: string
	theme?: string
	setTheme: (theme: string) => void
	children?: ReactNode
}

export const AppLayout = ({ theme, setTheme }: AppLayoutProps) => {
	useEffect(() => {
		document
			.querySelectorAll('*')
			.forEach(el => el.setAttribute('tabindex', '-1'))
	}, [])

	useEffect(() => {
		if (!theme) return

		const updateTheme = async () => {
			await invoke('plugin:theme|set_theme', { theme })

			document.documentElement.className =
				theme === 'auto'
					? window.matchMedia('(prefers-color-scheme: dark)').matches
						? 'dark'
						: 'light'
					: theme
		}

		updateTheme()

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		mediaQuery.addEventListener('change', updateTheme)
		return () => mediaQuery.removeEventListener('change', updateTheme)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<div className='grid h-screen grid-rows-[32px_1fr]'>
				<TitleBar />
				<div className='flex h-full overflow-hidden'>
					<Sidebar className='h-full' />
					<main className='flex-1 p-12'>
						<Outlet />
					</main>
				</div>
			</div>
		</ThemeContext.Provider>
	)
}

function App() {
	return <RouterProvider router={router} />
}

export default App
