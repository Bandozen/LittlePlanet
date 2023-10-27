import React from 'react';
import styled from 'styled-components';
import DownloadModal from 'components/simualtionapplication/DownloadModal/DownloadModal';
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
