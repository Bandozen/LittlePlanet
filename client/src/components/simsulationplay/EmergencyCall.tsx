import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import api from '../../api';
import Scene1page from './Scene1page';
// import Scene2page from './Scene2page';
// import { Content } from '../../types/content';

function EmergencyCall() {
	// 시뮬레이션 씬 저장하기
	const [status, setStatus] = useState(0);

	// const [contentsData, setContentsData] = useState<Content[]>([]);
	// 인트로 불러오기.
	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=0');
			console.log(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	// 인트로 끝나면 소켓으로 앱에 키패드 신호 보내고, 119 걸렸다는 신호 받아서 1번 씬으로 넘기기
	const message = 'go Phonekey';
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		fetchData();
		const newSocket = new WebSocket('ws://localhost:7777');

		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);
		};

		newSocket.onmessage = (event) => {
			console.log(event.data);
			if (event.data === 'do you sent? go Next') {
				setStatus(1);
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
		if (socket && message) {
			socket.send(message);
		}
	};

	return (
		<>
			<Button onClick={handleSendMessage}> 인트로 끝남 </Button>
			{/* 1번부터 5번씬 차례대로 status에 따라 */}
			{status === 1 && <Scene1page socket={socket} />}
		</>
	);
}

export default EmergencyCall;