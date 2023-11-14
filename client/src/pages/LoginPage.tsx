import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
// import loginBg from '../assets/login_image.png';
// import MovingBg from '../assets/movingbg.gif';
import loginMusic from '../assets/music/login_music.mp3';

const fadeIn = keyframes`
  from {
    opacity: 0.65;
  }
  to {
    opacity: 0.9;
  }
`;

// const zoomAnimation = keyframes`
//   from {
//     background-size: 115%;
//   }
//   to {
//     background-size: 100%;
//   }
// `;
// animation: ${zoomAnimation} 10s ease-out;

const LoginBg = styled.div`
	.bgimage {
		background-image: url(https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/movingbg.gif);
		width: 100vw;
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: space-between;
		padding-left: 60%;
		padding-top: 7%;
		flex-direction: row; // 내부 요소를 세로로 배치
		overflow: hidden; // 스크롤바 숨김
	}
	.page-box {
		animation: ${fadeIn} 2s ease-out;
		background-color: white;
		width: 500px;
		height: 450px;
		opacity: 0.9;
		border-radius: 15px;
	}
	.change-bar {
		display: flex;
		justify-content: space-around;
	}
	.button-div {
		flex: 1;
		cursor: pointer;
		padding: 10px 20px;
		text-align: center;
		background-color: white;
		color: black;
		font-size: 1.5rem;
		font-weight: bold;
		border-radius: 5px 5px 0px 0px;
	}
	.no-select {
		background-color: #188eb7;
		color: white;
		font-weight: regular;
	}
`;

function LoginPage() {
	const [condition, setCondition] = useState<'login' | 'signup'>('login');
	useEffect(() => {
		// 오디오 파일 생성 및 재생
		const audio = new Audio(loginMusic);
		audio.play().catch((error) => console.log('자동 재생 실패:', error));

		// 컴포넌트 언마운트 시 오디오 정지
		return () => {
			audio.pause();
			audio.currentTime = 0; // 재생 위치를 처음으로 되돌림
		};
	}, []);

	// 키보드 이벤트 처리 함수
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, newCondition: 'login' | 'signup') => {
		if (e.key === 'Enter' || e.key === ' ') {
			setCondition(newCondition);
		}
	};

	return (
		<LoginBg>
			<div className="bgimage">
				<div className="page-box">
					<div className="change-bar">
						<div
							className={`button-div ${condition === 'signup' ? 'no-select' : ''}`}
							onClick={() => setCondition('login')}
							onKeyDown={(e) => handleKeyDown(e, 'login')}
							role="button"
							tabIndex={0} // 키보드 포커스를 위한 tabIndex
						>
							로그인
						</div>
						<div
							className={`button-div ${condition === 'login' ? 'no-select' : ''}`}
							onClick={() => setCondition('signup')}
							onKeyDown={(e) => handleKeyDown(e, 'signup')}
							role="button"
							tabIndex={0} // 키보드 포커스를 위한 tabIndex
						>
							회원가입
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
