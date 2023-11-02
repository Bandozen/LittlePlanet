import React, { memo, useEffect, useState } from 'react';
import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
import useMovePage from 'hooks/useMovePage';
// import { Alert } from '@material-tailwind/react';
import api from 'api';
import { Wrapper } from './style';

export const Timer = memo(() => {
	const MINUTES_IN_MS = 3 * 60 * 1000;
	const INTERVAL = 1000;
	const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);

	const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
	const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - INTERVAL);
		}, INTERVAL);

		if (timeLeft <= 0) {
			clearInterval(timer);
			console.log('타이머가 종료되었습니다.');
		}

		return () => {
			clearInterval(timer);
		};
	}, [timeLeft]);

	return (
		<div>
			{minutes} : {second}
		</div>
	);
});

function OpenModal() {
	const [otpNum, setOtpNum] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	// const [confirmOpen, setConfirmOpen] = React.useState(false);
	const [movepage] = useMovePage();

	async function getApiNumber() {
		await api
			.post('/member/otp')
			.then((res) => {
				setOtpNum(res.data.message);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	async function getApiConnected() {
		await api
			.post(`member/otp/connected?otp=${otpNum}`)
			.then((res) => {
				if (res.data.success === true) {
					console.log(res.data);
					movepage('/machineconfirm');
				}
			})
			.catch((e) => {
				console.log(e.response.data);
				alert('기기확인에 실패했습니다.');
			});
	}

	const clickModal = () => {
		setIsOpenModal(true);
		getApiNumber();
	};

	const closeModal = () => {
		getApiConnected();
		setIsOpenModal(false);
	};

	const modalContent = (
		<div>
			<div className="flex justify-center">
				<p style={{ fontSize: '32px' }}>{otpNum}</p>
			</div>
			<div className="flex justify-center">
				<Button text="확인" handleClick={() => getApiConnected()} />
				<Timer />
			</div>
		</div>
	);

	return (
		<>
			<Wrapper>
				<div>
					<Button text="OTP 생성하기 ▶" handleClick={() => clickModal()} />
				</div>
			</Wrapper>
			<WindModal open={isOpenModal} handleClose={closeModal} title="OTP 번호" content={modalContent} />
		</>
	);
}

export default OpenModal;
