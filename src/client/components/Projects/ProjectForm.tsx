import * as React from 'react';
import { InputEvent } from '../../lib/UseInputChange';
import { SerializableProject } from '../../../common/entities/Project';
import { CommandForm } from './CommandForm';
import { Command } from '../../../common/entities/Command';

export interface ProjectFormProps {
	project?: SerializableProject;
	setProject?: React.Dispatch<React.SetStateAction<SerializableProject>>;
	handleInputChange: (event: InputEvent) => void;
}

export const ProjectForm: React.FunctionComponent<ProjectFormProps> = ({ project, setProject, handleInputChange }) => {

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
				project?.commands.map((command: Command, k) => <CommandForm
					key={k}
					index={k}
					setProject={setProject}
					commands={project?.commands}
					handleInputChange={handleInputChange}
				/>)
			}
			{
				project?.commands.length > 0 ?
					<button onClick={() => {
						setProject(oldProject => {
							const newProject = {
								...oldProject,
								commands: [
									...oldProject.commands,
									{
										name: '',
										text: ''
									}
								]
							}
							console.log("log: oldProject", oldProject);
							console.log("log: newProject", newProject);
							return newProject;
						});
						console.log("log: commands", project?.commands, project);
					}}>+</button> :
					<CommandForm index={project?.commands.length} commands={project?.commands} handleInputChange={handleInputChange} />
			}

		</div>
	</div>
}
ProjectForm.displayName = 'Project-Form';