import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { GameWrapper } from './style';
import games from '../../dummys/games';

function Game() {
	return (
		<GameWrapper>
			<div>
				{games.map((game) => (
					<div key={game.id} className="game-item">
						<img src={game.imageUrl} alt={game.name} />
						<div>
							<h2>{game.name}</h2>
							<p>{game.description}</p>
						</div>
						<PlayButton />
					</div>
				))}
			</div>
		</GameWrapper>
	);
}

export default Game;
