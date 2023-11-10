import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import api from 'api';
import { useRecoilValue } from 'recoil';
import manImage from 'assets/images/realman.png';
import womanImage from 'assets/images/realwoman.png';
import Button from 'components/common/Button';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';
import { userEmail } from '../../../store/RecoilState';

interface IStepTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function StepTwo(props: IStepTwoProps) {
	const { setStep } = props;
	const [activeStep, setActiveStep] = useState(2);
	const [num, setNum] = useState(0);
	const [picChange, setPicChange] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const userMail = useRecoilValue(userEmail);

	const changeClick = () => {
		if (!picChange) {
			setPicChange(true);
			setNum(1);
		} else {
			setPicChange(false);
			setNum(0);
		}
	};

	const testClick = async () => {
		if (!isDone) {
			setStep(2);
			setActiveStep(3);
			await api.post('/member/command', {
				memberEmail: userMail,
				memberCommand: 'cam',
			});
		}
	};
	console.log(userMail);

	useEffect(() => {
		if (activeStep === 2) {
			setIsDone(false);
		}
	}, [activeStep]);

	return (
		<Wrapper>
			<div>
				<CheckStep activeStep={activeStep} checkNum={1} message="학생 선택" />
				<CheckStep activeStep={activeStep} checkNum={2} message="캐릭터 선택" />
				<CheckStep activeStep={activeStep} checkNum={3} message="카메라 위치 확인" />
				<CheckStep activeStep={activeStep} checkNum={4} message="캐릭터 연동 확인" />
				<CheckStep activeStep={activeStep} checkNum={5} message="시작하기!" />
			</div>
			<div>
				{num === 0 ? (
					<div className="image-wrapper">
						<img src={manImage} alt="남자이미지" />
						<Button text="다음" handleClick={() => changeClick()} />
					</div>
				) : (
					<div className="image-wrapper">
						<img src={womanImage} alt="여자이미지" />
						<Button text="다음" handleClick={() => changeClick()} />
					</div>
				)}
			</div>
			<Button text="다음" handleClick={() => testClick()} />
		</Wrapper>
	);
}

export default StepTwo;
