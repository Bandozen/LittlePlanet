import React, { useState, useEffect } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../api';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

interface Scene1pageProps {
	socket: WebSocket | null;
}

function Scene1page({ socket: initialSocket }: Scene1pageProps) {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [text, setText] = useState('');
	const [isWrong, setIsWrong] = useState(false);

	const answer = '친구가 높은 곳에서 뛰어내려서 다리를 다쳤어요.';

	const socket = initialSocket;

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=1');
			setContentsData(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSendMessage = () => {
		if (socket) {
			if (text === answer) {
				// socket.send('Y');
			} else {
				// socket.send('N');
			}
		}
	};

	if (socket) {
		socket.onmessage = (event) => {
			console.log(event.data);
			setText(event.data);
			handleSendMessage();
		};
	}

	return (
		<>
			<Alert variant="outlined">{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}</Alert>
			{/* 1번 씬은 Detail부터 */}
			<Alert>
				<Typography variant="h3">다친 친구가 있다는 사실을 소방관에게 알려줘!</Typography>
			</Alert>
			<Alert className="flex justify-center" variant="gradient" open={!isWrong} onClose={() => setIsWrong(false)}>
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
