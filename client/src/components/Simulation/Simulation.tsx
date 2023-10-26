import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import DetailButton from 'components/Button/DetailButton';
import { SimulationWrapper, SimulationLink } from './style';
import simulations from '../../dummys/simulations';

function Simulation() {
	return (
		<SimulationWrapper>
			<div className="container">
				<div className="info">
					<p>
						우리 아이 <span className="colored">안전한 생활</span>을 위한 <span className="colored">시뮬레이션</span>!
					</p>
				</div>
				{simulations.map((simulation) => (
					<div key={simulation.id} className="simulation-item">
						<div className="simulation-img">
							<img src={simulation.imageUrl} alt={simulation.name} />
						</div>
						<div className="simulation-data">
							<h2>{simulation.name}</h2>
							{simulation.description.split('\n').map((line) => (
								<p key={line}>{line}</p>
							))}
							<div className="need">{simulation.need}</div>
						</div>
						<div className="btn-div">
							<div className="btn-div-detail">
								<SimulationLink to={`/simulationdetail/${simulation.id}`}>
									<DetailButton text="자세히 +" />
								</SimulationLink>
							</div>
							<div className="btn-div-play">
								<SimulationLink to="/simulationmachine">
									<PlayButton text="시작하기" />
								</SimulationLink>
							</div>
						</div>
					</div>
				))}
			</div>
		</SimulationWrapper>
	);
}

export default Simulation;
