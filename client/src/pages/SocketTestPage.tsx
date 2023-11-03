import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { userEmail } from '../store/RecoilState';

function ImageDisplay() {
	const [image, setImage] = useState('0');
	const userMail = useRecoilValue(userEmail);
	console.log(userMail);

	useEffect(() => {
		const socket = io('wss://k9c203.p.ssafy.io:18099', {
			extraHeaders: {
				userMail,
			},
			secure: true,
		});

		socket.on('image', (data) => {
			setImage(data.url);
			console.log(data);
		});

		return () => {
			socket.disconnect();
		};
	}, [userMail]);

	return <div>{image && <img src={image} alt="character" />}</div>;
}

export default ImageDisplay;
