import * as React from 'react';
import { SerializableProject } from '../../../common/entities/Project';
import { Modal } from '../Modal/Modal';
import { UpdateProject } from './UpdateProject';

const { useState } = React;

export const Project: React.FunctionComponent<{ project: SerializableProject }> = ({ project }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	console.log("log: Project.displayName", Project.displayName);

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
		</div>
	</div>
}
Project.displayName = 'Project';
