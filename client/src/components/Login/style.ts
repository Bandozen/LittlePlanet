/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const LoginWrapper = styled.div`
	.login-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 20px;
		min-height: 500px;
	}
	.login-div {
		font-weight: bold;
		color: white;
	}
	.btn-login {
		display: flex;
		flex-direction: 'row-reverse';
	}
	.forget-btn {
		box-shadow: none;
	}
`;
