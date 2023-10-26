import React, { useState } from 'react';
import turnon from 'assets/images/turnon.png';
import otp from 'assets/images/realotp.png';
import otpInput from 'assets/images/input.png';
import { Wrapper } from './style';

function AppHowToUse() {
	const [activeBox, setActiveBox] = useState(0);

	const boxes = [
		{
			id: 1,
			className: 'one',
			name: '1. 어플 전원 ON',
			description: <div>어플의 전원을 켜주세요.</div>,
			image: turnon,
		},
		{
			id: 2,
			className: 'two',
			name: '2. OTP번호 생성',
			description: (
				<div>
					상단의 OTP 생성하기 버튼을 눌러 OTP 번호를 확인해주세요. <br /> OTP 번호는 3분간 유효해요.
				</div>
			),
			image: otp,
		},
		{
			id: 3,
			className: 'three',
			name: '3. OTP번호 입력',
			description: (
				<div>
					어플에 해당 OTP번호를 <br /> 입력해주세요.
				</div>
			),
			image: otpInput,
		},
	];

	return (
		<Wrapper>
			<div className="background">
				<div className="boxes">
					{boxes.map((box) => (
						<div
							key={box.id}
							className={`box ${activeBox === box.id ? 'active' : ''}`}
							onMouseEnter={() => setActiveBox(box.id)}
							onMouseLeave={() => setActiveBox(0)}
						>
							<img className={box.className} src={box.image} alt={`박스${box.id}`} />
							{activeBox === box.id && <div className="description">{box.description}</div>}
							<span className="box-name">{box.name}</span>
						</div>
					))}
				</div>
			</div>
		</Wrapper>
	);
}

export default AppHowToUse;
