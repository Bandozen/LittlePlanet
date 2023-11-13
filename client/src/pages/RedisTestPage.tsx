import React, { useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import api from 'api';
import { useRecoilValue } from 'recoil';
import CharacterDisplay from 'components/CharacterDisplay';
import useMovePage from 'hooks/useMovePage';
import { userEmail } from '../store/RecoilState';

function RedisTestPage() {
	const memberEmail = useRecoilValue(userEmail);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	// 캐릭터 이동시키기
	const [left, setLeft] = useState(500);
	const handleLeft = () => setLeft((prevLeft) => prevLeft - 5);
	const handleRight = () => setLeft((prevLeft) => prevLeft + 5);
	const [movePage] = useMovePage();

	const handleclick = async () => {
		await api.post('/member/command', {
			memberEmail,
			memberCommand: 'ready',
		});
		movePage('/main');
	};

	useEffect(() => {
		const moveSocket = new WebSocket('wss://k9c203.p.ssafy.io:17776');
		// const moveSocket = new WebSocket('ws://localhost:7776');

		moveSocket.onopen = () => {
			console.log('WebSocket connection established.');
			setSocket(moveSocket);
			console.log(socket);

			// 소켓 열릴 때, 이메일 보내기
			const handShake = {
				type: 'HW',
				email: memberEmail,
			};
			moveSocket.send(JSON.stringify(handShake));
		};

		// 소켓에 메시지 들어오면
		moveSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			console.log(eventMessage);
			if (eventMessage.type === 'HW') {
				if (eventMessage.movedir === 'left') {
					handleLeft();
				} else if (eventMessage.movedir === 'right') {
					handleRight();
				}
			}
		};

		moveSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		return () => {
			moveSocket.close();
		};
	}, []);

	return (
		<div>
			<div style={{ position: 'absolute', left: `${left}px`, width: '320px', height: '240px' }}>
				<CharacterDisplay />
			</div>
			<Button onClick={handleclick}>메인페이지가기</Button>
		</div>
	);
}

export default RedisTestPage;
