import * as React from 'react';
import { InputEvent } from '../../lib/UseInputChange';
import { SerializableProject } from '../../../common/entities/Project';

interface Props {
	project?: SerializableProject;
	handleInputChange: (event: InputEvent) => void;
}

export const ProjectForm: React.FunctionComponent<Props> = ({ project, handleInputChange }) => {

	return <div className={ProjectForm.displayName.toLowerCase()}>
		<b>{project ? 'Edit Project' : 'New Project Creator'}:</b>
		<label>Name
			<input value={project?.name} name="name" onChange={handleInputChange} type="text" />
		</label>
		<label>Path
			<input value={project?.path} name="path" onChange={handleInputChange} type="text" />
		</label>
		<label>Description
			<textarea value={project?.description} name="description" onChange={handleInputChange} cols={30} rows={3}></textarea>
		</label>
		<label>Commands
			<textarea value={project?.commands} name="description" onChange={handleInputChange} cols={30} rows={3}></textarea>
		</label>
	</div>
}

ProjectForm.displayName = 'Project-Form';