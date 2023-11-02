/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const SimulationChatWrapper = styled.div`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.wrap {
		padding: 40px 0;
		background-color: #a8c0d6;
		width: 50%;
	}

	.wrap .chat {
		display: flex;
		align-items: flex-start;
		padding: 20px;
	}

	.wrap .chat .icon {
		position: relative;
		overflow: hidden;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #eee;
	}

	.wrap .chat .icon i {
		position: absolute;
		top: 10px;
		left: 50%;
		font-size: 2.5rem;
		color: #aaa;
		transform: translateX(-50%);
	}

	.wrap .chat .textbox {
		position: relative;
		display: inline-block;
		max-width: calc(100% - 70px);
		padding: 10px;
		margin-top: 7px;
		font-size: 13px;
		border-radius: 10px;
	}

	.wrap .chat .textbox::before {
		position: absolute;
		display: block;
		top: 0;
		font-size: 1.5rem;
	}

	.wrap .ch1 .textbox {
		margin-left: 20px;
		background-color: #ddd;
	}

	.wrap .ch1 .textbox::before {
		left: -15px;
		content: '◀';
		color: #ddd;
	}

	.wrap .ch2 {
		flex-direction: row-reverse;
	}

	.wrap .ch2 .textbox {
		margin-right: 20px;
		background-color: #f9eb54;
	}
`;
