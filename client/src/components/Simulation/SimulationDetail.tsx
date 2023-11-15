import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { useParams } from 'react-router-dom';
// import { Carousel } from '@material-tailwind/react';
import { SimulationDetailWrapper, SimulationLink } from './style';
import simulations from '../../dummys/simulations';
import detailImg from '../../assets/images/detail_ver2.png';

function SimulationDetail() {
	const { simulationId } = useParams();
	const simulation = simulations.find((sim) => sim.id === Number(simulationId));
	if (!simulation) {
		return <p>해당하는 시뮬레이션 정보가 없습니다.</p>;
	}
	return (
		<SimulationDetailWrapper>
			<div className="detail-container">
				<div className="detail-info">
					<p className="text-xl">{simulation.name}</p>
				</div>
				<div className="simulation-item">
					<div className="simulation-img">
						<img src={simulation.imageUrl} alt={simulation.name} />
					</div>
					<div className="simulation-data">
						{simulation.description.split('\n').map((line) => (
							<p key={line}>{line}</p>
						))}
						<div className="need">{simulation.need}</div>
					</div>
					<div className="btn-div-play">
						<SimulationLink to="/simulationmachine">
							<PlayButton text="시작하기" />
						</SimulationLink>
					</div>
				</div>
				<div className="detail-img">
					<img src={detailImg} alt={simulation.name} />
				</div>
			</div>
		</SimulationDetailWrapper>
	);
}

export default SimulationDetail;
