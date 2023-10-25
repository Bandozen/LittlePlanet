import React, { useState } from 'react';
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
		justify-content: center;
	}
	.page-box {
		background-color: white;
		height: 70%;
		opacity: 0.9;
		border-radius: 30px;
	}
	.change-bar {
		display: flex;
		justify-content: space-between;
	}
`;

function LoginPage() {
	const [condition, setCondition] = useState('login');

	return (
		<LoginBg>
			<div className="bgimage">
				<div className="page-box">
					<div className="change-bar">
						<button type="submit" onClick={() => setCondition('login')}>
							로그인
						</button>
						<button type="submit" onClick={() => setCondition('signup')}>
							회원가입
						</button>
					</div>
					{condition === 'login' && <Login />}
					{condition === 'signup' && <SignUp />}
				</div>
			</div>
		</LoginBg>
	);
}

export default LoginPage;
