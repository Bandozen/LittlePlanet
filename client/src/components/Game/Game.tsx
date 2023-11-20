import React, { useState } from 'react';
import PlayButton from 'components/Button/PlayButton';
import DetailButton from 'components/Button/DetailButton';
import { GameWrapper } from './style';
import games from '../../dummys/games';
import NotYetModal from '../Simulation/NotYetModal/NotYetModal';

function Game() {
	const [showNotYetModal, setShowNotYetModal] = useState(false);

	const handleClick = () => {
		setShowNotYetModal(true);
	};

	return (
		<GameWrapper>
			<div className="info mt-10 mb-5">
				<p>
					우리 아이 게임으로 생활지식<span className="colored"> 쑥쑥</span>!
				</p>
			</div>
			{games.map((game) => (
				<div key={game.id} className="game-item">
					<div className="game-img">
						<img src={game.imageUrl} alt={game.name} />
					</div>
					<div className="game-data">
						<p className="text-2xl font-bold">{game.name}</p>
						{game.description.split('\n').map((line) => (
							<p key={line}>{line}</p>
						))}
					</div>
					<div
						role="button"
						tabIndex={0}
						onClick={handleClick}
						onKeyDown={(event) => {
							if (event.key === 'Enter' || event.key === ' ') {
								handleClick();
							}
						}}
					>
						<div className="btn-div-detail">
							<DetailButton text="자세히 +" />
						</div>
						<div className="btn-div-play">
							<PlayButton text="게임시작" />
						</div>
					</div>
					<NotYetModal isOpen={showNotYetModal} onClose={() => setShowNotYetModal(false)} />
				</div>
			))}
		</GameWrapper>
	);
}

export default Game;
