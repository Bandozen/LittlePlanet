import React from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
import { GlobalFonts } from 'styles/GlobalFonts';
import { GlobalStyles } from 'styles/GlobalStyles';
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
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
import EmergencyCall from 'components/simsulationplay/EmergencyCall';
// import SimulationPlayPage from 'pages/SimulationPlayPage';
import RedisTestPage from 'pages/RedisTestPage';

function ProtectedRoute() {
	const email = useRecoilValue(userEmail);
	return email ? <Outlet /> : <Navigate to="/" />;
}

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
						<Route element={<ProtectedRoute />}>
							<Route path="/simulationlist" element={<SimulationListPage />} />
							<Route path="/simulationdetail/:simulationId" element={<SimulationDetailPage />} />
							<Route path="/gamelist" element={<GameListPage />} />
							<Route path="/gamedetail/:gameId" element={<GameDetailPage />} />
							<Route path="/mypage" element={<MyPage />} />
							<Route path="/simulationmachine" element={<SimulationMachinePage />} />
							<Route path="/machineconfirm" element={<MachineConfirmPage />} />
							<Route path="/simulation/test" element={<EmergencyCall />} />
							<Route path="/redistest" element={<RedisTestPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ApplicationLayout>
		</RecoilRoot>
	);
}

export default AppRouter;
