import * as React from 'react';
import { SerializableProject } from '../../../common/entities/Project';
import { Modal, useModalState } from '../Modal/Modal';
import { UpdateProject } from './UpdateProject';
import { Pty } from '../../lib/Pty';
import { paths } from '../../../common/paths';
import { RunningCommand } from '../../lib/RunningCommand';

export type AddPty = (newPty: Pty) => void;

const deleteProject = async (name: SerializableProject['name']) => {
	const res = await fetch(`${paths.projects}/${name}`, {
		method: 'DELETE',
		cache: 'no-cache',
	});
	console.log("log: deleteProject -> res", res);
}

const runProject = (project: SerializableProject, addPty: AddPty) => {
	const orderedCommands = [];
	project.commands.forEach(command => {
		console.log("log: runProject -> command", command);
		let runningCommand: RunningCommand;
		if (command.hasOwnProperty('pid')) { // this command may be running
			runningCommand = command as RunningCommand;
		} else {
			runningCommand = new RunningCommand(command);
		}
		console.log("log: runProject -> runningCommand", runningCommand);
		// command.dependencies.forEach(dep => {

		// });
		const pty = new Pty(null, null, runningCommand);
		console.log("log: runProject -> pty", pty);
		runningCommand.pty = pty;
		addPty(pty);
	})
}

export const Project: React.FunctionComponent<{ project: SerializableProject, addPty: AddPty }> = ({ project, addPty }) => {
	const [modalIsOpen, setModalIsOpen] = useModalState(false);

	return <div className={Project.displayName.toLowerCase()}>
		<h3>{project.name}</h3>
		<p>{project.path}</p>
		{!!project.description && <p>{project.description}</p>}
		<Modal
			isOpen={modalIsOpen}
			setModalIsOpen={setModalIsOpen}
		>
			<UpdateProject project={project} />
		</Modal>
		<div className='project-buttons'>
			<button onClick={() => setModalIsOpen(true)}>Edit</button>
			<button onClick={() => runProject(project, addPty)}>Run</button>
			<button onClick={() => deleteProject(project.name)}>Delete</button>
		</div>
	</div>
}
Project.displayName = 'Project';
