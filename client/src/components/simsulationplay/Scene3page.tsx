import React, { useState, useEffect } from 'react';
import { Alert, Button } from '@material-tailwind/react';
import { Scene3Wrapper } from './style3';
// import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../api';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// 다리를 다쳐서 피가 나요.
function Scene3page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [arrived, setArrived] = useState(false);
	// const answer = '다리를 다쳐서 피가 많이 나요.';
	const [direction, setDirection] = useState(0);
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
		if (mes.type === 'camera_move' && mes.content === 'big') {
			setArrived(true);
		}
		if (mes.type === 'camera_move' && mes.content === '1') {
			setDirection(1);
		}
		if (mes.type === 'camera_move' && mes.content === '-1') {
			setDirection(-1);
		}
		if (mes.type === 'camera_move' && mes.content === '0') {
			setDirection(0);
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
			const message = { type: 'camera_move', content: 'big' };
			socket.send(JSON.stringify(message));
		}
	};
	const right = () => {
		if (socket) {
			const message = { type: 'camera_move', content: '1' };
			socket.send(JSON.stringify(message));
		}
	};
	const left = () => {
		if (socket) {
			const message = { type: 'camera_move', content: '-1' };
			socket.send(JSON.stringify(message));
		}
	};
	const center = () => {
		if (socket) {
			const message = { type: 'camera_move', content: '0' };
			socket.send(JSON.stringify(message));
		}
	};
	return (
		// <>
		// 	<Alert variant="outlined">
		// 		{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
		// 		이제 소방관에게 친구가 어디를 다쳤는지 알려줘야 해. 먼저 친구 쪽으로 가보자.
		// 	</Alert>
		// 	{/* 다가갔다고 인식되면 다친 친구 확대로 변경 */}
		// 	<Alert>
		// 		<Typography variant="h3">소방관에게 다친 친구에 대해 설명해줘.</Typography>
		// 	</Alert>
		// 	<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
		// 		<div className="flex flex-row m-3">
		// 			<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
		// 			<Typography variant="h3">이렇게 말해볼까?</Typography>
		// 		</div>
		// 		<div className="flex flex-row items-center">
		// 			<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
		// 			<Typography variant="h5">{answer}</Typography>
		// 		</div>
		// 	</Alert>
		// </>
		<Scene3Wrapper>
			<div
				className={`background-image ${arrived ? 'zoomed' : ''} ${direction === 1 ? 'background-right' : ''} ${
					direction === -1 ? 'background-left' : ''
				}`}
			>
				{!arrived && (
					<Alert variant="outlined">
						{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
						이제 소방관에게 친구가 어디를 다쳤는지 알려줘야 해. 먼저 친구 쪽으로 가보자.
					</Alert>
				)}
				<Button
					size="sm"
					color="blue"
					onClick={() => {
						arrive();
					}}
				>
					arrive
				</Button>
				<Button
					size="sm"
					color="blue"
					onClick={() => {
						right();
					}}
				>
					right
				</Button>
				<Button
					size="sm"
					color="blue"
					onClick={() => {
						center();
					}}
				>
					center
				</Button>
				<Button
					size="sm"
					color="blue"
					onClick={() => {
						left();
					}}
				>
					left
				</Button>
			</div>
		</Scene3Wrapper>
	);
}

export default Scene3page;
