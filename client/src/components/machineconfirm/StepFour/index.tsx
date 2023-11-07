import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import loadingImage from 'assets/images/livecam_loading.jpg';
import Button from 'components/common/Button';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';
import { userEmail } from '../../../store/RecoilState';

interface IStepFourProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function StepFour(props: IStepFourProps) {
	const { setStep } = props;
	const [activeStep, setActiveStep] = useState(4);
	const [isDone, setIsDone] = useState(false);
	const [image, setImage] = useState(loadingImage);
	const userMail = useRecoilValue(userEmail);

	const testClick = () => {
		if (!isDone) {
			setStep(4);
			setActiveStep(5);
		}
	};

	useEffect(() => {
		if (activeStep === 4) {
			setIsDone(false);
		}
	}, [activeStep]);

	useEffect(() => {
		const socket = io('wss://k9c203.p.ssafy.io:18099', {
			extraHeaders: {
				userMail,
			},
			secure: true,
		});

		socket.on('image', (data) => {
			if (image !== data.url) {
				setImage(data.url);
				console.log(data);
			}
		});

		return () => {
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userMail]);

	return (
		<Wrapper>
			<div>
				<CheckStep activeStep={activeStep} checkNum={1} message="학생 선택" />
				<CheckStep activeStep={activeStep} checkNum={2} message="캐릭터 선택" />
				<CheckStep activeStep={activeStep} checkNum={3} message="카메라 위치 확인" />
				<CheckStep activeStep={activeStep} checkNum={4} message="캐릭터 연동 확인" />
				<CheckStep activeStep={activeStep} checkNum={5} message="시작하기!" />
			</div>
			<div className="image-wrapper">
				<img className="loading" src={image} alt="" />
			</div>
			<Button text="다음" handleClick={() => testClick()} />
		</Wrapper>
	);
}

export default StepFour;
