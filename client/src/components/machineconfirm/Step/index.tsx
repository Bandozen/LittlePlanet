import React, { useEffect, useState } from 'react';
import api from 'api';
import useMovePage from 'hooks/useMovePage';
import loadingImage from 'assets/images/livecam_loading.jpg';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';

function Step() {
	const [activeStep, setActiveStep] = useState(1);
	const [movepage] = useMovePage();
	const [studentInfo, setStudentInfo] = useState([]);

	async function getStudentInfo() {
		await api
			.get('/student')
			.then((res) => {
				console.log(res.data);
				setStudentInfo(res.data[0]);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const testClick = () => {
		if (activeStep === 5) {
			movepage('/simulationplay');
		} else {
			setActiveStep(activeStep + 1);
		}
	};

	useEffect(() => {
		getStudentInfo();
	}, [activeStep]);

	console.log(studentInfo);

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
					{activeStep === 1 ? <p>안녕하세요</p> : <img className="loading" src={loadingImage} alt="이미지 없음." />}
				</div>
			</div>
			<button type="button" onClick={testClick}>
				다음
			</button>
		</Wrapper>
	);
}

export default Step;
