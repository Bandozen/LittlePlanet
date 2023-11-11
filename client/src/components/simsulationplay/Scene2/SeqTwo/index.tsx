import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import Button from 'components/common/Button';

import { SeqTwoWrapper } from './style';

interface ISeqTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqTwo(props: ISeqTwoProps) {
	const { setStep } = props;

	const [showNarr, setShowNarr] = useState(false);

	const testClick = () => {
		setStep(2);
	};

	const narrClick = () => {
		setShowNarr((prev) => !prev);
	};

	return (
		<SeqTwoWrapper>
			<div className="background-image zoom left-right original">
				<Button text="내레이션버튼입니다." handleClick={() => narrClick()} />
				<Button text="테스트버튼입니다." handleClick={() => testClick()} />
				{showNarr && (
					<div className="alert-container">
						<Alert>
							<Typography variant="h3">확인한 위치를 소방관에게 알려줘!</Typography>
						</Alert>
					</div>
				)}
			</div>
		</SeqTwoWrapper>
	);
}

export default SeqTwo;
