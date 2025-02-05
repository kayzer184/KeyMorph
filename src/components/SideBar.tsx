import { Button } from '@/components/ui/button'
import { Keyboard, Layers, Settings } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'

export function Sidebar({ className = '' }: { className?: string }) {
	const location = useLocation()

	return (
		<div className={`w-64 bg-card border-r p-4 ${className}`}>
			<h2 className='text-xl font-bold mb-4 text-center text-foreground'>
				KeyMorph
			</h2>
			<nav>
				<Link to='/'>
					<Button
						variant={location.pathname === '/' ? 'default' : 'ghost'}
						className='w-full justify-start mb-2'
					>
						<Keyboard className='mr-2 h-4 w-4' /> Main
					</Button>
				</Link>
				<Link to='/overlay'>
					<Button
						variant={location.pathname === '/overlay' ? 'default' : 'ghost'}
						className='w-full justify-start mb-2'
					>
						<Layers className='mr-2 h-4 w-4' /> Overlay
					</Button>
				</Link>
				<Link to='/settings'>
					<Button
						variant={location.pathname === '/settings' ? 'default' : 'ghost'}
						className='w-full justify-start'
					>
						<Settings className='mr-2 h-4 w-4' /> Settings
					</Button>
				</Link>
			</nav>
		</div>
	)
}

export default Sidebar
