import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Overlay() {
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
							<label className='text-sm font-medium'>Позиция X</label>
							<Input type='number' placeholder='0' />
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Позиция Y</label>
							<Input type='number' placeholder='0' />
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Размер шрифта</label>
							<Input type='number' placeholder='16' />
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-medium'>Прозрачность</label>
							<Input type='number' placeholder='100' min='0' max='100' />
						</div>

						<div className='flex justify-end gap-2'>
							<Button variant='outline'>Сбросить</Button>
							<Button>Применить</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
