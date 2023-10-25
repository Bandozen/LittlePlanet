import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { SimulationWrapper } from './style';
import simulations from '../../dummys/simulations';

function Simulation() {
	return (
		<SimulationWrapper>
			<div>
				{simulations.map((simulation) => (
					<div key={simulation.id} className="simulation-item">
						<div>
							<img src={simulation.imageUrl} alt={simulation.name} />
						</div>
						<div>
							<h2>{simulation.name}</h2>
							<p>{simulation.description}</p>
							<p>{simulation.need}</p>
						</div>
						<PlayButton />
					</div>
				))}
			</div>
		</SimulationWrapper>
	);
}

export default Simulation;
