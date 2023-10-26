import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import DetailButton from 'components/Button/DetailButton';
import { GameWrapper, GameLink } from './style';
import games from '../../dummys/games';

function Game() {
	return (
		<GameWrapper>
			<div className="container">
				<div className="info">
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
							<h2>{game.name}</h2>
							{game.description.split('\n').map((line) => (
								<p key={line}>{line}</p>
							))}
						</div>
						<div className="btn-div">
							<div className="btn-div-detail">
								<GameLink to="/gamedetail">
									<DetailButton text="자세히 +" />
								</GameLink>
							</div>
							<div className="btn-div-play">
								<PlayButton text="게임시작" />
							</div>
						</div>
					</div>
				))}
			</div>
		</GameWrapper>
	);
}

export default Game;
