import React, { useEffect, useState } from 'react';
import TestLayout from 'layouts/TestLayout';

function MachineConfirmPage() {
	const [step, setStep] = useState(0);
	const [stepView, setStepView] = useState(<div />);

	console.log(step);

	useEffect(() => {
		switch (step) {
			case 0: {
				setStepView(<div>페이지1</div>);
				break;
			}
			case 1: {
				setStepView(<div>페이지2</div>);
				break;
			}
			case 2: {
				setStepView(<div>페이지3</div>);
				break;
			}
			case 3: {
				setStepView(<div>페이지4</div>);
				break;
			}
			case 4: {
				setStepView(<div>페이지5</div>);
				break;
			}
			default: {
				setStepView(<div>에러페이지입니다.</div>);
				break;
			}
		}
	}, [step]);

	const testClick = () => {
		setStep(step + 1);
	};

	return (
		<div>
			<h1>시작하기 전 확인해주세요!</h1>
			<button type="button" onClick={testClick}>
				테스트입니다.
			</button>
			<TestLayout StepView={stepView} />
		</div>
	);
}

export default MachineConfirmPage;
