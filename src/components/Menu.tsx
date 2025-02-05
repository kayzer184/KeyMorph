import { invoke } from '@tauri-apps/api/core'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { listen } from '@tauri-apps/api/event'

interface KeyProps {
	letter: string
	width?: string
	isPressed?: boolean
	onPress?: () => void
}

const Key = ({ letter, width = 'w-12', isPressed, onPress }: KeyProps) => {
	return (
		<motion.div
			animate={{
				scale: isPressed ? 0.9 : 1,
				backgroundColor: isPressed ? 'var(--primary)' : 'var(--card)',
				color: isPressed ? 'var(--primary-foreground)' : 'var(--foreground)',
				y: isPressed ? 4 : 0,
			}}
			transition={{
				duration: 0.1,
				type: 'spring',
				stiffness: 500,
				damping: 30,
			}}
			whileHover={{ scale: 1.05 }}
			className={`
				${width} 
				h-12 
				rounded-lg 
				border 
				border-border 
				flex 
				items-center 
				justify-center 
				cursor-pointer
				shadow-lg
			`}
			onClick={onPress}
		>
			{letter}
		</motion.div>
	)
}

// Маппинги для разных типов идентификации клавиш
const keyMappings: {
	scanCode: { [key: number]: string }
	keyCode: { [key: number]: string }
	char: { [key: string]: string }
} = {
	scanCode: {
		14: 'Backspace',
		15: 'Tab',
		56: 'LAlt',
		29: 'LCtrl',
		42: 'LShift',
		54: 'RShift',
		157: 'RCtrl',
		184: 'RAlt',
		57: 'Space',
		28: 'Enter',
		// Буквы
		16: 'Q',
		17: 'W',
		18: 'E',
		19: 'R',
		20: 'T',
		21: 'Y',
		22: 'U',
		23: 'I',
		24: 'O',
		25: 'P',
		30: 'A',
		31: 'S',
		32: 'D',
		33: 'F',
		34: 'G',
		35: 'H',
		36: 'J',
		37: 'K',
		38: 'L',
		44: 'Z',
		45: 'X',
		46: 'C',
		47: 'V',
		48: 'B',
		49: 'N',
		50: 'M',
	},
	keyCode: {
		8: 'Backspace',
		9: 'Tab',
		18: 'LAlt',
		// ... остальные keyCodes
	},
	char: {
		'\b': 'Backspace',
		'\t': 'Tab',
		' ': 'Space',
		// ... остальные символы
	},
}

