import * as React from 'react';
import { CreateProject } from "./CreateProject";
import { paths } from '../../../common/paths';
import { SerializableProject } from '../../../common/entities/Project';
import { Project, AddPty } from './Project';
import { Modal, useModalState } from '../Modal/Modal';

const { useState, useEffect } = React;

const getProjects = async (cb?: (projects: SerializableProject[]) => void) => {
	try {
		console.log("log: Projects -> getProjects useEffect");
		const res = await fetch(paths.projects);
		const projects: SerializableProject[] = await res.json();
		console.log("log: getProjects -> projects", projects);
		cb(projects);
	} catch (error) {
		console.log("log: getProjects -> error", error);
	}
}

const printProjects = (projects: SerializableProject[], addPty: AddPty) => {
	console.log("log: printProjects -> projects", projects);
	if (projects.length) {
		return <div className="projects-container">{
			projects.map((project, i) => <Project
				key={i}
				project={project}
				addPty={addPty}
			></Project>)
		}</div>
	}
}

export const Projects: React.FunctionComponent<{ addPty: AddPty }> = ({ addPty }) => {
	const [modalIsOpen, setModalIsOpen] = useModalState(false);
	const [projects, setProjects] = useState<SerializableProject[]>([]);

	useEffect(() => {
		getProjects(setProjects);
	}, []);

	return <div className={Projects.displayName.toLowerCase()}>
		<button onClick={() => setModalIsOpen(true)}>New Project</button>
		{
			printProjects(projects, addPty)
		}
		<Modal
			isOpen={modalIsOpen}
			setModalIsOpen={setModalIsOpen}
		>
			<CreateProject />
		</Modal>
	</div>
}

Projects.displayName = 'Projects';