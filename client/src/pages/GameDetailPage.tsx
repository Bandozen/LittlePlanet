import React from 'react';
import NavBar from '../components/common/NavBar/NavBar';
import GameDetail from '../components/Game/GameDetail';

function GameDetailPage() {
	return (
		<div>
			<NavBar />
			<hr />
			<GameDetail />
		</div>
	);
}

export default GameDetailPage;
