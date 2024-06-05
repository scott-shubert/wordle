import { useState, useMemo } from 'react'
import './App.css'
import Board, { Letter } from './Board'
import Keyboard from './Keyboard'

const WORDS = Object.freeze([
	'APPLE',
	'BEAST',
	'FAINT',
	'FEAST',
	'FRUIT',
	'GAMES',
	'PAINT',
	'PASTE',
	'TOWER',
	'REACT',
])

export default function App() {
	const answer = useMemo(
		() => WORDS[Math.floor(Math.random() * WORDS.length)],
		[]
	)
	const answerMap = useMemo(() => {
		const map = new Map<number, string>()
		answer.split('').forEach((char, index) => map.set(index, char))
		return map
	}, [])

	const [usedLetters, setUsedLetters] = useState(new Map<string, string>())
	const [guesses, setGuesses] = useState(new Array<Letter>())
	const [guess, setGuess] = useState('')
	const [gameState, setGameState] = useState('playing')

	function submit() {
		if (guess.length < 5) return

		if (guess === answer) {
			setGameState('won')
		}

		const letters = guess.split('')
		const newGuesses = [...guesses]
		const newUsedLetters = structuredClone(usedLetters)

		letters.forEach((char, index) => {
			let status = ''
			const answerIndex = answer.indexOf(char)
			const answerAtIndex = answerMap.get(index)
			if (answerAtIndex === char) {
				status = 'green'
			} else if (answerIndex > -1) {
				status = 'yellow'
			} else {
				status = 'red'
			}

			if (status === 'green' || !newUsedLetters.has(char)) {
				newUsedLetters.set(char, status)
			}

			newGuesses.push({ char, status })
		})

		setGuess('')
		setGuesses(newGuesses)
		setUsedLetters(newUsedLetters)
		if (newGuesses.length === 30 && guess !== answer) {
			setGameState('lost')
		}
	}

	const handleKeyboardPress = (key: string) => {
		if (gameState !== 'playing') return
		let newGuess = guess
		if (key === '<X' || key === 'Backspace') {
			newGuess = newGuess.slice(0, guess.length - 1)
		} else if (key === 'Enter') {
			submit()
			return
		} else if (guess.length === 5) {
			return
		} else if (/^[a-zA-Z]$/.test(key)) {
			newGuess += key.toUpperCase()
		}

		setGuess(newGuess)
	}

	return (
		<>
			<div className='header'>
				<div>Wordle</div>
			</div>
			<div className='game'>
				<Board guesses={guesses} nextGuess={guess} />
				<div className='message'>
					{gameState === 'won' && <span>You win!</span>}
					{gameState === 'lost' && <span>You lost. Answer: {answer}</span>}
				</div>
				<Keyboard
					usedLetters={usedLetters}
					handleKeyboardPress={handleKeyboardPress}
				/>
				{answer}
			</div>
		</>
	)
}
