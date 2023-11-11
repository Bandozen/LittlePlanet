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
		overflow: hidden;
	}
	.change-bar {
		display: flex;
		justify-content: space-around;
	}
	.button-div {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.no-select {
		background-color: gray;
		color: white;
	}
`;

function LoginPage() {
	const [condition, setCondition] = useState<'login' | 'signup'>('login');

	return (
		<LoginBg>
			<div className="bgimage">
				<div className="page-box">
					<div className="change-bar">
						<div className={`button-div ${condition === 'signup' ? 'no-select' : ''}`}>
							<button type="button" onClick={() => setCondition('login')}>
								로그인
							</button>
						</div>
						<div className={`button-div ${condition === 'login' ? 'no-select' : ''}`}>
							<button type="button" onClick={() => setCondition('signup')}>
								회원가입
							</button>
						</div>
					</div>
					{condition === 'login' && <Login />}
					{condition === 'signup' && <SignUp setCondition={setCondition} />}
				</div>
			</div>
		</LoginBg>
	);
}

export default LoginPage;
