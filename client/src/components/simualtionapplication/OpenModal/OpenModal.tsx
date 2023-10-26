import React from 'react';
import useOpenModal from 'hooks/useModalOpen';
import Modal from 'components/common/Modal/Modal';
import Button from 'components/common/Button';
import { Wrapper } from './style';

function OpenModal() {
	const { isOpenModal, clickModal, closeModal } = useOpenModal();
	return (
		<>
			<Wrapper>
				<Button text="OTP 생성하기 ▶" handleClick={() => clickModal()} />
			</Wrapper>
			{isOpenModal && <Modal closeModal={closeModal} title="테스트입니다." content="테스트라구요" />}
		</>
	);
}

export default OpenModal;
