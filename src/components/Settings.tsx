import { useContext } from 'react'
import { ThemeContext } from './App'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react'

export default function Settings() {
	const { theme, setTheme } = useContext(ThemeContext)

	return (
		<div className='h-full overflow-y-auto'>
			<div className='space-y-6'>
				<h1 className='text-3xl font-bold'>Настройки</h1>

				<Card>
					<CardHeader>
						<CardTitle>Общие настройки</CardTitle>
					</CardHeader>
					<div className='p-6 space-y-4'>
						<div className='space-y-2'>
							<label className='text-sm font-medium'>
								Путь к файлу конфигурации
							</label>
							<div className='flex gap-2'>
								<Input placeholder='Выберите файл конфигурации...' />
								<Button variant='secondary'>Обзор</Button>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Язык</label>
							<Input placeholder='Русский' />
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Тема</label>
							<div className='flex gap-2'>
								<Button
									variant='outline'
									size='icon'
									onClick={() => setTheme('light')}
									className={theme === 'light' ? 'bg-accent' : ''}
								>
									<IconSun className='h-5 w-5' />
								</Button>
								<Button
									variant='outline'
									size='icon'
									onClick={() => setTheme('dark')}
									className={theme === 'dark' ? 'bg-accent' : ''}
								>
									<IconMoon className='h-5 w-5' />
								</Button>
								<Button
									variant='outline'
									size='icon'
									onClick={() => setTheme('auto')}
									className={theme === 'auto' ? 'bg-accent' : ''}
								>
									<IconDeviceDesktop className='h-5 w-5' />
								</Button>
							</div>
						</div>
					</div>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Настройки клавиатуры</CardTitle>
					</CardHeader>
					<div className='p-6 space-y-4'>
						<div className='space-y-2'>
							<label className='text-sm font-medium'>
								Задержка клавиш (мс)
							</label>
							<Input type='number' placeholder='200' />
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>
								Скорость повтора (мс)
							</label>
							<Input type='number' placeholder='20' />
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
