import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import useMovePage from 'hooks/useMovePage';
import { useRecoilValue } from 'recoil';
import { studentName } from '../../../store/RecoilState';
import { Scene5Wrapper, Bg2Wrapper } from './style';
import SimulationChat from '../SimulationChat/index';
import outroSound from '../../../assets/music/outro_sound.mp3';
import outroSound2 from '../../../assets/music/outro_sound2.mp3';
import outroVoice from '../../../assets/music/outro_voice.mp3';
import edMusic from '../../../assets/music/ending_music.mp3';

function Scene5Page() {
	document.body.style.overflow = 'hidden';
	const [movePage] = useMovePage();
	// 구급차 소리
	const [outroAudio] = useState(new Audio(outroSound));
	// 구급차가 도착했어, 하준이 음성
	const [outroAudio2] = useState(new Audio(outroSound2));
	// TTS 음성
	const [outrovoiceAudio] = useState(new Audio(outroVoice));
	// 엔딩 음악
	const [edAudio] = useState(new Audio(edMusic));
	// SimulationChat 컴포넌트 표시 여부를 제어하는 상태
	const [showSimulationChat, setShowSimulationChat] = useState(false);
	const [showBg2Wrapper, setShowBg2Wrapper] = useState(false);

	const studentname = useRecoilValue(studentName);
	const playEdMusic = () => {
		edAudio.volume = 0.5;
		edAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		edAudio.onended = () => {
			edAudio.pause();
			edAudio.currentTime = 0;
			movePage('/main');
		};
	};
	const convertToSpeech = async (name: string) => {
		try {
			const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_TTS_API_KEY;
			const response = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
				input: { text: `${name}친구야, 고마워! 덕분에 아픈 친구를 무사히 구조할 수 있었어!` },
				voice: { languageCode: 'ko-KR', name: 'ko-KR-Standard-D', ssmlGender: 'MALE' },
				audioConfig: { audioEncoding: 'MP3' },
			});
			console.log('응답 데이터', response.data); // 응답 데이터 확인
			// base64 인코딩된 문자열을 디코딩하고 Uint8Array로 변환
			const audioStr = atob(response.data.audioContent);
			console.log('디코딩된 문자열', audioStr);
			const audioBytes = new Uint8Array(audioStr.length);
			for (let i = 0; i < audioStr.length; i += 1) {
				audioBytes[i] = audioStr.charCodeAt(i);
			}
			console.log('변환된바이트배열', audioBytes);
			const audioBlob = new Blob([audioBytes], { type: 'audio/mp3' });
			const audioURL = URL.createObjectURL(audioBlob);
			// TTS 음성 재생
			const ttsAudio = new Audio(audioURL);
			ttsAudio.play();
			setShowSimulationChat(true);
			ttsAudio.onended = () => {
				playEdMusic();
			};
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const handleTTS = async () => {
		await convertToSpeech(studentname);
	};

	const playOutroVoiceOrTTS = () => {
		if (studentname === '조찬익') {
			outrovoiceAudio.play().catch((error) => console.log('자동 재생 실패:', error));
			setShowSimulationChat(true);
			outrovoiceAudio.onended = playEdMusic;
		} else {
			handleTTS();
		}
	};
	// outroSound2(하준이목소리) 재생 후 playOutroVoiceOrTTS 실행
	const playOutroSound2 = () => {
		outroAudio2.volume = 0.5;
		outroAudio2.play().catch((error) => console.log('자동 재생 실패:', error));
		outroAudio2.onended = () => {
			setShowBg2Wrapper(true); // 배경 변경
			playOutroVoiceOrTTS();
		};
	};
	// 구급차 소리 재생 후 outroSound2(하준이목소리) 재생
	const playOutroSound = () => {
		outroAudio.volume = 0.5;
		outroAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		outroAudio.onended = playOutroSound2;
	};

	useEffect(() => {
		playOutroSound(); // 첫 번째 구급차사운드 재생
	}, []);

	return (
		<div>
			{!showBg2Wrapper ? (
				// 소방차가 도착하는 배경
				<Scene5Wrapper />
			) : (
				// 소방관이 칭찬하는 배경
				<Bg2Wrapper>
					<Button className="btn-style" onClick={handleTTS}>
						TTS음성
					</Button>
					{showSimulationChat && (
						<SimulationChat
							chatNumber={3}
							text={`${studentname} 친구야, 고마워! 덕분에 아픈 친구를 무사히 구조할 수 있었어!`}
						/>
					)}
				</Bg2Wrapper>
			)}
		</div>
	);
}

export default Scene5Page;
