import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from 'react'
import { listen } from '@tauri-apps/api/event'
import { Keyboard } from './components/ui/overlay-keyboard'
import 'framer-motion'
import './styles.css'
import { layouts } from '@/lib/keyboard'
import type { Key } from '@/lib/keyboard'

export function OverlayApp() {
	const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({})
	const layout = layouts['60']

	useEffect(() => {
		const unlisten = listen('key-event', event => {
			const data = JSON.parse(event.payload as string)

			const findKey = (keys: Key[][]): Key | undefined => {
				return keys.flat().find(k => k.keyCode === data.keyCode)
			}

			const key = findKey(layout.keys)
			if (key) {
				setPressedKeys(prev => {
					if (prev[key.name] === data.isPressed) {
						return prev
					}

					return {
						...prev,
						[key.name]: data.isPressed,
					}
				})
			}
		})

		return () => {
			unlisten.then(fn => fn())
		}
	}, [])

	return (
		<div className='h-screen w-screen bg-transparent'>
			<Keyboard
				layout={layout.keys}
				pressedKeys={pressedKeys}
				onKeyClick={(key: Key) => {
					setPressedKeys(prev => ({
						...prev,
						[key.name]: !prev[key.name],
					}))
				}}
			/>
		</div>
	)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<OverlayApp />
	</React.StrictMode>
)
