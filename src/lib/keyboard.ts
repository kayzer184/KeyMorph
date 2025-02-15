// Типы для отдельных клавиш
export interface Key {
	name: string
	keyCode: number
	scanCode?: number
	width?: number
	height?: number
	id?: string // Добавляем id для уникальной идентификации
}

export type KeyRow = Key[]

export interface KeyboardLayout {
	name: string
	keys: KeyRow[]
}

export enum KeySize {
	Default = 1,
	Wide = 1.5,
	Space = 6.25,
	Shift = 2.25,
	Enter = 2.25,
	Backspace = 2,
	Tab = 1.5,
	CapsLock = 1.75,
}

// Обновляем KeyCodes с числовыми значениями
export const KeyCodes = {
	// Буквы (65-90)
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,

	// Цифры (48-57)
	Digit0: 48,
	Digit1: 49,
	Digit2: 50,
	Digit3: 51,
	Digit4: 52,
	Digit5: 53,
	Digit6: 54,
	Digit7: 55,
	Digit8: 56,
	Digit9: 57,

	// Функциональные клавиши
	Enter: 13,
	Space: 32,
	Backspace: 8,
	Tab: 9,
	CapsLock: 20,
	ShiftLeft: 16,
	ShiftRight: 16,
	ControlLeft: 17,
	ControlRight: 17,
	AltLeft: 18,
	AltRight: 18,
	MetaLeft: 91, // Win key
	MetaRight: 92,
	Meta: 93, // Menu/Context key

	// Символы
	Backquote: 192, // `
	Minus: 189, // -
	Equal: 187, // =
	BracketLeft: 219, // [
	BracketRight: 221, // ]
	Backslash: 220, // \
	Semicolon: 186, // ;
	Quote: 222, // '
	Comma: 188, // ,
	Period: 190, // .
	Slash: 191, // /

	// Навигация
	Insert: 'Insert',
	Delete: 'Delete',
	Home: 'Home',
	End: 'End',
	PageUp: 'PageUp',
	PageDown: 'PageDown',
	ArrowUp: 'ArrowUp',
	ArrowDown: 'ArrowDown',
	ArrowLeft: 'ArrowLeft',
	ArrowRight: 'ArrowRight',

	// F-клавиши
	F1: 'F1',
	F2: 'F2',
	F3: 'F3',
	F4: 'F4',
	F5: 'F5',
	F6: 'F6',
	F7: 'F7',
	F8: 'F8',
	F9: 'F9',
	F10: 'F10',
	F11: 'F11',
	F12: 'F12',

	// Дополнительные клавиши
	Escape: 'Escape',
	PrintScreen: 'PrintScreen',
	ScrollLock: 'ScrollLock',
	Pause: 'Pause',

	// Numpad
	NumLock: 'NumLock',
	NumpadDivide: 'NumpadDivide',
	NumpadMultiply: 'NumpadMultiply',
	NumpadSubtract: 'NumpadSubtract',
	NumpadAdd: 'NumpadAdd',
	NumpadEnter: 'NumpadEnter',
	NumpadDecimal: 'NumpadDecimal',
	Numpad0: 'Numpad0',
	Numpad1: 'Numpad1',
	Numpad2: 'Numpad2',
	Numpad3: 'Numpad3',
	Numpad4: 'Numpad4',
	Numpad5: 'Numpad5',
	Numpad6: 'Numpad6',
	Numpad7: 'Numpad7',
	Numpad8: 'Numpad8',
	Numpad9: 'Numpad9',
} as const

