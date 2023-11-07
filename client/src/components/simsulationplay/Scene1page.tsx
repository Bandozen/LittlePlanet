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

// 친구가 다쳤어요.
function Scene1page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [text, setText] = useState('');
	const [isWrong, setIsWrong] = useState(false);

	const [socket, setSocket] = useState<WebSocket | null>(null);
	const answer = '친구가 높은 곳에서 뛰어내려서 많이 다쳤어요.';

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=1');
			setContentsData(contentsResponse.data);
		} catch (e) {
			console.log(e)
		}
	};

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

	const handleSendMessage = () => {
		// gpt에게 물어보기. 응답이 적절하다면
		socket?.send('go two');
		// 적절하지 않다면
		// setIsWrong(true);
		// socket?.send('replay one');
	};

	if (socket) {
		socket.onmessage = (event) => {
			console.log(event.data);
			setText(event.data);
			console.log(text);
		};
	}

	return (
		<>
			<Alert variant="outlined">{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}</Alert>
			{/* 1번 씬은 Detail부터 */}
			<Alert>
				<Typography variant="h3">다친 친구가 있다는 사실을 소방관에게 알려줘!</Typography>
			</Alert>
			<Button onClick={handleSendMessage}>소켓</Button>
			<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
				<div className="flex flex-row m-3">
					<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
					<Typography variant="h3">이렇게 말해볼까?</Typography>
				</div>
				<div className="flex flex-row items-center">
					<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
					<Typography variant="h5">{answer}</Typography>
				</div>
			</Alert>
		</>
	);
}

export default Scene1page;
