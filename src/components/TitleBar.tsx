import { useContext, useState, useEffect } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import type { Window } from '@tauri-apps/api/window'
import { OSContext } from './App'

export default function TitleBar() {
	const os = useContext(OSContext)
	const [isMaximized, setIsMaximized] = useState<boolean>()
	const [appWindow, setAppWindow] = useState<Window>()

	useEffect(() => {
		async function init() {
			const window = getCurrentWindow()
			setAppWindow(window)
			setIsMaximized(await window.isMaximized())
		}
		init()
	}, [])

	return (
		<div
			className='bg-card border-b flex justify-end items-center select-none app-region-drag'
			data-tauri-drag-region
		>
			<div className='flex'>
				{os === 'windows' && (
					<>
						<button
							type='button'
							aria-label='Minimize'
							onClick={() => appWindow?.minimize()}
							className='h-8 w-12 flex items-center justify-center hover:bg-accent transition-colors app-region-no-drag cursor-default'
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
							className='h-8 w-12 flex items-center justify-center hover:bg-accent transition-colors app-region-no-drag cursor-default'
						>
							{isMaximized ? (
								<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
									<path d='M3 5v9h9V5H3zm8 8H4V6h7v7z' fill='currentColor' />
									<path d='M5 5h1V4h7v7h-1v1h2V3H5v2z' fill='currentColor' />
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
							className='h-8 w-12 flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors app-region-no-drag cursor-default'
						>
							<svg width='12' height='12' viewBox='0 0 12 12'>
								<path
									fill='currentColor'
									d='M10.5,3.205L9.795,2.5L6.5,5.795L3.205,2.5L2.5,3.205L5.795,6.5L2.5,9.795L3.205,10.5L6.5,7.205L9.795,10.5L10.5,9.795L7.205,6.5L10.5,3.205z'
								/>
							</svg>
						</button>
					</>
				)}
			</div>
		</div>
	)
}
