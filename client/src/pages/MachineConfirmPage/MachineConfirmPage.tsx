import React from 'react';
import Step from 'components/machineconfirm/Step';
import { Wrapper } from './style';

function MachineConfirmPage() {
	return (
		<Wrapper>
			<h1 className="title">시작하기 전 확인해주세요!</h1>
			<Step />
		</Wrapper>
	);
}

export default MachineConfirmPage;
