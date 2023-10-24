import MainPage from 'pages/MainPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
