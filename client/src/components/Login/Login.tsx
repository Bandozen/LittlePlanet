import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const navigate = useNavigate();

	const isEmailValid = (inputEmail: string) => {
		const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return regex.test(inputEmail);
	};

	const isPasswordValid = (inputPassword: string) => {
		return inputPassword.length >= 8;
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target; // Object destructuring
		setEmail(value);
		if (!isEmailValid(value)) {
			setEmailError('test@naver.com');
		} else {
			setEmailError('');
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target; // Object destructuring
		setPassword(value);
		if (!isPasswordValid(value)) {
			setPasswordError('비밀번호는 8자 이상');
		} else {
			setPasswordError('');
		}
	};

	const isFormValid = () => {
		return isEmailValid(email) && isPasswordValid(password) && !emailError && !passwordError;
	};

	const handleLogin = async () => {
		try {
			const loginResponse = await api.post('/member/login', {
				memberEmail: email,
				memberPassword: password,
			});
			console.log(loginResponse);
			navigate('/');
		} catch (error) {
			console.log('api 요청 실패', error);
		}
	};

	return (
		<div className="w-10/12">
			<Input
				type="email"
				label="이메일"
				value={email}
				onChange={handleEmailChange}
				containerProps={{
					className: 'm-2',
				}}
				crossOrigin=""
			/>
			{emailError && <p className="text-red-500 text-xs ml-2 mb-3">{emailError}</p>}

			<Input
				type="password"
				label="비밀번호"
				value={password}
				onChange={handlePasswordChange}
				containerProps={{
					className: 'm-2',
				}}
				crossOrigin=""
			/>
			{passwordError && <p className="text-red-500 text-xs ml-2">{passwordError}</p>}

			<Button className="m-3" disabled={!isFormValid()} onClick={handleLogin}>
				로그인
			</Button>
		</div>
	);
}

export default Login;
