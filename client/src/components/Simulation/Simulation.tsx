import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { SimulationWrapper } from './style';

function Simulation() {
	return (
		<SimulationWrapper>
			<div>시뮬레이션 페이지</div>
			<PlayButton />
		</SimulationWrapper>
	);
}

export default Simulation;
