import * as React from 'react';
import { paths } from '../../../common/paths';
import { useInputChange } from '../../lib/UseInputChange';
import { SerializableProject } from '../../../common/entities/Project';
import { ProjectForm } from './ProjectForm';

const { useState } = React;

const updateProject = async (project: SerializableProject, setResponse: React.Dispatch<React.SetStateAction<string>>, onUpdate) => {
	let message: string;
	try {
		console.log("log: editProject -> project", project);
		const res = await fetch(`${paths.projects}/${project.name}`, {
			method: 'PUT',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(project) // body data type must match "Content-Type" header
		});
		if (res.status === 204) {
			message = `No need to update project "${project.name}"`;
		} else if (res.status === 200) {
			message = `Project "${project.name}" updated`;
			onUpdate();
		} else if (res.status === 400) {
			message = `Project "${project.name}" don't exists`;
		} else {
			message = await res.text();
			console.log(`Server response for update project "${project.name}":`, res);
		}
	} catch (error) {
		console.error("log: editProject -> error", error);
		message = `${error}`;
	}
	setResponse(message);
}

export const UpdateProject = ({ project, onUpdate }) => {
	const [input, handleInputChange, setProject] = useInputChange<SerializableProject>(project);
	const [response, setResponse] = useState('');

	return <div className={UpdateProject.displayName.toLowerCase()}>
		<ProjectForm
			project={input}
			handleInputChange={handleInputChange}
			setProject={setProject}
		/>
		<button onClick={() => updateProject(input, setResponse, onUpdate)}>Update</button>
		{
			response && <p>{response}</p>
		}
		<p></p>
	</div>
}
UpdateProject.displayName = 'Update-Project';
