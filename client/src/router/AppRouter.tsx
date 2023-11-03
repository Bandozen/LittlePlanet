import React from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalFonts } from 'styles/GlobalFonts';
import { GlobalStyles } from 'styles/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import SimulationListPage from 'pages/SimulationListPage';
import SimulationDetailPage from 'pages/SimulationDetailPage';
import GameListPage from 'pages/GameListPage';
import GameDetailPage from 'pages/GameDetailPage';
import MyPage from 'pages/MyPage';
import SimulationMachinePage from 'pages/SimulationMachinePage/SimulationMachinePage';
import MachineConfirmPage from 'pages/MachineConfirmPage/MachineConfirmPage';
import ApplicationLayout from 'layouts/common/ApplicationLayout';
import ScrollToTop from 'components/common/ScrollToTop';
import SocketTestPage from 'pages/SocketTestPage';
import Scene5page from 'components/simsulationplay/Scene5page';
// import SimulationPlayPage from 'pages/SimulationPlayPage';

function AppRouter() {
	return (
		<RecoilRoot>
			<GlobalFonts />
			<GlobalStyles />
			<ApplicationLayout>
				<BrowserRouter>
					<ScrollToTop />
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/main" element={<MainPage />} />
						<Route path="/simulationlist" element={<SimulationListPage />} />
						<Route path="/simulationdetail/:simulationId" element={<SimulationDetailPage />} />
						<Route path="/gamelist" element={<GameListPage />} />
						<Route path="/gamedetail/:gameId" element={<GameDetailPage />} />
						<Route path="/mypage" element={<MyPage />} />
						<Route path="/simulationmachine" element={<SimulationMachinePage />} />
						<Route path="/machineconfirm" element={<MachineConfirmPage />} />
						<Route path="/sockettest" element={<SocketTestPage />} />
						<Route path="/simulation/test" element={<Scene5page />} />
					</Routes>
				</BrowserRouter>
			</ApplicationLayout>
		</RecoilRoot>
	);
}

export default AppRouter;
