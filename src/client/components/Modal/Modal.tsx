import * as React from 'react';

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

export const Modal: React.FunctionComponent<Props> = ({ children, isOpen, setModalIsOpen, hideOnClose = true }) => <div
	className={Modal.displayName.toLowerCase() + getClassName(isOpen, hideOnClose)}
	onClick={(e) => {
		e.stopPropagation();
		setModalIsOpen(false);
	}}
>
	<div className="modal-content" onClick={(e) => e.stopPropagation()}>
		<button className='modal-close' onClick={(e) => setModalIsOpen(false)}>X</button>
		{children}
	</div>
</div>
Modal.displayName = 'Modal';