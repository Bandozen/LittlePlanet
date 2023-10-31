import React from 'react';
import DetailButton from 'components/Button/DetailButton';
import { NavBarLink } from 'components/common/NavBar/style';

import { GameMainWrapper, GameLink } from './style';
import games from '../../dummys/games';

function Game() {
	return (
		<GameMainWrapper>
			<div className="container">
				<div className="info">
					<p>
						우리 아이 게임으로 생활지식<span className="colored"> 쑥쑥</span>!
					</p>
					<div className="main-btn-div">
						<div className="main-btn-div-detail">
							<NavBarLink to="gamelist">
								<DetailButton text="더보기 +" />
							</NavBarLink>
						</div>
					</div>
				</div>
				<div className="main-games">
					{games.map((game) => (
						<div key={game.id} className="game-item">
							<div className="game-img">
								<GameLink to={`/gamedetail/${game.id}`}>
									<img src={game.imageUrl} alt={game.name} />
								</GameLink>
							</div>
						</div>
					))}
				</div>
			</div>
		</GameMainWrapper>
	);
}

export default Game;
