import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

// import NavBar from 'components/common/NavBar/NavBar';

function SocketTestPage() {
	const [imageURL, setImageURL] = useState('');

	useEffect(() => {
		const client = new W3CWebSocket('wss://192.168.219.114:8090');

		client.onopen = () => {
			console.log('웹 소켓 연결이 열렸습니다.');
		};

		client.onmessage = (message) => {
			if (message.data instanceof Blob) {
				const imageBlob = new Blob([message.data]);
				const imageUrl = URL.createObjectURL(imageBlob);
				setImageURL(imageUrl);
			}
		};

		client.onclose = () => {
			console.log('웹 소켓 연결이 닫혔습니다.');
		};

		return () => {
			client.close();
		};
	}, []);

	return (
		<div>
			{/* <NavBar /> */}
			<hr />
			{imageURL && <img src={imageURL} alt="Received" />}
			<h1>socket</h1>
		</div>
	);
}

export default SocketTestPage;
