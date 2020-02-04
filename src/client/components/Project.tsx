import * as React from 'react';

interface Props {
	name: string,
	path: string,
	description?: string,
	commands?: string[],
	scripts?: string[]
}

export const Project: React.FunctionComponent<Props> = ({ name, path, description, commands, scripts }) => {

	return <div>
		<h3>{name}</h3>
		{!!description && <p>{description}</p>}
	</div>
}
