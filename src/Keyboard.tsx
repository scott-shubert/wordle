import { useEffect } from 'react'

export default function Keyboard({
	usedLetters,
	handleKeyboardPress,
}: {
	usedLetters: Map<string, string>
	handleKeyboardPress: (key: string) => void
}) {
	const topRow = 'QWERTYUIOP'.split('')
	const middleRow = 'ASDFGHJKL'.split('')
	const bottomRow = ['Enter', ...'ZXCVBNM'.split(''), '<X']

	const getClassName = (key: string): string => {
		if (usedLetters.has(key)) {
			return usedLetters.get(key)!
		}
		return ''
	}

	useEffect(() => {
		// @ts-expect-error description
		function onKeyDown(event): void {
			if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
				return
			}

			if (
				event.target !== document.body &&
				(event.key === 'Enter' || event.key === ' ')
			) {
				return
			}

			handleKeyboardPress(event.key)
		}

		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('keydown', onKeyDown)
		}
	})

	return (
		<div>
			<div className='key-row'>
				{topRow.map((key) => {
					return (
						<button
							className={getClassName(key)}
							key={key}
							onClick={() => handleKeyboardPress(key)}
						>
							{key}
						</button>
					)
				})}
			</div>
			<div className='key-row'>
				{middleRow.map((key) => {
					return (
						<button
							className={getClassName(key)}
							key={key}
							onClick={() => handleKeyboardPress(key)}
						>
							{key}
						</button>
					)
				})}
			</div>
			<div className='key-row'>
				{bottomRow.map((key, index) => {
					return (
						<button
							className={
								index === 0 || index === 8 ? 'big-key' : getClassName(key)
							}
							key={key}
							onClick={() => handleKeyboardPress(key)}
						>
							{key.toUpperCase()}
						</button>
					)
				})}
			</div>
		</div>
	)
}
