import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import SimulationChat from 'components/simsulationplay/SimulationChat';
import Button from 'components/common/Button';
import { SeqOneWrapper } from './style';

interface ISeqOneProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqOne(props: ISeqOneProps) {
	const [showNarr, setShowNarr] = useState(true);
	const { setStep } = props;

	const testClick = () => {
		setStep(1);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowNarr(false);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<SeqOneWrapper>
			{showNarr ? (
				<div className="alert-container">
					<Alert>
						<Typography variant="h3">이제 소방관에게 위치를 알려줘야 해. 먼저 주변을 살펴볼까?</Typography>
					</Alert>
				</div>
			) : (
				<div className="simulation-container">
					<SimulationChat chatNumber={1} text="거기 위치가 어디인가요?" />
				</div>
			)}
			<Button text="테스트버튼입니다." handleClick={() => testClick()} />
		</SeqOneWrapper>
	);
}

export default SeqOne;
