import React, { useState, useEffect } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { io } from 'socket.io-client';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../api';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

function Scene5page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [isWrong, setIsWrong] = useState(true);
	const [touched, setTouched] = useState(1);

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=4');
			setContentsData(contentsResponse.data);
			console.log(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
		// 웹소켓 서버와의 연결 생성
		const socket = io('YOUR_SOCKET_SERVER_URL');

		// "N" 신호를 받았을 때의 동작 정의
		socket.on('N', () => {
			setIsWrong(true);
			setTouched(1);
		});

		// 컴포넌트가 언마운트될 때 연결 종료
		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<>
			<Alert variant="outlined">
				{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
				이제 소방관에게 위치를 알려줘야 해. 먼저 주변을 살펴볼까?
			</Alert>
			<Alert open={!isWrong}>
				<Typography variant="h3">확인한 위치를 소방관에게 알려줘!</Typography>
			</Alert>
			<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
				<div className="flex flex-row m-3">
					<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
					<Typography variant="h3">소방관에게 이렇게 말해볼까?</Typography>
				</div>
				{touched === 2 ? (
					<div className="flex flex-row items-center">
						<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
						<Typography variant="h5">여기는 소행성로 203이에요.</Typography>
					</div>
				) : (
					<div className="flex flex-row items-center m-3">
						<PhoneArrowUpRightIcon className="w-7 h-7 mr-2" />
						<Typography variant="h5">여기는 삼성스토어 소행성지점 근처에요.</Typography>
					</div>
				)}
			</Alert>
		</>
	);
}

export default Scene5page;
