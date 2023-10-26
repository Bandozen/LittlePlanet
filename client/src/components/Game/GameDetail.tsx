import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { useParams } from 'react-router-dom';
import { GameWrapper } from './style';
import games from '../../dummys/games';

function GameDetail() {
	const { gameId } = useParams();
	const game = games.find((gm) => gm.id === Number(gameId));
	if (!game) {
		return <p>해당하는 게임 정보가 없습니다.</p>;
	}
	return (
		<GameWrapper>
			<div className="container">
				<div className="info">
					<p>게임디테일 컴포넌트</p>
				</div>
				<div className="game-item">
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
						<div className="btn-div-play">
							{/* 게임 기기연결페이지 생기면 이렇게 바꾸기
								<GameLink to="/gamemachine">
									<PlayButton text="시작하기" />
								</GameLink> */}
							<PlayButton text="게임시작" />
						</div>
					</div>
				</div>
			</div>
		</GameWrapper>
	);
}

export default GameDetail;
