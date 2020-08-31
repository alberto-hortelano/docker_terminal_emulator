import { useState } from 'react'
import { setDeepProperty } from '../../common/lib';

export type InputEvent = { currentTarget: { name: string, value: any, checked?: boolean } };

export const useInputChange = <T extends object>(defaultValue?: T): [T, (event: InputEvent) => void, React.Dispatch<React.SetStateAction<T>>] => {
	const [input, setInput] = useState(defaultValue);

	const handleInputChange = ({ currentTarget }: InputEvent) => {
		console.log("log: handleInputChange -> currentTarget", currentTarget);
		const newInput = { ...input };
		const parsedPath = currentTarget.name.split('.').map(step => `${parseInt(step)}` === step ? parseInt(step) : step);
		if (currentTarget.hasOwnProperty('checked')) {
			setDeepProperty(newInput, parsedPath, currentTarget.checked);
		} else {
			setDeepProperty(newInput, parsedPath, currentTarget.value);
		}
		setInput(newInput);
	}

	return [input, handleInputChange, setInput];
}
