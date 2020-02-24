import * as React from 'react';
import * as ReactModal from "react-modal";
import { NewProject } from "./NewProject";

const { useState } = React;

ReactModal.setAppElement('#app');

export const Projects = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	return <div className='projects'>
		<button onClick={() => setModalIsOpen(true)}>New Project</button>
		<ReactModal
			isOpen={modalIsOpen}
			onRequestClose={() => setModalIsOpen(false)}>
			<NewProject />
		</ReactModal>
	</div>
}
