import * as React from 'react';
import { paths } from '../../../common/paths';
import { useInputChange } from '../../lib/UseInputChange';
import { SerializableProject } from '../../../common/entities/Project';
import { ProjectForm } from './ProjectForm';

const { useState } = React;

const createProject = async (project: SerializableProject, setResponse: React.Dispatch<React.SetStateAction<string>>) => {
	console.log("log: createProject -> project", project);
	let message: string;
	try {
		const res = await fetch(paths.projects, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(project) // body data type must match "Content-Type" header
		});
		const response = await res.json();
		console.log("log: createProject -> newProject", response);
		if (response.message) {
			message = `${response.message}`;
		} else if (response.name && response.path !== void 0) {
			message = `new project created: ${response.name}`;
		} else {
			message = JSON.stringify(response);
		}
	} catch (error) {
		console.log("log: createProject -> error", error);
		message = `${error}`;
	}
	setResponse(message);
	console.log("log: createProject -> response", message);
}

export const CreateProject = () => {
	const [project, handleInputChange, setProject] = useInputChange<SerializableProject>();
	const [response, setResponse] = useState('');

	return <div className={CreateProject.displayName.toLowerCase()}>
		<ProjectForm
			handleInputChange={handleInputChange}
		/>
		<button onClick={() => createProject(project, setResponse)}>Create</button>
		{
			response && <p>{response}</p>
		}
		<p></p>
	</div>
}
CreateProject.displayName = 'Create-Project';
