import { invoke } from '@tauri-apps/api/core'
import { useState, useEffect } from 'react'
import { listen } from '@tauri-apps/api/event'
import { Keyboard } from './ui/keyboard'
import { layouts, type Key } from '@/lib/keyboard'

export default function Menu() {
	const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({})
	const layout = layouts['60']

	useEffect(() => {
		console.log('Setting up event listener')

		const unlisten = listen('key-event', event => {
			console.log('Raw event received:', event)
			const data = JSON.parse(event.payload as string)
			console.log('Parsed data:', data)

			const findKey = (keys: Key[][]): Key | undefined => {
				const found = keys.flat().find(k => k.keyCode === data.keyCode)
				console.log('Found key:', found)
				return found
			}

			const key = findKey(layout.keys)
			if (key) {
				setPressedKeys(prev => {
					const next = {
						...prev,
						[key.name]: data.isPressed,
					}
					console.log('New state:', next)
					return next
				})
			}
		})

		console.log('Starting background process')
		invoke('start_background')
			.then(() => console.log('Background process started'))
			.catch(e => console.error('Failed to start background:', e))

		return () => {
			console.log('Cleaning up')
			unlisten.then(fn => fn())
		}
	}, [])

	const handleKeyClick = (key: Key) => {
		setPressedKeys(prev => ({
			...prev,
			[key.name]: !prev[key.name],
		}))
	}

	return (
		<div className='container'>
			<Keyboard
				layout={layout.keys}
				pressedKeys={pressedKeys}
				onKeyClick={handleKeyClick}
			/>
		</div>
	)
}
