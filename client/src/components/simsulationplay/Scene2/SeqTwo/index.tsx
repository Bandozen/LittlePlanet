import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '@material-tailwind/react';
import Button1 from 'components/common/Button';
import CharacterDisplay from 'components/CharacterDisplay';
import { SeqTwoWrapper } from './style';

interface ISeqTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqTwo(props: ISeqTwoProps) {
	const { setStep } = props;

	// 캐릭터 초기 위치세팅
	const [left, setLeft] = useState(500);

	const handleLeft = () => setLeft((prevLeft) => prevLeft - 5);
	const handleRight = () => setLeft((prevLeft) => prevLeft + 5);

	const testClick = () => {
		setStep(2);
	};

	return (
		<SeqTwoWrapper>
			<Button onClick={handleLeft}>왼쪽</Button>
			<Button onClick={handleRight}>오른쪽</Button>
			<Button1 text="테스트버튼입니다." handleClick={() => testClick()} />
			<div style={{ position: 'absolute', left: `${left}px` }}>
				<CharacterDisplay />
			</div>
		</SeqTwoWrapper>
	);
}

export default SeqTwo;
