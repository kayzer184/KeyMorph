import {
	createRouter,
	createRoute,
	createRootRoute,
} from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { platform } from '@tauri-apps/plugin-os'
import { invoke } from '@tauri-apps/api/core'
import { Menu } from './components/Menu'
import Settings from './components/Settings'
import Overlay from './components/Overlay'
import { AppLayout } from './components/App'

export const router = (() => {
	const rootRoute = createRootRoute({
		component: () => {
			const [os, setOs] = useState<string>()
			const [theme, setTheme] = useState<string>('auto')

			useEffect(() => {
				async function init() {
					setOs(await platform())
          setTheme(await invoke('plugin:theme|get_theme'))
				}
				init()
			}, [])

			return <AppLayout os={os} theme={theme} setTheme={setTheme} />
		},
	})

	const routes = {
		main: createRoute({
			getParentRoute: () => rootRoute,
			path: '/',
			component: Menu,
		}),
		overlay: createRoute({
			getParentRoute: () => rootRoute,
			path: '/overlay',
			component: Overlay,
		}),
		settings: createRoute({
			getParentRoute: () => rootRoute,
			path: '/settings',
			component: Settings,
		}),
	}

	return createRouter({
		routeTree: rootRoute.addChildren([
			routes.main,
			routes.overlay,
			routes.settings,
		]),
	})
})()
