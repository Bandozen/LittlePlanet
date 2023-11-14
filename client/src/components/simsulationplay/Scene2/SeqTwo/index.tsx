import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Alert, Button, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CharacterDisplay from 'components/CharacterDisplay';
import { userEmail } from 'store/RecoilState';
import ShineLottie from 'components/Lottie/ShineLottie';
import PointRightLottie from 'components/Lottie/PointRightLottie';
import PointLeftLottie from 'components/Lottie/PointLeftLottie';
import { SeqTwoWrapper } from './style';

interface ISeqTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqTwo(props: ISeqTwoProps) {
	const { setStep } = props;

	const memberEmail = useRecoilValue(userEmail);

	// 캐릭터 초기 위치세팅
	const [left, setLeft] = useState(500);
	const [rightHandX, setRightHandX] = useState(0);
	const [rightHandY, setRightHandY] = useState(0);
	const [leftHandX, setLeftHandX] = useState(0);
	const [leftHandY, setLeftHandY] = useState(0);
	let imgleft = 500;

	const [hwsocket, setHWSocket] = useState<WebSocket | null>(null);

	// 장소 위치 세팅
	const [littleplanetInfo, setLittleplanetInfo] = useState(false);
	const [buildingInfo, setBuildingInfo] = useState(false);

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
		const timer = setTimeout(() => {
			setStep(2);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	};

	useEffect(() => {
		const moveSocket = new WebSocket('wss://k9c203.p.ssafy.io:17776');

		moveSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setHWSocket(moveSocket);
		};

		// 소켓에 메시지 들어오면
		moveSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			if (eventMessage.type === 'HW') {
				if (eventMessage.movedir === 'left') {
					imgleft -= 10;
					setLeft(imgleft);
				} else if (eventMessage.movedir === 'right') {
					imgleft += 10;
					setLeft(imgleft);
				}
				setRightHandX(Number(imgleft) + Number(eventMessage.righthandX / 2));
				setRightHandY(340 - Number(eventMessage.righthandY / 2));
				setLeftHandX(Number(imgleft) + Number(eventMessage.lefthandX / 2));
				setLeftHandY(340 - Number(eventMessage.lefthandY / 2));
				console.log(rightHandX, rightHandY, leftHandX, leftHandY);
			}
		};

		moveSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			moveSocket.close();
		};
	}, []);

	// 소켓이 등록되고 난 뒤 useEffect
	useEffect(() => {
		// 소켓이 있다면
		if (hwsocket) {
			// 핸드세이크 메세지 설정 후 JSON 변환 후 보내기
			const handShake = {
				type: 'HW',
				email: memberEmail,
			};

			hwsocket.send(JSON.stringify(handShake));
		}
	}, [hwsocket]); // socket가 변경될 때 : 즉 소켓에 설정한 링크로 변경 됐을 때 자동으로 실행

	useEffect(() => {
		if (rightHandX >= 1300 && rightHandX <= 1400 && rightHandY >= 100 && rightHandY <= 310 && !littleplanetInfo) {
			littlePlanet();
		}
		if (leftHandX >= 1300 && leftHandX <= 1400 && leftHandY >= 100 && leftHandY <= 310 && !littleplanetInfo) {
			littlePlanet();
		}
		if (rightHandX >= 250 && rightHandX <= 350 && rightHandY >= 100 && rightHandY <= 310 && !buildingInfo) {
			samsungBuilding();
		}
		if (leftHandX >= 250 && leftHandX <= 350 && leftHandY >= 100 && leftHandY <= 310 && !buildingInfo) {
			samsungBuilding();
		}
	}, [rightHandX, rightHandY, leftHandX, leftHandY]);

	return (
		<SeqTwoWrapper>
			<Button onClick={littlePlanet}>소행성로</Button>
			<Button onClick={samsungBuilding}>삼성빌딩</Button>
			<div style={{ position: 'absolute', left: `${left}px`, bottom: '100px', width: '320px', height: '240px' }}>
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
			<div
				style={{
					position: 'absolute',
					left: `1300px`,
					bottom: '180px',
					width: '100px',
					height: '180px',
					backgroundColor: 'rgba( 255, 255, 255, 0.5 )',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: `250px`,
					bottom: '180px',
					width: '100px',
					height: '180px',
					backgroundColor: 'rgba( 255, 255, 255, 0.5 )',
				}}
			/>
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
