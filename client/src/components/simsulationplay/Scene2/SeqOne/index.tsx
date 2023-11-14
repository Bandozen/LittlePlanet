import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { SeqOneWrapper } from './style';

interface ISeqOneProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqOne(props: ISeqOneProps) {
	const [showNarr, setShowNarr] = useState(true);
	const { setStep } = props;

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowNarr(false);
		}, 3000);

		const nextSeqTimer = setTimeout(() => {
			setStep(1);
		}, 15000);

		return () => {
			clearTimeout(timer);
			clearTimeout(nextSeqTimer);
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
				<div className="background-image left-right original" />
			)}
		</SeqOneWrapper>
	);
}

export default SeqOne;
