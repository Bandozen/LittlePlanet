import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import loadingImage from 'assets/images/livecam_loading.jpg';
import useMovePage from 'hooks/useMovePage';
import Button from 'components/common/Button';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';

interface IStepFiveProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function StepFive(props: IStepFiveProps) {
	const { setStep } = props;
	const [activeStep, setActiveStep] = useState(5);
	const [isDone, setIsDone] = useState(false);
	const [movePage] = useMovePage();

	const testClick = () => {
		if (!isDone) {
			setStep(5);
			setActiveStep(6);
			movePage('/simulationplay');
		}
	};

	useEffect(() => {
		if (activeStep === 5) {
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
			<div className="image-wrapper">
				<img className="loading" src={loadingImage} alt="이미지 없음." />
			</div>
			<Button text="다음" handleClick={() => testClick()} />
		</Wrapper>
	);
}

export default StepFive;
