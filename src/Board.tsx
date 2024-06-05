import { useEffect, useState } from 'react'

export class Letter {
	char: string
	status: string

	constructor(char: string, status: string) {
		this.char = char
		this.status = status
	}
}

export default function Board({
	guesses,
	nextGuess,
}: {
	guesses: Letter[]
	nextGuess: string
}) {
	const [spaces, setSpaces] = useState(new Array(30).fill(new Letter('', '')))

	useEffect(() => {
		setSpaces([
			...guesses,
			...nextGuess.split('').map((char) => new Letter(char, '')),
			...new Array(30 - guesses.length - nextGuess.split('').length).fill(
				new Letter('', '')
			),
		])
	}, [nextGuess])

	const getClassName = (value: Letter, index: number) => {
		if (value.status !== '') {
			return value.status + ' letter space'
		}
		return value.char === '' ? 'empty space' : 'prompt space'
	}

	return (
		<div className='board'>
			{spaces.map((value, index) => {
				return (
					<div key={'space-' + index} className={getClassName(value, index)}>
						<span>{value.char}</span>
					</div>
				)
			})}
		</div>
	)
}
