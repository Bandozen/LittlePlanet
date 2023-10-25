/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const SignUpWrapper = styled.div`
	.signup-div {
		font-weight: bold;
		color: white;
	}
	.signup-box {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.pass-sentence {
		color: green;
	}
	.password-inform {
		color: gray;
		font-size: 12px;
	}
	.input-line {
		display: flex;
		justify-content: space-between;
	}
	.input-position {
		display: flex;
		justify-content: space-between;
		width: 75%;
	}
	.input-css {
		border: none;
		background-color: lightgray;
		border-radius: 5px;
		font-size: 18px;
	}
	.input-title {
		font-weight: bold;
		font-size: 18px;
	}
`;
