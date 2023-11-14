import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Typography, Button, Alert } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Button1 from 'components/common/Button';
import SimulationChat from 'components/simsulationplay/SimulationChat';
import { useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
import narration from 'assets/music/narr_2.mp3';
import wrongNarration from 'assets/music/narr_6.mp3';
import { CallGPT } from '../../gpt/gpt';
import { SeqThreeWrapper } from './style';

interface ISeqThreeProps {
	setStep: Dispatch<SetStateAction<number>>;
	setStatus: Dispatch<SetStateAction<number>>;
	address: string;
}

function SeqThree(props: ISeqThreeProps) {
	document.body.style.overflow = 'hidden';

	const { address, setStep, setStatus } = props;

	console.log(address);

	const [narrAudio] = useState(new Audio(narration));
	const [wrongNarrAudio] = useState(new Audio(wrongNarration));

	const [socket, setSocket] = useState<WebSocket | null>(null);

	const [alert, setAlert] = useState(true);

	// 사용자 음성 받아오기
	const [text, setText] = useState('');

	// 사용자의 음성이 틀렸을 경우
	const [isWrong, setIsWrong] = useState(false);
	const [wrongSeq, setWrongSeq] = useState(false);

	const [location, setLocation] = useState(true);

	// const [address, setAddress] = useState('');

	const memberEmail = useRecoilValue(userEmail);

	useEffect(() => {
		// 소켓 연결 부분(ip주소 및 배포주소)
		const newSocket = new WebSocket('wss://k9c203.p.ssafy.io:17777');
		// const newSocket = new WebSocket('ws://192.168.100.36:7777');
		// const newSocket = new WebSocket('ws://192.168.100.38:7777');
		// const newSocket = new WebSocket('ws://localhost:7777');

		newSocket.onopen = () => {
			setSocket(newSocket);
			const handshake = {
				type: 'web',
				email: memberEmail,
			};
			newSocket.send(JSON.stringify(handshake));
		};

		// 받아온 메시지는 사용자 답변의 정답 여부
		newSocket.onmessage = (event) => {
			const eventMessage = JSON.parse(event.data);
			if (eventMessage.type === 'text2') {
				setText(eventMessage.content);
			}
			if (eventMessage.type === 'wrong') {
				setWrongSeq(true);
				wrongNarrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			}
			if (eventMessage.type === 'narr') {
				narrAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			}
			if (eventMessage.type === 'address') {
				console.log(eventMessage.content);
			}
		};

		newSocket.onclose = () => {
			console.log('WebSocket connection closed.');
		};

		const narr = setTimeout(() => {
			setAlert(false);
			newSocket.send(JSON.stringify({ type: 'narr', content: 2 }));
		}, 3000);

		return () => {
			newSocket.close();
			clearTimeout(narr);
		};
	}, []);

	// 3. GPT
	// 응답 시 화면에 띄워지는 시간
	function handleTimer(time: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(true);
			}, time);
		});
	}

	useEffect(() => {
		async function handleAsyncOperations() {
			if (text) {
				const prompt = {
					role: 'user',
					content: `1. [GOAL] : Let the firefighters know where you are. (the answer is ${address}) 2. [FIREFIGTER'S QUESTION] : 학생, 지금 어디에요? 3. [CHILD'S ANSWER] : ${text} ## Use the output in the JSON format. ##`,
				};

				const textLength = text.length;
				const animationTime = textLength * 0.05 * 1000 + 2000;

				try {
					const [timerResult, isCorrect] = await Promise.all([handleTimer(animationTime), CallGPT(prompt)]);

					if (timerResult) {
						if (isCorrect) {
							const message = {
								type: 'page',
								content: 3,
							};
							socket?.send(JSON.stringify(message));
						} else {
							setIsWrong(true);
							setText('');
							setTimeout(() => {
								socket?.send(JSON.stringify({ type: 'wrong' }));
							}, 3000);
						}
					}
				} catch (e) {
					console.log(e);
				}
			}
		}

		handleAsyncOperations();
	}, [text]);

	const testClick = () => {
		setStatus(3);
		setStep(4);
	};

	const changeLocation = () => {
		setLocation((prev) => !prev);
	};

	useEffect(() => {
		let alertTimer: any;

		if (isWrong) {
			alertTimer = setTimeout(() => {
				setIsWrong(false);
			}, 3000);
		}
		return () => {
			if (alertTimer) clearTimeout(alertTimer);
		};
	}, [isWrong]);

	return (
		<SeqThreeWrapper>
			<Button onClick={changeLocation}>장소바꾸기</Button>
			<Button1 text="테스트버튼입니다." handleClick={() => testClick()} />
			{alert && (
				<div className="alert-container">
					<Alert>
						<Typography variant="h3">확인한 위치를 소방관에게 알려줘!</Typography>
					</Alert>
				</div>
			)}
			{!alert && !isWrong && !wrongSeq && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '다친 친구가 있는 주소를 알려줄래요?'} />
			)}
			{isWrong && (
				<div className="wrong-container">
					<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
						<div className="flex flex-row m-3">
							<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
							<Typography variant="h3">이렇게 말해볼까?</Typography>
						</div>
						{location ? (
							<div className="flex flex-row items-center">
								<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
								<Typography variant="h5">여기는 소행성로 203 근처에요.</Typography>
							</div>
						) : (
							<div className="flex flex-row items-center m-3">
								<PhoneArrowUpRightIcon className="w-7 h-7 mr-2" />
								<Typography variant="h5">여기는 삼성스토어 소행성지점 근처에요.</Typography>
							</div>
						)}
					</Alert>
				</div>
			)}
			{!alert && !isWrong && wrongSeq && (
				<SimulationChat chatNumber={text ? 2 : 1} text={text || '다시 한번 말해볼래요?'} />
			)}
		</SeqThreeWrapper>
	);
}

export default SeqThree;
