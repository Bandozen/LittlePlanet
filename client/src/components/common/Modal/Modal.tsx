import React from 'react';
import { Wrapper, ModalBackground, ModalContainer } from './style';

interface IModalProps {
	title: string;
	content: string;
	closeModal: () => void;
}

function Modal(props: IModalProps) {
	const { title, content, closeModal } = props;
	return (
		<Wrapper>
			<ModalBackground onClick={closeModal} />
			<ModalContainer>
				<div className="title">{title}</div>
				<div className="content">{content}</div>
			</ModalContainer>
		</Wrapper>
	);
}

export default Modal;
