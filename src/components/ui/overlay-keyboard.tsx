import { cn } from '@/lib/utils'
import type { Key } from '@/lib/keyboard'
import { motion } from 'framer-motion'

interface KeyboardProps {
	layout: Key[][]
	pressedKeys: Record<string, boolean>
	onKeyClick: (key: Key) => void
}

export function Keyboard({ layout, pressedKeys, onKeyClick }: KeyboardProps) {
	return (
		<div className='h-screen w-screen flex flex-col gap-2 items-center justify-center'>
			{layout.map((row, rowIndex) => (
				<div key={`row-${rowIndex}`} className='flex gap-2'>
					{row.map(key => {
						const isPressed = pressedKeys[key.name]
						const width = key.width ? `w-${key.width * 12}` : 'w-12'

						return (
							<motion.div
								key={key.id || key.name}
								initial={{
									borderWidth: '1px',
									borderColor: 'var(--border)',
								}}
								animate={{
									scale: isPressed ? 0.9 : 1,
									backgroundColor: isPressed ? 'var(--primary)' : 'var(--card)',
									color: isPressed
										? 'var(--primary-foreground)'
										: 'var(--foreground)',
									y: isPressed ? 4 : 0,
									borderWidth: isPressed ? '2px' : '1px',
									borderColor: isPressed ? 'var(--primary)' : 'var(--border)',
									filter: isPressed ? 'brightness(1.05)' : 'brightness(1)',
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
									flex 
									items-center 
									justify-center 
									cursor-pointer
									shadow-lg
								`}
								onClick={() => onKeyClick(key)}
							>
								{key.name}
							</motion.div>
						)
					})}
				</div>
			))}
		</div>
	)
}