// Раскладка 60%
export const Layout60: KeyboardLayout = {
	name: '60%',
	keys: [
		// Первый ряд
		[
			{ name: '`', keyCode: KeyCodes.Backquote, id: 'backquote' },
			{ name: '1', keyCode: KeyCodes.Digit1, id: 'digit1' },
			{ name: '2', keyCode: KeyCodes.Digit2, id: 'digit2' },
			{ name: '3', keyCode: KeyCodes.Digit3, id: 'digit3' },
			{ name: '4', keyCode: KeyCodes.Digit4, id: 'digit4' },
			{ name: '5', keyCode: KeyCodes.Digit5, id: 'digit5' },
			{ name: '6', keyCode: KeyCodes.Digit6, id: 'digit6' },
			{ name: '7', keyCode: KeyCodes.Digit7, id: 'digit7' },
			{ name: '8', keyCode: KeyCodes.Digit8, id: 'digit8' },
			{ name: '9', keyCode: KeyCodes.Digit9, id: 'digit9' },
			{ name: '0', keyCode: KeyCodes.Digit0, id: 'digit0' },
			{ name: '-', keyCode: KeyCodes.Minus, id: 'minus' },
			{ name: '=', keyCode: KeyCodes.Equal, id: 'equal' },
			{
				name: 'Backspace',
				keyCode: KeyCodes.Backspace,
				width: KeySize.Backspace,
				id: 'backspace'
			},
		],
		// Второй ряд
		[
			{ name: 'Tab', keyCode: KeyCodes.Tab, width: KeySize.Tab, id: 'tab' },
			{ name: 'Q', keyCode: KeyCodes.Q, id: 'q' },
			{ name: 'W', keyCode: KeyCodes.W, id: 'w' },
			{ name: 'E', keyCode: KeyCodes.E, id: 'e' },
			{ name: 'R', keyCode: KeyCodes.R, id: 'r' },
			{ name: 'T', keyCode: KeyCodes.T, id: 't' },
			{ name: 'Y', keyCode: KeyCodes.Y, id: 'y' },
			{ name: 'U', keyCode: KeyCodes.U, id: 'u' },
			{ name: 'I', keyCode: KeyCodes.I, id: 'i' },
			{ name: 'O', keyCode: KeyCodes.O, id: 'o' },
			{ name: 'P', keyCode: KeyCodes.P, id: 'p' },
			{ name: '[', keyCode: KeyCodes.BracketLeft, id: 'bracketLeft' },
			{ name: ']', keyCode: KeyCodes.BracketRight, id: 'bracketRight' },
			{ name: '\\', keyCode: KeyCodes.Backslash, width: 1.5, id: 'backslash' },
		],
		// Третий ряд
		[
			{
				name: 'Caps Lock',
				keyCode: KeyCodes.CapsLock,
				width: KeySize.CapsLock,
				id: 'capsLock'
			},
			{ name: 'A', keyCode: KeyCodes.A, id: 'a' },
			{ name: 'S', keyCode: KeyCodes.S, id: 's' },
			{ name: 'D', keyCode: KeyCodes.D, id: 'd' },
			{ name: 'F', keyCode: KeyCodes.F, id: 'f' },
			{ name: 'G', keyCode: KeyCodes.G, id: 'g' },
			{ name: 'H', keyCode: KeyCodes.H, id: 'h' },
			{ name: 'J', keyCode: KeyCodes.J, id: 'j' },
			{ name: 'K', keyCode: KeyCodes.K, id: 'k' },
			{ name: 'L', keyCode: KeyCodes.L, id: 'l' },
			{ name: ';', keyCode: KeyCodes.Semicolon, id: 'semicolon' },
			{ name: "'", keyCode: KeyCodes.Quote, id: 'quote' },
			{ name: 'Enter', keyCode: KeyCodes.Enter, width: KeySize.Enter, id: 'enter' },
		],
		// Четвертый ряд
		[
			{ name: 'Shift', keyCode: KeyCodes.ShiftLeft, width: KeySize.Shift, id: 'shiftLeft' },
			{ name: 'Z', keyCode: KeyCodes.Z, id: 'z' },
			{ name: 'X', keyCode: KeyCodes.X, id: 'x' },
			{ name: 'C', keyCode: KeyCodes.C, id: 'c' },
			{ name: 'V', keyCode: KeyCodes.V, id: 'v' },
			{ name: 'B', keyCode: KeyCodes.B, id: 'b' },
			{ name: 'N', keyCode: KeyCodes.N, id: 'n' },
			{ name: 'M', keyCode: KeyCodes.M, id: 'm' },
			{ name: ',', keyCode: KeyCodes.Comma, id: 'comma' },
			{ name: '.', keyCode: KeyCodes.Period, id: 'period' },
			{ name: '/', keyCode: KeyCodes.Slash, id: 'slash' },
			{ name: 'Shift', keyCode: KeyCodes.ShiftRight, width: KeySize.Shift, id: 'shiftRight' },
		],
		// Пятый ряд
		[
			{ name: 'Ctrl', keyCode: KeyCodes.ControlLeft, width: KeySize.Wide, id: 'ctrlLeft' },
			{ name: 'Win', keyCode: KeyCodes.MetaLeft, width: KeySize.Wide, id: 'winLeft' },
			{ name: 'Alt', keyCode: KeyCodes.AltLeft, width: KeySize.Wide, id: 'altLeft' },
			{ name: 'Space', keyCode: KeyCodes.Space, width: KeySize.Space, id: 'space' },
			{ name: 'Alt', keyCode: KeyCodes.AltRight, width: KeySize.Wide, id: 'altRight' },
			{ name: 'Win', keyCode: KeyCodes.MetaRight, width: KeySize.Wide, id: 'winRight' },
			{ name: 'Menu', keyCode: KeyCodes.Meta, width: KeySize.Wide, id: 'menu' },
			{ name: 'Ctrl', keyCode: KeyCodes.ControlRight, width: KeySize.Wide, id: 'ctrlRight' },
		],
	],
}

// Тип события клавиатуры
export interface KeyboardEvent {
	keyCode: string
	pressed: boolean
	char?: string
	scanCode?: number
}

// Экспорт всех доступных раскладок
export const layouts = {
	'60': Layout60,
	// Здесь можно добавить другие раскладки (TKL, Full-size и т.д.)
} as const

export type LayoutName = keyof typeof layouts
