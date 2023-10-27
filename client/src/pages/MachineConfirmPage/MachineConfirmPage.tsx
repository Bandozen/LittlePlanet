import React from 'react';
import StepOne from 'components/machineconfirm/StepOne';
import { Wrapper } from './style';

function MachineConfirmPage() {
	return (
		<Wrapper>
			<h1 className="title">시작하기 전 확인해주세요!</h1>
			<StepOne />
		</Wrapper>
	);
}

export default MachineConfirmPage;
