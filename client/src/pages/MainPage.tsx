import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import DownloadModal from 'components/simualtionapplication/DownloadModal/DownloadModal';
import { userEmail } from '../store/RecoilState';
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
	const userMail = useRecoilValue(userEmail);
	console.log(userMail);

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
