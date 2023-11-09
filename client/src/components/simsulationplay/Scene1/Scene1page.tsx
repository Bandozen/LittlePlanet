import React, { useState, useEffect } from 'react';
import { Alert, Typography, Button } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useRecoilValue } from 'recoil';
import api from '../../../api';
import { CallGPT } from '../gpt/gpt';
import { userEmail } from '../../../store/RecoilState';
import { Scene1Wrapper } from './style';
import SimulationChat from '../SimulationChat/index';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// 친구가 다쳤어요.
function Scene1page() {
	// 1. 화면
	// asset 불러오기.
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=1');
			setContentsData(contentsResponse.data);
			console.log(contentsData);
		} catch (e) {
			console.log(e);
		}
	};

	// 지시문 Alert 5초 타이머 걸기 위함
	const [showAlert, setShowAlert] = useState(true);

	// 2. 소켓
	// 소켓 통신을 위한 메일 받아오고, 소켓 관련 초기 설정하기
	const memberEmail = useRecoilValue(userEmail);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	// 소켓 통해 app에서 받아오는 사용자 음성 저장하기
	const [text, setText] = useState('');

	// 오답 시 alert 띄우고, 정답 script 보여주기.
	const [isWrong, setIsWrong] = useState(false);
	const answer = '친구가 높은 곳에서 뛰어내려서 많이 다쳤어요.';

	// 오답이라면 소방관과의 대화도 변경되어야 함.
	const [wrongSignal, setWrongSignal] = useState(false);

	// 처음 컴포넌트가 마운트되면,
	useEffect(() => {
		// asset 불러오고
		fetchData();

		// 5초 타이머 설정해서 Alert
		const timer = setTimeout(() => {
			setShowAlert(false);
		}, 3000);

		// 소켓 연결
		// const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');
		// const newSocket = new WebSocket('ws://192.168.100.38:7777');
		const newSocket = new WebSocket('ws://192.168.100.85:7777');

		// 소켓 열리면
		newSocket.onopen = () => {
			// useEffect 바깥에서도 socket 사용하기 위해 setSocket(newSocket)하고 메일 보내두기
			setSocket(newSocket);
			const handShake = {
				type: 'web',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handShake));
		};

		// 소켓에 메시지 들어오면
		newSocket.onmessage = (event) => {
			console.log(event.data);
			const eventMessage = JSON.parse(event.data);
			// 타입 확인 후 setText
			if (eventMessage.type === 'text') {
				setText(eventMessage.content);
			}
			if (eventMessage.type === 'wrong') {
				setWrongSignal(true);
			}
		};

		// 소켓 닫히면
		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		// 컴포넌트 닫히면 소켓 닫기
		return () => {
			newSocket.close();
			clearTimeout(timer);
		};
	}, []);

	// 3.GPT
	// 만일 text가 바뀌면 gpt에 요청을 보내야 함.
	useEffect(() => {
		console.log('텍스트 변경');
		console.log('여기', text);
		if (text) {
			const prompt = {
				role: 'user',
				content: `1. [GOAL] : Let the firefighters know that your friend is injured. 2. [FIREFIGHTER'S QUESTION] : 네, 119입니다. 무슨 일이시죠? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
			};
			CallGPT(prompt)
				.then((isCorrect) => {
					if (isCorrect) {
						const message = {
							type: 'page',
							content: 2,
						};
						socket?.send(JSON.stringify(message));
					} else {
						const message = {
							type: 'wrong',
						};
						setIsWrong(true);
						setText('');
						socket?.send(JSON.stringify(message));
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [text]);

	// 4. 오답 가이드라인 alert 타이머 추가
	useEffect(() => {
		let alertTimer: any;
		if (isWrong) {
			alertTimer = setTimeout(() => {
				setIsWrong(false);
			}, 3000);
		}
		return () => {
			if (alertTimer) clearTimeout(alertTimer);
		};
	}, [isWrong]);

	const handleClickWrongAnswer = () => {
		setIsWrong((prev) => !prev);
	};

	const handleClickSetText = () => {
		setText('선생님이 다쳤어요.');
	};

	const handleCorrectAnswer = () => {
		setText('친구가 높은 곳에서 떨어져서 다쳤어요.');
	};

	return (
		<Scene1Wrapper>
			<Button onClick={handleClickWrongAnswer}>오답</Button>
			<Button onClick={handleClickSetText}>오답 한번 보내보자.</Button>
			<Button onClick={handleCorrectAnswer}>정답 한번 보내보자.</Button>
			{showAlert && (
				<div className="alert-container">
					<Alert>
						<Typography variant="h3">다친 친구가 있다는 사실을 소방관에게 알려줘!</Typography>
					</Alert>
				</div>
			)}
			{!showAlert && !isWrong && !wrongSignal && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '네, 119입니다. 무슨 일이시죠?'} />
			)}
			{isWrong && (
				<div className="wrong-container">
					<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
						<div className="flex flex-row items-center m-2">
							<SparklesIcon className="w-5 h-5 mr-2" color="yellow" />
							<Typography variant="h4" color="yellow">
								이렇게 말해볼까?
							</Typography>
						</div>
						<div className="flex flex-row items-center m-2">
							<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
							<Typography variant="h3">{answer}</Typography>
						</div>
					</Alert>
				</div>
			)}
			{!showAlert && !isWrong && wrongSignal && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '다시 한번 얘기해줄래요?'} />
			)}
		</Scene1Wrapper>
	);
}

export default Scene1page;
