import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { GameWrapper } from './style';

function Game() {
	return (
		<GameWrapper>
			<div>게임 페이지</div>
			<PlayButton />
		</GameWrapper>
	);
}

export default Game;
