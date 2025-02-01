import { useState, useEffect } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { Window } from '@tauri-apps/api/window'
import './TitleBar.scss'

export default function TitleBar() {
	const [isMaximized, setIsMaximized] = useState<boolean>()
	const [appWindow, setAppWindow] = useState<Window>()

	useEffect(() => {
		async function init() {
			const window = getCurrentWindow()
			setAppWindow(window)
			setIsMaximized(await window.isMaximized())

			const unlistenMaximized = await window.onResized(async () => {
				setIsMaximized(await window.isMaximized())
			})

			return () => {
				unlistenMaximized()
			}
		}
		init()
	}, [])

	return (
		<div className='title-bar'>
			<button
				type='button'
				aria-label='Minimize'
				onClick={() => appWindow?.minimize()}
			>
				<svg width='12' height='12' viewBox='0 0 12 12'>
					<rect width='10' height='1' x='1' y='6' fill='currentColor' />
				</svg>
			</button>
			<button
				type='button'
				aria-label='Toggle maximize'
				onClick={() => {
					appWindow?.toggleMaximize()
					setIsMaximized(!isMaximized)
				}}
			>
				{isMaximized ? (
					<svg width='24' height='24' viewBox='0 0 12 12'>
						<rect
							x='4'
							y='4'
							width='4'
							height='4'
							fill='none'
							stroke='currentColor'
							strokeWidth='0.5'
						/>
						<rect
							x='3'
							y='5'
							width='4'
							height='4'
							fill='var(--title-bar-bg, transparent)'
							stroke='currentColor'
							strokeWidth='0.5'
						/>
					</svg>
				) : (
					<svg width='12' height='12' viewBox='0 0 12 12'>
						<rect
							x='2'
							y='2'
							width='8'
							height='8'
							fill='none'
							stroke='currentColor'
							strokeWidth='1'
						/>
					</svg>
				)}
			</button>
			<button
				type='button'
				aria-label='Close'
				onClick={() => appWindow?.close()}
			>
				<svg width='12' height='12' viewBox='0 0 12 12'>
					<path
						fill='currentColor'
						d='M10.5,3.205L9.795,2.5L6.5,5.795L3.205,2.5L2.5,3.205L5.795,6.5L2.5,9.795L3.205,10.5L6.5,7.205L9.795,10.5L10.5,9.795L7.205,6.5L10.5,3.205z'
					/>
				</svg>
			</button>
		</div>
	)
}
