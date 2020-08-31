import * as React from 'react';
import { SerializableProject } from '../../../common/entities/Project';
import { Modal, useModalState } from '../Modal/Modal';
import { UpdateProject } from './UpdateProject';
import { Pty } from '../../lib/Pty';
import { paths } from '../../../common/paths';
import { RunningCommand } from '../../lib/RunningCommand';
import { SerializableCommand } from '../../../common/entities/Command';

export type AddPty = (newPty: Pty) => void;

const deleteProject = async (name: SerializableProject['name']) => {
	const res = await fetch(`${paths.projects}/${name}`, {
		method: 'DELETE',
		cache: 'no-cache',
	});
	console.log("log: deleteProject -> res", res);
}

const runCommand = (command: SerializableCommand, addPty: AddPty) => {
	console.log("log: runCommand -> command", command);
	let runningCommand: RunningCommand;
	if (command.hasOwnProperty('pid')) { // this command may be running
		runningCommand = command as RunningCommand;
	} else {
		runningCommand = new RunningCommand(command);
	}
	console.log("log: runProject -> runningCommand", runningCommand);
	// command.dependencies.forEach(dep => {

	// });
	const pty = new Pty({ command: runningCommand });
	console.log("log: runProject -> pty", pty);
	runningCommand.pty = pty;
	addPty(pty);
}

const runProject = (project: SerializableProject, addPty: AddPty) => {
	project.commands.filter(command => command.active).forEach(command => {
		runCommand(command, addPty);
	})
}

export const Project: React.FunctionComponent<{ project: SerializableProject, addPty: AddPty, onUpdate: () => void }> = ({ project, addPty, onUpdate }) => {
	const [modalIsOpen, setModalIsOpen] = useModalState(false);

	return <div className={Project.displayName.toLowerCase()}>
		<h3>{project.name}</h3>
		<p>{project.path}</p>
		{!!project.description && <p>{project.description}</p>}
		<div className="commands">
			{
				project.commands?.map((command, k) => <div key={k} className="command">
					<p>{command.active ? '●' : '○'}</p>
					<p>{command.name}</p>
					<button onClick={() => {
						runCommand(command, addPty)
					}}>Run</button>
				</div>)
			}
		</div>
		<Modal
			isOpen={modalIsOpen}
			setModalIsOpen={setModalIsOpen}
		>
			<UpdateProject project={project} onUpdate={onUpdate} />
		</Modal>
		<div className='project-buttons'>
			<button onClick={() => setModalIsOpen(true)}>Edit</button>
			<button onClick={() => runProject(project, addPty)}>Run</button>
			<button onClick={() => deleteProject(project.name)}>Delete</button>
		</div>
	</div>
}
Project.displayName = 'Project';