export function Menu() {
	const [pressedKeys, setPressedKeys] = useState<{ [key: string]: boolean }>({})
	const [selectedLayout, setSelectedLayout] = useState<'60' | '90' | '100'>(
		'60'
	)

	const layouts = {
		'60': [
			[
				'Esc',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'0',
				'-',
				'=',
				'Backspace',
			],
			['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
			['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
			['LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RShift'],
			['LCtrl', 'Win', 'LAlt', 'Space', 'RAlt', 'Fn', 'RCtrl'],
		],
		'90': [
			[
				'Esc',
				'F1',
				'F2',
				'F3',
				'F4',
				'F5',
				'F6',
				'F7',
				'F8',
				'F9',
				'F10',
				'F11',
				'F12',
			],
			[
				'`',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'0',
				'-',
				'=',
				'Backspace',
				'Insert',
				'Home',
				'PgUp',
			],
			[
				'Tab',
				'Q',
				'W',
				'E',
				'R',
				'T',
				'Y',
				'U',
				'I',
				'O',
				'P',
				'[',
				']',
				'\\',
				'Delete',
				'End',
				'PgDn',
			],
			['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
			['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', '↑'],
			['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Ctrl', '←', '↓', '→'],
		],
		'100': [
			[
				'Esc',
				'F1',
				'F2',
				'F3',
				'F4',
				'F5',
				'F6',
				'F7',
				'F8',
				'F9',
				'F10',
				'F11',
				'F12',
				'PrtSc',
				'ScrLk',
				'Pause',
			],
			[
				'`',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'0',
				'-',
				'=',
				'Backspace',
				'Insert',
				'Home',
				'PgUp',
				'NumLk',
				'/',
				'*',
				'-',
			],
			[
				'Tab',
				'Q',
				'W',
				'E',
				'R',
				'T',
				'Y',
				'U',
				'I',
				'O',
				'P',
				'[',
				']',
				'\\',
				'Delete',
				'End',
				'PgDn',
				'7',
				'8',
				'9',
				'+',
			],
			[
				'Caps',
				'A',
				'S',
				'D',
				'F',
				'G',
				'H',
				'J',
				'K',
				'L',
				';',
				"'",
				'Enter',
				'4',
				'5',
				'6',
			],
			[
				'Shift',
				'Z',
				'X',
				'C',
				'V',
				'B',
				'N',
				'M',
				',',
				'.',
				'/',
				'Shift',
				'↑',
				'1',
				'2',
				'3',
				'Enter',
			],
			[
				'Ctrl',
				'Win',
				'Alt',
				'Space',
				'Alt',
				'Fn',
				'Ctrl',
				'←',
				'↓',
				'→',
				'0',
				'.',
			],
		],
	}

	useEffect(() => {
		const unlisten = listen('key-event', event => {
			const data = JSON.parse(event.payload as string)

			// Пробуем найти клавишу по всем доступным идентификаторам
			let keyName = null

			if (data.char) {
				keyName = keyMappings.char[data.char]
			}

			if (!keyName && data.keyCode) {
				keyName = keyMappings.keyCode[data.keyCode]
			}

			if (!keyName && data.scanCode) {
				keyName = keyMappings.scanCode[data.scanCode]
			}

			if (keyName) {
				setPressedKeys(prev => ({
					...prev,
					[keyName]: data.isPressed,
				}))
			}
		})

		invoke('start_background')
			.then(() => console.log('Background process started'))
			.catch(e => console.error('Failed to start background process:', e))

		return () => {
			invoke('stop_background')
				.then(() => console.log('Background process stopped'))
				.catch(e => console.error('Failed to stop background process:', e))
			unlisten.then(fn => fn())
		}
	}, [])

	const handleKeyClick = (key: string) => {
		console.log('Key clicked:', key) // для отладки
		setPressedKeys(prev => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	return (
		<div className='h-full overflow-y-auto p-8'>
			<div className='mb-4 flex gap-4 justify-center'>
				<button
					className={`px-4 py-2 rounded ${
						selectedLayout === '60'
							? 'bg-primary text-primary-foreground'
							: 'bg-card'
					}`}
					onClick={() => setSelectedLayout('60')}
				>
					60%
				</button>
				<button
					className={`px-4 py-2 rounded ${
						selectedLayout === '90'
							? 'bg-primary text-primary-foreground'
							: 'bg-card'
					}`}
					onClick={() => setSelectedLayout('90')}
				>
					90%
				</button>
				<button
					className={`px-4 py-2 rounded ${
						selectedLayout === '100'
							? 'bg-primary text-primary-foreground'
							: 'bg-card'
					}`}
					onClick={() => setSelectedLayout('100')}
				>
					100%
				</button>
			</div>
			<div className='flex flex-col gap-2 items-center'>
				{layouts[selectedLayout].map((row, i) => (
					<div key={i} className='flex gap-2'>
						{row.map(key => {
							let width = 'w-12'
							if (key === 'Space') width = 'w-64'
							if (
								[
									'Backspace',
									'Enter',
									'LShift',
									'RShift',
									'Tab',
									'Caps',
								].includes(key)
							)
								width = 'w-20'

							return (
								<Key
									key={`${key}-${i}`}
									letter={key}
									width={width}
									isPressed={pressedKeys[key] || false}
									onPress={() => handleKeyClick(key)}
								/>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}

export default Menu
