import React from 'react';
import styled from 'styled-components';
import PlayButton from 'components/Button/PlayButton';
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
					<PlayButton text="앱 다운로드" />
					<GameMain />
				</div>
			</MainContents>
			<Footer />
		</div>
	);
}

export default MainPage;
