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
		// justify-content: right;
		// padding-right: 20%;
	}
	.page-box {
		background-color: white;
		height: 50%;
		opacity: 0.9;
		border-radius: 15px;
		// margin-top: 20%;
	}
	.change-bar {
		display: flex;
		justify-content: space-between;
	}
`;

function LoginPage() {
	const [condition, setCondition] = useState<'login' | 'signup'>('login');

	return (
		<LoginBg>
			<div className="bgimage">
				<div className="page-box">
					<div className="change-bar">
						<button type="button" onClick={() => setCondition('login')}>
							로그인
						</button>
						<button type="button" onClick={() => setCondition('signup')}>
							회원가입
						</button>
					</div>
					{condition === 'login' && <Login />}
					{condition === 'signup' && <SignUp setCondition={setCondition} />}
				</div>
			</div>
		</LoginBg>
	);
}

export default LoginPage;
