import React from 'react';
/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import loginBg from '../assets/login_image.png';

const LoginBg = styled.div`
	.bgimage {
		background-image: url(${loginBg});
		width: 100vw;
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
	}
`;
function LoginPage() {
	return (
		<LoginBg>
			<div className="bgimage">
				<Login />
				<SignUp />
			</div>
		</LoginBg>
	);
}

export default LoginPage;
