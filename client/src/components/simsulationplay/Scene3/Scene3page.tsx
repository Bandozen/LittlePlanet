import React, { useState, useEffect } from 'react';
import { Alert, Button, Typography } from '@material-tailwind/react';
import { Scene3Wrapper } from './style3';
// import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../../api';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// 다리를 다쳐서 피가 나요.
function Scene3page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [firstNarr, setFirstNarr] = useState(true);
	const [arrived, setArrived] = useState(false);
	// const answer = '다리를 다쳐서 피가 많이 나요.';
	// const [isWrong, setIsWrong] = useState(false);
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
	function getMessage(message: string) {
		const mes = JSON.parse(message);
		console.log(mes);
		if (mes.type === 'web') {
			console.log('web에서 접속한거임');
		}
		if (mes.type === 'narr' && mes.content === 'first') {
			setFirstNarr(false);
		}
		if (mes.type === 'arrive' && mes.content === 'friend') {
			setArrived(true);
		}
	}

	useEffect(() => {
		fetchData();

		const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');

		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);
		};

		// 받을 메시지는 사용자 신고 내용 text
		newSocket.onmessage = (event) => {
			console.log(event.data);
			console.log(JSON.parse(event.data));
			getMessage(event.data);
			// gpt에게 물어보기. 응답이 적절하다면
			// newSocket?.send('play two');
			// 적절하지 않다면
			// setIsWrong(true);
			// newSocket?.send('replay one');
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
		};
	}, []);
	useEffect(() => {
		// 소켓이 있다면
		if (socket) {
			// 핸드세이크 메세지 설정 후 JSON 변환 후 보내기
			const handshakemessage = {
				type: 'web',
				content: 'test@ssafy.com',
			};

			socket.send(JSON.stringify(handshakemessage));
		}
	}, [socket]); // socket가 변경될 때 : 즉 소켓에 설정한 링크로 변경 됐을 때 자동으로 실행

	const arrive = () => {
		if (socket) {
			const message = { type: 'arrive', content: 'friend' };
			socket.send(JSON.stringify(message));
		}
	};

	const firstNarrEnd = () => {
		if (socket) {
			const message = { type: 'narr', content: 'first' };
			socket.send(JSON.stringify(message));
		}
	};
	return (
		<Scene3Wrapper>
			<div className={`${arrived ? 'background-image2 zoomed' : 'background-image'}`}>
				<Button
					type="button"
					onClick={() => {
						firstNarrEnd();
					}}
				>
					첫번째 나레이션 끝났을 때
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
						이제 소방관에게 친구가 어디를 다쳤는지 알려줘야 해. 친구에게 다가가 볼까?
					</Alert>
				)}
				{/* 구조물 터치하면 구조물 확대하고 터치된 구조물 seq로 touched 변경 */}
				{/* <Alert open={isTouched}> */}
				{arrived && (
					<Alert>
						<Typography variant="h3">친구가 어디를 다쳤는지 소방관에게 설명해줘!</Typography>
					</Alert>
				)}
				{/* 소켓에서 받아온 메시지에 따라 isWrong 설정하고 스크립트 보여주기 */}
				{/* <Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
					<div className="flex flex-row m-3">
						<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
						<Typography variant="h3">이렇게 말해볼까?</Typography>
					</div>
				</Alert> */}
			</div>
		</Scene3Wrapper>
	);
}

export default Scene3page;
