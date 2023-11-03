import React, { useState, useEffect } from 'react';
import { Alert, Typography, Button } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../api';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// function Scene5page({ onNextScene }: { onNextScene: () => void }) {
function Scene5page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [isWrong, setIsWrong] = useState(true);

	// 구조물 만졌을 때 구조물 seq로 touched 바꾸고, setIsTouched(true)
	// const [touched, setTouched] = useState('');
	// const [isTouched, setIsTouched] = useState(false);
	const touched = 1;

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=4');
			setContentsData(contentsResponse.data);
			console.log(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [message, setMessage] = useState(`${touched}`);

	useEffect(() => {
		fetchData();

		const newSocket = new WebSocket('ws://localhost:7777');

		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);
		};

		// 받아온 메시지는 사용자 답변의 정답 여부
		newSocket.onmessage = (event) => {
			console.log(event.data);
			console.log(event.data === 'You sent: 1');
			if (event.data === 'Y') {
				// 부모 컴포넌트에 다음 씬으로 넘어가라는 신호 발송
				// onNextScene();
				setIsWrong(false);
			} else {
				setIsWrong(true);
			}
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
		};
	}, []);

	const handleSendMessage = () => {
		setMessage(`${touched}`);
		if (socket && message) {
			socket.send(message);
			setMessage('');
		}
	};

	return (
		<>
			{/* 배경, 캐릭터, 주변 */}
			<Alert variant="outlined">
				{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
				이제 소방관에게 위치를 알려줘야 해. 먼저 주변을 살펴볼까?
			</Alert>
			{/* 구조물 터치하면 구조물 확대하고 터치된 구조물 seq로 touched 변경 */}
			{/* <Alert open={isTouched}> */}
			<Alert>
				<Typography variant="h3">확인한 위치를 소방관에게 알려줘!</Typography>
			</Alert>
			<Button onClick={handleSendMessage}>소켓1</Button>
			<Button onClick={handleSendMessage}>소켓2</Button>
			{/* 소켓에서 받아온 메시지에 따라 isWrong 설정하고 스크립트 보여주기 */}
			<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
				<div className="flex flex-row m-3">
					<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
					<Typography variant="h3">이렇게 말해볼까?</Typography>
				</div>
				{touched === 1 ? (
					<div className="flex flex-row items-center">
						<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
						<Typography variant="h5">여기는 소행성로 203이에요.</Typography>
					</div>
				) : (
					<div className="flex flex-row items-center m-3">
						<PhoneArrowUpRightIcon className="w-7 h-7 mr-2" />
						<Typography variant="h5">여기는 삼성스토어 소행성지점 근처에요.</Typography>
					</div>
				)}
			</Alert>
		</>
	);
}

export default Scene5page;
