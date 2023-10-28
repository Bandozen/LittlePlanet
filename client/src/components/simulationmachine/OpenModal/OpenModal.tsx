import React from 'react';
import useOpenModal from 'hooks/useModalOpen';
import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
// import useMovePage from 'hooks/useMovePage';
import { Wrapper } from './style';

function OpenModal() {
	// const [movepage] = useMovePage();

	const { isOpenModal, clickModal, closeModal } = useOpenModal();

	const modalContent = (
		<div>
			<p style={{ fontSize: '32px' }}>응 아직 안나옵니다~</p>
			<Button text="다음에 하세요~" handleClick={() => closeModal()} />
		</div>
	);

	return (
		<>
			<Wrapper>
				<Button text="OTP 생성하기 ▶" handleClick={() => clickModal()} />
			</Wrapper>
			<WindModal open={isOpenModal} handleClose={closeModal} title="OTP 번호" content={modalContent} />
		</>
	);
}

export default OpenModal;
