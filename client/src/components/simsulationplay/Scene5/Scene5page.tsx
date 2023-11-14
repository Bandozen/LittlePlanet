import React from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import { studentName } from '../../../store/RecoilState';
import { Scene5Wrapper } from './style';
import SimulationChat from '../SimulationChat/index';

function Scene5Page() {
	document.body.style.overflow = 'hidden';

	const studentname = useRecoilValue(studentName);

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
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleTTS = async () => {
		await convertToSpeech(studentname);
	};

	return (
		<Scene5Wrapper>
			<Button onClick={handleTTS}>TTS음성</Button>
			<SimulationChat
				chatNumber={3}
				text={`${studentname} 친구야, 고마워! 덕분에 아픈 친구를 무사히 구조할 수 있었어!`}
			/>
		</Scene5Wrapper>
	);
}

export default Scene5Page;
