import React, { useState } from 'react';
import { SignUpWrapper } from './style';

function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [school, setSchool] = useState('');
	const [emailPass, setEmailPass] = useState(false);
	// 정규 표현식을 사용하여 작성한 이메일이 유효한 형식인지 검사하는 함수
	function isValidEmail(tt: string): boolean {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(tt);
	}
	function verifyEmail() {
		console.log(email);
		// 이메일 형식에 위배된 경우
		if (isValidEmail(email) === false) {
			alert('이메일 형식을 지켜주세요.');
			// 이메일 형식에 통과한 경우
		} else {
			// 해당 작성 이메일이 중복 되었는지 확인하는 axios
			// 통과했다면
			setEmailPass(true);
			// 중복되었다면
			// setEmailPass(false)
			alert('이미 가입된 이메일입니다.');
		}
	}
	function signupClick() {
		console.log(email, password, confirmPassword, school);
		if (emailPass === false) {
			alert('이메일 중복검사를 완료해 주세요.');
		}
		// 가입하기 버튼 눌렀을 때 백으로 회원가입 api 쏘고 그 결과에 맞는 처리 함수
	}
	return (
		<SignUpWrapper>
			<div className="signup-div">회원가입 컴포넌트</div>
			<div className="signup-box">
				<div className="input-line">
					<span className="input-title">이메일</span>
					<div className="input-position">
						<input
							className="input-css"
							onChange={(e) => {
								setEmail(e.target.value);
								console.log(email);
							}}
						/>
						<button type="submit" onClick={verifyEmail}>
							인증 확인
						</button>
					</div>
				</div>
				{emailPass === true && <div className="pass-sentence">가입 가능한 이메일입니다.</div>}
				<div className="input-line">
					<span className="input-title">학교명</span>
					<input
						className="input-position input-css"
						onChange={(e) => {
							setSchool(e.target.value);
							console.log(school);
						}}
					/>
				</div>
				<div className="input-line">
					<span className="input-title">비밀번호</span>
					<input
						className="input-position input-css"
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
							console.log(password);
						}}
					/>
				</div>
				<h1 className="password-inform">
					비밀번호는 영문(대,소문자 구분), 숫자, 특수문자을 조합 8~20자 이내로 설정해 주세요.
				</h1>
				<div className="input-line">
					<span className="input-title">비밀번호 확인</span>
					<input
						className="input-position input-css"
						type="password"
						onChange={(e) => {
							setConfirmPassword(e.target.value);
							console.log(confirmPassword);
						}}
					/>
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
