import React from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalFonts } from 'styles/GlobalFonts';
import { GlobalStyles } from 'styles/GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from 'pages/LoginPage';
import MainPage from 'pages/MainPage';
import SimulationListPage from 'pages/SimulationListPage';
import GameListPage from 'pages/GameListPage';
import MyPage from 'pages/MyPage';
import SimulationMachinePage from 'pages/SimulationMachinePage';

function AppRouter() {
	return (
		<RecoilRoot>
			<GlobalFonts />
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/simulationlist" element={<SimulationListPage />} />
					<Route path="/gamelist" element={<GameListPage />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/simulationmachine" element={<SimulationMachinePage />} />
				</Routes>
			</BrowserRouter>
		</RecoilRoot>
	);
}

export default AppRouter;
