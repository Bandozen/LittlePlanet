import React, { useState } from 'react';
import { SignUpWrapper } from './style';

function SignUp() {
	const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');
	// const [school, setSchool] = useState('');
	function verifyEmail() {
		console.log('email');
		// 해당 작성 이메일이 중복 되었는지 확인하는 axios
	}
	function signupClick() {
		console.log('signup');
		// 가입하기 버튼 눌렀을 때 백으로 회원가입 api 쏘고 그 결과에 맞는 처리 함수
	}
	return (
		<SignUpWrapper>
			<div className="signup-div">회원가입 컴포넌트</div>
			<div className="signup-box">
				<div>
					<span>이메일</span>
					<input
						onChange={(e) => {
							setEmail(e.target.value);
							console.log(email);
						}}
					/>
					<button type="submit" onClick={verifyEmail}>
						인증 확인
					</button>
				</div>
				<div>
					<span>학교명</span>
					<input />
				</div>
				<div>
					<span>비밀번호</span>
					<input />
				</div>
				<div>
					<span>비밀번호 확인</span>
					<input />
				</div>
				<div>
					<button type="submit" onClick={signupClick}>
						가입하기
					</button>
				</div>
			</div>
		</SignUpWrapper>
	);
}

export default SignUp;
