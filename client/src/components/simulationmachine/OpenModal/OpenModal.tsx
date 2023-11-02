import React, { useState } from 'react';
import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
import useMovePage from 'hooks/useMovePage';
import api from 'api';
import { Wrapper } from './style';

function OpenModal() {
	const [num, setNum] = useState(0);
	const [otpNum, setOtpNum] = useState('');
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [movepage] = useMovePage();

	async function getApiNumber() {
		await api
			.post('/member/otp')
			.then((res) => {
				setNum(1);
				setOtpNum(res.data.message);
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const clickModal = () => {
		setIsOpenModal(true);
		getApiNumber();
	};

	const closeModal = () => {
		setIsOpenModal(false);
	};

	const modalContent = (
		<div>
			<div className="flex justify-center">
				<p style={{ fontSize: '32px' }}>{otpNum}</p>
			</div>
			<div className="flex justify-center">
				<Button text="확인" handleClick={() => closeModal()} />
			</div>
		</div>
	);

	return (
		<>
			<Wrapper>
				<div>
					<Button text="OTP 생성하기 ▶" handleClick={() => clickModal()} />
				</div>
				<div>{num === 1 ? <Button text="확인" handleClick={() => movepage('/machineconfirm')} /> : null}</div>
			</Wrapper>
			<WindModal open={isOpenModal} handleClose={closeModal} title="OTP 번호" content={modalContent} />
		</>
	);
}

export default OpenModal;
