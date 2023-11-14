import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Button, Typography } from '@material-tailwind/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import CharacterDisplay from 'components/CharacterDisplay';
import ShineLottie from 'components/Lottie/ShineLottie';
import PointRightLottie from 'components/Lottie/PointRightLottie';
import PointLeftLottie from 'components/Lottie/PointLeftLottie';
import { useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
import { SeqTwoWrapper } from './style';

interface ISeqTwoProps {
	setStep: Dispatch<SetStateAction<number>>;
	setAddress: Dispatch<SetStateAction<string>>;
}

function SeqTwo(props: ISeqTwoProps) {
	const { setStep, setAddress } = props;

	const [socket, setSocket] = useState<WebSocket | null>(null);
	const memberEmail = useRecoilValue(userEmail);

	// 캐릭터 초기 위치세팅
	const [left, setLeft] = useState(500);

	// 장소 위치 세팅
	const [littleplanetInfo, setLittleplanetInfo] = useState(false);
	const [buildingInfo, setBuildingInfo] = useState(false);

	const handleLeft = () => setLeft((prevLeft) => prevLeft - 5);
	const handleRight = () => setLeft((prevLeft) => prevLeft + 5);

	const littlePlanet = () => {
		setLittleplanetInfo((prev) => !prev);

		const message = {
			type: 'address',
			content: '소행성로',
		};

		setAddress(message.content);

		socket?.send(JSON.stringify(message));

		const timer = setTimeout(() => {
			setStep(2);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	};

	const samsungBuilding = () => {
		setBuildingInfo((prev) => !prev);

		const message = {
			type: 'address',
			content: '삼성스토어',
		};
		socket?.send(JSON.stringify(message));

		const timer = setTimeout(() => {
			setStep(2);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	};

	useEffect(() => {
		// 소켓 연결 부분(ip주소 및 배포주소)
		const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');
		// const newSocket = new WebSocket('ws://192.168.100.36:7777');
		// const newSocket = new WebSocket('ws://192.168.100.38:7777');
		// const newSocket = new WebSocket('ws://localhost:7777');

		newSocket.onopen = () => {
			setSocket(newSocket);
			const handshake = {
				type: 'web',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handshake));
		};

		console.log(socket);

		// 받아온 메시지는 사용자 답변의 정답 여부
		newSocket.onmessage = (event) => {
			console.log(event.data);
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
		};
	}, []);

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
