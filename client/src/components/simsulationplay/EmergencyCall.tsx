import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import api from '../../api';
import Scene1page from './Scene1page';
import Scene2page from './Scene2page';
import Scene3page from './Scene3page';
import Scene4page from './Scene4page';
import { userEmail, studentName } from '../../store/RecoilState';
import { CallGPT } from './gpt/gpt';

function EmergencyCall() {
	// 시뮬레이션 씬 저장하기
	const [status, setStatus] = useState(0);

	// 멤버 이메일, 학생 이름 가져오기
	const memberEmail = useRecoilValue(userEmail);
	const student = useRecoilValue(studentName);
	console.log(memberEmail, student);

	// 인트로 불러오기.
	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=0');
			console.log(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		fetchData();
		const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');

		newSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(newSocket);

			// 소켓 열릴 때, 이메일과 학생 이름 보내기
			// const handShake = {
			// 	type: 'web',
			// 	email: memberEmail,
			// 	studentName: student,
			// };
			const handShake = {
				type: 'page',
				content: 1,
			};
			newSocket.send(JSON.stringify(handShake));
		};

		// 소켓에서 이벤트 발생 시 event.data.type이 page라면 페이지 넘기라는 신호
		newSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			console.log(eventMessage);

			if (eventMessage.type === 'page') {
				setStatus(eventMessage.content);
			}
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			newSocket.close();
		};
	}, []);

	// 인트로 끝나면 앱에 키패드 띄우라는 신호 보내기
	const message = {
		type: 'narr',
		content: 0,
	};

	const sendKeypadMessage = () => {
		CallGPT();
		if (socket) {
			socket.send(JSON.stringify(message));
		}
	};

	return (
		<>
			<Button onClick={sendKeypadMessage}> 인트로 끝남 </Button>
			{/* 1번부터 5번씬 차례대로 status에 따라 */}
			{status === 1 && <Scene1page />}
			{status === 2 && <Scene2page />}
			{status === 3 && <Scene3page />}
			{status === 4 && <Scene4page />}
		</>
	);
}

export default EmergencyCall;
