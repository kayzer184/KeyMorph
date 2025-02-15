import { useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { invoke } from '@tauri-apps/api/core'


export default function Overlay() {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')
	return (
		<div className='h-full overflow-y-auto'>
			<div className='space-y-6'>
				<h1 className='text-3xl font-bold'>Оверлей</h1>

				<Card>
					<CardHeader>
						<CardTitle>Настройки оверлея</CardTitle>
					</CardHeader>
					<div className='p-6 space-y-4'>
						<div className='space-y-2'>
							<label className='text-sm font-medium'>Тема оверлея</label>
							<div className='flex gap-2'>
								<Button
									variant='outline'
									size='icon'
									onClick={() => {
										setTheme('light')
										document.documentElement.className = 'light'
									}}
									className={theme === 'light' ? 'bg-accent' : ''}
								>
									<IconSun className='h-5 w-5' />
								</Button>
								<Button
									variant='outline'
									size='icon'
									onClick={() => {
										setTheme('dark')
										document.documentElement.className = 'dark'
									}}
									className={theme === 'dark' ? 'bg-accent' : ''}
								>
									<IconMoon className='h-5 w-5' />
								</Button>
							</div>
						</div>

						<div className='flex justify-end gap-2'>
							<Button variant='outline'>Сбросить</Button>
							<Button onClick={() => invoke('overlay_run')}>Запустить</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
