import React from 'react';
import DetailButton from 'components/Button/DetailButton';
import { NavBarLink } from 'components/common/NavBar/style';
import { SimulationMainWrapper, SimulationLink } from './style';
import simulations from '../../dummys/simulations';

function Simulation() {
	return (
		<SimulationMainWrapper>
			<div className="main-container">
				<div className="main-info">
					<p>우리 아이 안전한 생활을 위한 시뮬레이션!</p>
					<div className="main-btn-div">
						<div className="main-btn-div-detail">
							<NavBarLink to="simulationlist">
								<DetailButton text="더보기 +" />
							</NavBarLink>
						</div>
					</div>
				</div>
				<div className="main-sims">
					{simulations.map((simulation) => (
						<div key={simulation.id} className="main-simulation-item">
							<div className="main-simulation-img">
								<SimulationLink to={`/simulationdetail/${simulation.id}`}>
									<img src={simulation.imageUrl} alt={simulation.name} />
								</SimulationLink>
							</div>
						</div>
					))}
				</div>
			</div>
		</SimulationMainWrapper>
	);
}

export default Simulation;
