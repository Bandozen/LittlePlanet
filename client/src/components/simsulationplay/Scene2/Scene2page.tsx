import React, { useState, useEffect } from 'react';
import { Alert, Typography, Button } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../../api';
import { Scene2Wrapper } from './style';
import { CallGPT } from '../gpt/gpt';
import SimulationChat from '../SimulationChat';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// #Scene2. <여기 위치는요>
function Scene2page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [isWrong, setIsWrong] = useState(false);
	const [location, setLocation] = useState(false);

	const memberEmail = useRecoilValue(userEmail);

	// 나레이션 문구
	const [showNarr, setShowNarr] = useState(true);
	const [showNarr2, setShowNarr2] = useState(true);

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=2');
			setContentsData(contentsResponse.data);
			console.log(contentsData);
		} catch (e) {
			console.log(e);
		}
	};

	const [socket, setSocket] = useState<WebSocket | null>(null);

	// 사용자 음성 받아오기
	const [text, setText] = useState('');

	useEffect(() => {
		fetchData();

		const timer = setTimeout(() => {
			setShowNarr(false);
		}, 5000);

		// 소켓 연결 부분(ip주소 및 배포주소)
		const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');
		// const newSocket = new WebSocket('ws://192.168.100.36:7777');
		// const newSocket = new WebSocket('ws://192.168.100.38:7777');

		newSocket.onopen = () => {
			setSocket(newSocket);
			const handshake = {
				type: 'web',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handshake));
		};

		// 받아온 메시지는 사용자 답변의 정답 여부
		newSocket.onmessage = (event) => {
			console.log(event.data);
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
			clearTimeout(timer);
		};
	}, []);

	// GPT
	useEffect(() => {
		console.log('GPT의 텍스트가 변경됬습니다.');
		if (text) {
			const prompt = {
				role: 'user',
				content: `1. [GOAL] : Let the firefighters know where you are. 2. [FIREFIGTER'S QUESTION] : 학생, 지금 어디에요? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
			};
			CallGPT(prompt)
				.then((isAnswer) => {
					if (isAnswer) {
						const message = {
							type: 'page',
							content: 3,
						};
						socket?.send(JSON.stringify(message));
					} else {
						const message = {
							type: 'wrong',
						};
						setIsWrong(true);
						socket?.send(JSON.stringify(message));
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [text]);

	const changeLocation = () => {
		setLocation((prev) => !prev);
	};

	const changeNarration = () => {
		setShowNarr2(false);
	};

	const clickWrongAnswer = () => {
		setIsWrong((prev) => !prev);
	};

	const clickSetText = () => {
		setText('여기 어딘지 모르겠어요');
	};

	const clickCorrectAnswer = () => {
		setText('여기 소행성로 203 근처에요!');
	};

	console.log(text);
	console.log(isWrong);

	return (
		<Scene2Wrapper>
			<div className="background-image zoom left-right">
				{/* Test 버튼들 */}
				<Button onClick={changeLocation}>장소바꾸기</Button>
				<Button onClick={changeNarration}>내레이션바꾸기</Button>
				<Button onClick={clickWrongAnswer}>오답으로 바꾸기</Button>
				<Button onClick={clickSetText}>오답으로 보내기</Button>
				<Button onClick={clickCorrectAnswer}>정답으로 보내기</Button>
				{/* 배경, 캐릭터, 주변 */}
				{showNarr ? (
					<div className="alert-container">
						<Alert>
							<Typography variant="h3">이제 소방관에게 위치를 알려줘야 해. 먼저 주변을 살펴볼까?</Typography>
						</Alert>
					</div>
				) : (
					<SimulationChat chatNumber={text ? 2 : 1} text={text || '거기 위치가 어디인가요?'} />
				)}
				{showNarr2 && (
					<div className="alert-container">
						<Alert>
							<Typography variant="h3">확인한 위치를 소방관에게 알려줘!</Typography>
						</Alert>
					</div>
				)}
				{/* 소켓에서 받아온 메시지에 따라 isWrong 설정하고 스크립트 보여주기 */}
				<div className="wrong-container">
					<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
						<div className="flex flex-row m-3">
							<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
							<Typography variant="h3">이렇게 말해볼까?</Typography>
						</div>
						{location ? (
							<div className="flex flex-row items-center">
								<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
								<Typography variant="h5">여기는 소행성로 203 근처에요.</Typography>
							</div>
						) : (
							<div className="flex flex-row items-center m-3">
								<PhoneArrowUpRightIcon className="w-7 h-7 mr-2" />
								<Typography variant="h5">여기는 삼성스토어 소행성지점 근처에요.</Typography>
							</div>
						)}
					</Alert>
				</div>
			</div>
		</Scene2Wrapper>
	);
}

export default Scene2page;
