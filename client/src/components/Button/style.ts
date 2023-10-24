/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Button = styled.div`
	.play-btn {
		font-size: 24px;
		background-color: #faff00;
		color: black;
		border: none;
		padding: 12px 24px;
		border-radius: 40px;
		cursor: pointer;
		transition: background-color 0.3s;
		width: 100px;
		height: 50px;
		display: flex; // Flexbox 사용
		justify-content: center; // 텍스트를 수평 중앙에 배치
		align-items: center; // 텍스트를 수직 중앙에 배치

		&:hover {
			background-color: #188eb7;
			color: white;
		}
	}
`;
