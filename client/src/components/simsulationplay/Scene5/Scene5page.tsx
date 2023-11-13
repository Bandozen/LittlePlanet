import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { useRecoilValue } from 'recoil';
import { studentName } from '../../../store/RecoilState';
import { Scene5Wrapper } from './style';

function Scene5Page() {
	const studentname = useRecoilValue(studentName);
	const [audioSrc, setAudioSrc] = useState('');
	const audioRef = useRef(new Audio());
	const mp3Files = [
		'src/assets/music/outro_1.mp3',
		'src/assets/music/outro_2.mp3',
		'src/assets/music/outro_3.mp3',
		'src/assets/music/outro_4.mp3',
	]; // MP3 파일 경로들
	let currentFileIndex = 0;

	const playNextFile = () => {
		if (currentFileIndex < mp3Files.length) {
			const nextAudio = new Audio(mp3Files[currentFileIndex]);
			nextAudio.play();
			currentFileIndex += 1;

			nextAudio.onended = () => {
				playNextFile();
			};
		}
	};

	const convertToSpeech = async (name: string) => {
		try {
			const apiKey = process.env.REACT_APP_GOOGLE_TTS_API_KEY;
			const response = await axios.post(
				'https://texttospeech.googleapis.com/v1/text:synthesize',
				{
					input: { text: name },
					voice: { languageCode: 'ko-KR', name: 'ko-KR-Standard-D', ssmlGender: 'NEUTRAL' },
					audioConfig: { audioEncoding: 'MP3' },
				},
				{
					params: { key: apiKey },
				},
			);

			const audioBlob = new Blob([new Uint8Array(Buffer.from(response.data.audioContent, 'base64'))], {
				type: 'audio/mp3',
			});
			setAudioSrc(URL.createObjectURL(audioBlob));
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleTTS = () => {
		convertToSpeech(studentname).then(() => {
			if (audioSrc) {
				const audio = audioRef.current;
				audio.src = audioSrc;
				audio.play();

				audio.onended = () => {
					playNextFile();
				};
			}
		});
	};

	useEffect(() => {
		handleTTS();
	}, []); // 마운트될 때 한 번만 실행

	return (
		<Scene5Wrapper>
			<Button onClick={handleTTS}>TTS음성</Button>
		</Scene5Wrapper>
	);
}

export default Scene5Page;
