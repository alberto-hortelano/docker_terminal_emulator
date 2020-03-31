import * as React from 'react';

const { useState, useEffect } = React;

interface Props {
	isOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	hideOnClose?: boolean;
}

const getClassName = (isOpen: boolean, hideOnClose: boolean) => {
	let extraClasses = '';
	if (hideOnClose) {
		extraClasses += ' hide-on-close';
	}
	if (isOpen) {
		extraClasses += ' open';
	}
	return extraClasses
}

let openModals = 0;

export const useModalState = (initialState: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
	const [modalIsOpen, setModalIsOpen] = useState(initialState);

	useEffect(() => {
		if (!modalIsOpen) {
			openModals++;
		}
	}, []);
	useEffect(() => {
		openModals += modalIsOpen ? 1 : -1;
		if (openModals === 1) {
			document.body.classList.add('modal-open');
		} else if (openModals === 0) {
			document.body.classList.remove('modal-open');
		}
	}, [modalIsOpen]);
	return [modalIsOpen, setModalIsOpen]
}

export const Modal: React.FunctionComponent<Props> = ({ children, isOpen, setModalIsOpen, hideOnClose = true }) => <div
	className={Modal.displayName.toLowerCase() + getClassName(isOpen, hideOnClose)}
	onClick={(e) => {
		e.stopPropagation();
		setModalIsOpen(false);
	}}
>
	<div className="modal-container">
		<div className="modal-content" onClick={(e) => e.stopPropagation()}>
			<button className='modal-close' onClick={(e) => setModalIsOpen(false)}>X</button>
			{children}
		</div>
	</div>
</div>
Modal.displayName = 'Modal';