import React, { ReactNode } from 'react';

interface ITestLayoutProps {
	StepView: ReactNode;
}

function TestLayout(props: ITestLayoutProps) {
	const { StepView } = props;
	return (
		<div>
			<div>{StepView}</div>
		</div>
	);
}

export default TestLayout;
