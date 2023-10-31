import React, { useState } from 'react';
import axios from 'axios';
import { SignUpWrapper } from './style';

type SignUpProps = {
	setCondition: React.Dispatch<React.SetStateAction<'login' | 'signup'>>;
};

function SignUp({ setCondition }: SignUpProps) {
	// 각 입력이 발생함에 따라 상태 변수값을 바꿔주기 위해 설정
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [school, setSchool] = useState('');
	const [verifyNumber, setVerifyNumber] = useState('');
	// 현재 이메일 인증이 진행중인지를 나타내기 위해 설정 (true일 때 인증번호 입력칸이 생기고 false일 때 인증번호 입력칸 사라짐.)
	const [verifying, setVerifying] = useState(false);
	// 이메일 인증이 완료되었는지 상태를 확인하기 위해 설정
	const [emailPass, setEmailPass] = useState(false);
	// 정규 표현식을 사용하여 작성한 이메일이 유효한 형식인지 검사하는 함수
	function isValidEmail(tt: string): boolean {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailPattern.test(tt);
	}
	// 입력된 이메일을 통해 이메일 인증 요청을 보내는 함수
	function verifyEmail() {
		console.log(email);
		// 이메일 형식에 위배된 경우
		if (isValidEmail(email) === false) {
			alert('이메일 형식을 지켜주세요.');
			// 이메일 형식에 통과한 경우
		} else {
			// 해당 작성 이메일이 중복 되었는지 확인하는 axios 요청 보내고
			// 중복된 값이 없다면
			// 백에서 임의로 숫자 6자리를 만들고 메일로 보내주고
			// 그 메일과 숫자를 redis에 저장
			// 또한 인증번호 입력칸을 나타내기 위해 verifying 상태 변화
			setEmailPass(false);
			axios
				.post(`https://k9c203.p.ssafy.io:8080/api/v1/member/signup/authCode?emailAddress=${email}`)
				.then((response) => {
					console.log(response);
					setVerifying(true);
				})
				.catch((error) => {
					console.error('이메일 중복', error);
					alert('이미 가입된 이메일입니다.');
				});
		}
	}
	// 인증번호가 유효한지 검사하는 함수
	function verifyNumberCheck() {
		// 인증번호가 이메일로 등록된 레디스의 값에 해당한다면
		console.log(verifyNumber);
		axios
			.post('https://k9c203.p.ssafy.io:8080/api/v1/member/signup/verify', {
				emailAddress: email,
				authCode: verifyNumber,
			})
			.then((response) => {
				console.log(response);
				setEmailPass(true);
				setVerifying(false);
			})
			.catch((error) => {
				console.log(error);
				alert('인증번호가 유효하지 않습니다. 다시 확인해 주세요.');
			});
	}
	function signupClick() {
		console.log(email, password, confirmPassword, school);
		if (emailPass === false) {
			alert('이메일 인증을 완료해 주세요.');
			return;
		}
		if (password !== confirmPassword) {
			// 비밀번호 다르면 실패
			alert(`입력한 비밀번호가 다릅니다!`);
			return;
		}
		if (school === '') {
			alert('학교를 입력해주세요.');
			return;
		}
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		if (!password.match(passwordRegex)) {
			alert(`비밀번호는 8자 이상이면서 숫자와 영어와 특수문자를 모두 포함해야 합니다`);
			return;
		}
		// 가입하기 버튼 눌렀을 때 백으로 회원가입 api 쏘고 그 결과에 맞는 처리 함수

		axios
			.post('https://k9c203.p.ssafy.io:8080/api/v1/member/signup', {
				memberEmail: email,
				memberPassword: password,
				memberSchool: school,
			})
			.then((response) => {
				console.log(response);
				alert('회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.');
				setCondition('login');
			})
			.catch((error) => {
				alert('회원가입 실패');
				console.log(error);
			});
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
						<button type="submit" onClick={verifyEmail} hidden={emailPass}>
							인증 요청
						</button>
					</div>
				</div>
				{verifying === true && (
					<div className="input-line">
						<span className="input-title">인증번호</span>
						<div className="input-position">
							<input
								className="input-css"
								onChange={(e) => {
									setVerifyNumber(e.target.value);
									console.log(verifyNumber);
								}}
							/>
							<button type="submit" onClick={verifyNumberCheck}>
								인증
							</button>
						</div>
					</div>
				)}
				{emailPass === true && <div className="pass-sentence">이메일 인증이 완료되었습니다.</div>}
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
