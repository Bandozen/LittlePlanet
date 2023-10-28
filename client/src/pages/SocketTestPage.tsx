import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function ImageDisplay() {
	const [image, setImage] = useState('0');

	console.log(image);

	useEffect(() => {
		const socket = io('wss://k9c203.p.ssafy.io:18099');
		console.log('here');

		// 'requestImage' 이벤트를 트리거하여 이미지 요청
		socket.emit('requestImage');

		socket.on('image', (data) => {
			setImage(data.url);
			console.log('Received image data:', data.url);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return <div>{image && <img src={image} alt="character" />}</div>;
}

export default ImageDisplay;
