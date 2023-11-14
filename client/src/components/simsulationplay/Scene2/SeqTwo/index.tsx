import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, Button, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CharacterDisplay from 'components/CharacterDisplay';
import ShineLottie from 'components/Lottie/ShineLottie';
import PointRightLottie from 'components/Lottie/PointRightLottie';
import PointLeftLottie from 'components/Lottie/PointLeftLottie';
import { SeqTwoWrapper } from './style';

interface ISeqTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqTwo(props: ISeqTwoProps) {
	const { setStep } = props;

	// 캐릭터 초기 위치세팅
	const [left, setLeft] = useState(500);

	// 장소 위치 세팅
	const [littleplanetInfo, setLittleplanetInfo] = useState(false);
	const [buildingInfo, setBuildingInfo] = useState(false);

	const handleLeft = () => setLeft((prevLeft) => prevLeft - 5);
	const handleRight = () => setLeft((prevLeft) => prevLeft + 5);

	const littlePlanet = () => {
		setLittleplanetInfo((prev) => !prev);
		const timer = setTimeout(() => {
			setStep(2);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	};

	const samsungBuilding = () => {
		setBuildingInfo((prev) => !prev);
	};

	return (
		<SeqTwoWrapper>
			<Button onClick={handleLeft}>왼쪽</Button>
			<Button onClick={handleRight}>오른쪽</Button>
			<Button onClick={littlePlanet}>소행성로</Button>
			<Button onClick={samsungBuilding}>삼성빌딩</Button>
			<div style={{ position: 'absolute', left: `${left}px` }}>
				<CharacterDisplay />
			</div>
			<div style={{ position: 'absolute' }}>
				<ShineLottie />
			</div>
			<div style={{ position: 'absolute' }} className="left-point">
				<PointLeftLottie />
			</div>
			<div style={{ position: 'absolute' }} className="right-point">
				<PointRightLottie />
			</div>
			{littleplanetInfo && (
				<div className="alert-container">
					<Alert className="flex justify-center">
						<div className="flex flex-row items-center m-2">
							<InformationCircleIcon className="w-8 h-8 mr-2" color="yellow" />
							<Typography variant="h3">여기는 소행성로 203번이에요.</Typography>
						</div>
						<div className="flex justify-center">
							<Typography variant="h6">잘 기억해뒀다가 소방관에게 알려주세요!</Typography>
						</div>
					</Alert>
				</div>
			)}
			{buildingInfo && (
				<div className="alert-container">
					<Alert className="flex justify-center">
						<div className="flex flex-row items-center m-2">
							<InformationCircleIcon className="w-8 h-8 mr-2" color="yellow" />
							<Typography variant="h3">여기는 삼성스토어 소행성지점 근처에요.</Typography>
						</div>
						<div className="flex justify-center">
							<Typography variant="h6">잘 기억해뒀다가 소방관에게 알려주세요!</Typography>
						</div>
					</Alert>
				</div>
			)}
		</SeqTwoWrapper>
	);
}

export default SeqTwo;
