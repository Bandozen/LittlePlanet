import React from 'react';
// import api from 'api';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import DownloadModal from 'components/simualtionapplication/DownloadModal/DownloadModal';
import { userEmail, studentName } from '../store/RecoilState';
import NavBar from '../components/common/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import GameMain from '../components/Game/GameMain';
import SimulationMain from '../components/Simulation/SimulationMain';

const MainContents = styled.div`
	.main-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;

function MainPage() {
	// const userMail = useRecoilValue(userEmail);

	// api.post('/member/command', {
	// 	memberEmail: userMail,
	// 	memberCommand: 'ready',
	// });

	const userMail = useRecoilValue(userEmail);
	const student = useRecoilValue(studentName);

	console.log(userMail, student);

	return (
		<div>
			<NavBar />
			<Main />
			<MainContents>
				<div className="main-box">
					<SimulationMain />
					<DownloadModal />
					<GameMain />
				</div>
			</MainContents>
			<Footer />
		</div>
	);
}

export default MainPage;
