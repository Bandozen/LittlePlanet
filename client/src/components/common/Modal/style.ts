/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div``;

export const ModalBackground = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

export const ModalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 35%;
	border-radius: 10px;
	border: 1px solid;
	background-color: white;
	position: absolute;
	width: 600px;
	height: 300px;

	.title {
		font-size: 3rem;
	}

	.content {
		font-size: 1.5rem;
	}
`;
