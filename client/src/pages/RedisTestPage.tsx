import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userEmail } from '../store/RecoilState';

function RedisTestPage() {
	const memberEmail = useRecoilValue(userEmail);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		// const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17776');
		const newSocket = new WebSocket('ws://localhost:7776');
		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);
			console.log(socket);

			// 소켓 열릴 때, 이메일 보내기
			const handShake = {
				type: 'HW',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handShake));
		};

		// 소켓에서 이벤트 발생 시 event.data.type이 page라면 페이지 넘기라는 신호
		newSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			console.log(eventMessage);
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
		};
	}, []);

	return <div>RedisTedt</div>;
}

export default RedisTestPage;
