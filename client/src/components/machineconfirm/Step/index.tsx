import React, { useState } from 'react';
import loadingImage from 'assets/images/livecam_loading.jpg';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';

function Step() {
	const [activeStep, setActiveStep] = useState(1);

	const testClick = () => {
		if (activeStep === 5) {
			setActiveStep(1);
		} else {
			setActiveStep(activeStep + 1);
		}
	};

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
				<div className="image-wrapper">
					<img className="loading" src={loadingImage} alt="이미지 없음." />
				</div>
			</div>
			<button type="button" onClick={testClick}>
				다음
			</button>
		</Wrapper>
	);
}

export default Step;
