import React, { useState, useEffect } from 'react';
import { Alert, Button, Typography } from '@material-tailwind/react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../../api';
import { CallGPT } from '../gpt/gpt';
import SimulationChat from '../SimulationChat/index';
import { useRecoilValue } from 'recoil';
import { userEmail } from '../../../store/RecoilState';
import { Scene3Wrapper } from './style3';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// 다리를 다쳐서 피가 나요.
function Scene3page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	// 화면 첫번째 나레이션을 나타내고 없애주기 위한 변수
	const [firstNarr, setFirstNarr] = useState(true);
	// 친구에게 도달했을 때 상황을 나타내기 위한 변수
	const [arrived, setArrived] = useState(false);
	// 친구 모습을 확대하기 위한 변수
	const [zoom, setZoom] = useState(false);
	// 소방관 대화를 나타내기 위한 변수
	const [firefighter, setFirefighter] = useState(false);
	// stt 텍스트를 받기 위한 변수
	const [text, setText] = useState('');
	// const answer = '다리를 다쳐서 피가 많이 나요.';
	// 답변이 틀렸다는 것을 나타내기 위한 변수
	const [isWrong, setIsWrong] = useState(false);
	const memberEmail = useRecoilValue(userEmail);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=3');
			setContentsData(contentsResponse.data);
			console.log(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};
	// 웹소켓에서 메세지를 받고 그 메세지 값에 따라 다르게 실행하는 함수 설정
	function getMessage(message: string) {
		// 메세지를 mes 변수에 JSON 파싱한것을 변환
		const mes = JSON.parse(message);
		console.log(mes);
		if (mes.type === 'web') {
			console.log('web에서 접속한거임');
		}
		if (mes.type === 'narr' && mes.content === 'first') {
			setFirstNarr(false);
		}
		if (mes.type === 'arrive' && mes.content === 'friend') {
			// 친구 화면 확대
			setZoom(true);
			setTimeout(() => {
				//  두번째 나레이션(친구가 어디가 다쳤는지 알려주기) 표시
				setArrived(true);
			}, 3000);
		}
		if (mes.type === 'text') {
			setText(mes.content);
		}
		if (mes.type === 'wrong') {
			setIsWrong(true);
		}
	}

	useEffect(() => {
		fetchData();

		const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');
		// const newSocket = new WebSocket('ws://192.168.100.38:7777');
		// const newSocket = new WebSocket('ws://localhost:7777');

		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);
		};

		newSocket.onmessage = (event) => {
			getMessage(event.data);
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};
		// 컴포넌트가 렌더링되고 3초 뒤 첫번째 나레이션 자동으로 사라지게 하기
		setTimeout(() => {
			setFirstNarr(false);
		}, 3000);
		return () => {
			newSocket.close();
		};
	}, []);
	// 소켓이 등록되고 난 뒤 useEffect
	useEffect(() => {
		// 소켓이 있다면
		if (socket) {
			// 핸드세이크 메세지 설정 후 JSON 변환 후 보내기
			const handshakemessage = {
				type: 'web',
				// 후에 이메일 recoil로 받아오는 작업 필요
				content: memberEmail,
			};

			socket.send(JSON.stringify(handshakemessage));
		}
	}, [socket]); // socket가 변경될 때 : 즉 소켓에 설정한 링크로 변경 됐을 때 자동으로 실행
	useEffect(() => {
		if (text) {
			const prompt = {
				role: 'user',
				content: `1. [GOAL] : Let the firefighters know where friend got hurt 2. [FIREFIGHTER'S QUESTION] : 친구가 어디를 다쳤나요? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
			};
			CallGPT(prompt)
				.then((isCorrect) => {
					if (isCorrect) {
						const message = {
							type: 'page',
							content: 4,
						};
						setIsWrong(false);
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
	useEffect(() => {
		if (arrived) {
			setTimeout(() => {
				setArrived(false);
				setFirefighter(true);
			}, 3000);
		}
	}, [arrived]);
	const arrive = () => {
		if (socket) {
			const message = { type: 'arrive', content: 'friend' };
			socket.send(JSON.stringify(message));
		}
	};

	return (
		<Scene3Wrapper>
			<div className={`${zoom ? 'background-zoomed' : 'background-image'}`}>
				<Button
					type="button"
					onClick={() => {
						setText('친구가 아픈척 해요!');
					}}
				>
					오답
				</Button>
				<Button
					type="button"
					onClick={() => {
						setText('친구 다리에 피가 나요');
						// const nextPage = { type: 'page', content: 4 };
						// socket?.send(JSON.stringify(nextPage));
					}}
				>
					정답
				</Button>
				<Button
					type="button"
					onClick={() => {
						arrive();
					}}
				>
					친구한테 도착했을 때
				</Button>

				{firstNarr && (
					<Alert variant="outlined">
						{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
						<Typography variant="h3">
							이제 소방관에게 친구가 어디를 다쳤는지 알려줘야 해. 친구에게 다가가 볼까?
						</Typography>
					</Alert>
				)}
				{/* 구조물 터치하면 구조물 확대하고 터치된 구조물 seq로 touched 변경 */}
				{/* <Alert open={isTouched}> */}
				{arrived && (
					<Alert>
						<Typography variant="h3">친구가 어디를 다쳤는지 소방관에게 설명해줘!</Typography>
					</Alert>
				)}
				{firefighter && !isWrong && (
					<SimulationChat chatNumber={text ? 2 : 1} text={text || '친구가 어디를 다쳤나요?'} />
				)}
				{firefighter && isWrong && <SimulationChat chatNumber={text ? 2 : 1} text={text || '다시 한번 말해줄래요?'} />}
				{/* 소켓에서 받아온 메시지에 따라 isWrong 설정하고 스크립트 보여주기 */}
				<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
					<div className="flex flex-row m-3">
						<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
						<Typography variant="h3">이렇게 말해볼까?</Typography>
					</div>
				</Alert>
			</div>
		</Scene3Wrapper>
	);
}

export default Scene3page;
