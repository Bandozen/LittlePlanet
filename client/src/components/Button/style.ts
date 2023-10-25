/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Button = styled.div`
	.play-btn {
		font-size: 1.2rem;
		background-color: #faff00;
		color: black;
		border: none;
		padding: 12px 24px;
		border-radius: 40px;
		cursor: pointer;
		transition: background-color 0.3s;
		width: 6vw;
		height: 4.5vh;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			background-color: #188eb7;
			color: white;
		}
	}
	.detail-btn {
		font-size: 1.2rem;
		background-color: white;
		color: black;
		border: none;
		padding: 12px 24px;
		border-radius: 40px;
		cursor: pointer;
		transition: background-color 0.3s;
		width: 6vw;
		height: 4.5vh;
		display: flex;
		justify-content: center;
		align-items: center;

		&:hover {
			color: #188eb7;
		}
		// 테스트해보기
		// &.active {
		// 	color: #188eb7;
		// 	font-weight: bold;
		// }
	}
`;
