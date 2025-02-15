import { Button } from '@/components/ui/button'
import { Keyboard, Layers, Settings } from 'lucide-react'
import { Link, useLocation } from '@tanstack/react-router'

export function Sidebar() {
	const location = useLocation()

	return (
		<div className='w-[220px] h-full flex-none bg-background border-r p-4'>
			<h2 className='text-xl font-bold mb-4 text-center text-foreground'>
				KeyMorph
			</h2>
			<nav className='space-y-1'>
				<Link to='/'>
					<Button
						variant={location.pathname === '/' ? 'default' : 'ghost'}
						className='w-full justify-start'
					>
						<Keyboard className='mr-2 h-4 w-4' /> Main
					</Button>
				</Link>
				<Link to='/overlay'>
					<Button
						variant={location.pathname === '/overlay' ? 'default' : 'ghost'}
						className='w-full justify-start'
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
