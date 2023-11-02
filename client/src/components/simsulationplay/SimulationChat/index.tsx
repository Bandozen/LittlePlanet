import React from 'react';
// import InputField from 'components/InputField';
import { SimulationChatWrapper } from './style';

function SimulationChat() {
	// const [socket, setSocket] = useState(null);
	// const [message, setMessage] = useState('');

	return (
		<SimulationChatWrapper>
			<div className="wrap">
				<div className="chat ch1">
					<div className="icon">
						<i className="fa-solid fa-user" />
					</div>
					<div className="textbox">119입니다. 무슨 일이시죠?</div>
				</div>

				<div className="chat ch2">
					<div className="icon">
						<i className="fa-solid fa-user" />
					</div>
					<div className="textbox">놀이터에서 놀다가 친구가 뛰어내렸어요. 그래서 다리를 다쳤어요.</div>
				</div>
			</div>
			{/* <InputField message={message} setMessage={setMessage} /> */}
		</SimulationChatWrapper>
	);
}

export default SimulationChat;
