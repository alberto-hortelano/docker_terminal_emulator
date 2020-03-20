import { useState, ChangeEvent } from 'react'

export type InputEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const useInputChange = <T>(defaultValue?: T): [T, (event: InputEvent) => void] => {
	const [input, setInput] = useState(defaultValue);

	const handleInputChange = ({ currentTarget }: InputEvent) => {
		setInput({
			...input,
			[currentTarget.name]: currentTarget.value
		});
	}

	return [input, handleInputChange];
}
