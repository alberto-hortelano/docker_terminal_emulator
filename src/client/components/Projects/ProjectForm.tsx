import * as React from 'react';
import { InputEvent } from '../../lib/UseInputChange';
import { SerializableProject } from '../../../common/entities/Project';
import { CommandForm } from './CommandForm';

export interface ProjectFormProps {
	project?: SerializableProject;
	handleInputChange: (event: InputEvent) => void;
	// addCommand: (command: Command) => void;
}

export const ProjectForm: React.FunctionComponent<ProjectFormProps> = ({ project, handleInputChange }) => {

	return <div className={ProjectForm.displayName.toLowerCase()}>
		<b>{project ? 'Edit Project' : 'New Project Creator'}:</b>
		<label>Name
			<input value={project?.name} name="name" onChange={handleInputChange} type="text" />
		</label>
		<label>Path
			<input value={project?.path} name="path" onChange={handleInputChange} type="text" />
		</label>
		<label>Description
			<textarea value={project?.description} name="description" onChange={handleInputChange} cols={30} rows={3} />
		</label>
		<div>Commands
			{
				project?.commands.map((command, k) => <CommandForm key={k} index={k} command={command} commands={project?.commands} handleInputChange={handleInputChange} />)
			}
			<CommandForm handleInputChange={handleInputChange} />
		</div>
	</div>
}
ProjectForm.displayName = 'Project-Form';