import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { useParams } from 'react-router-dom';
// import { Typography } from '@material-tailwind/react';
import { SimulationDetailWrapper, SimulationLink } from './style';
import simulations from '../../dummys/simulations';

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
				{/* <div className="detail-text">
					<Typography variant="h3" color="blue-gray" className="text-start mb-3">
						시뮬레이션 시나리오 상세 소개
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						1. 인트로: 웹 화면에 GIF나 동영상으로 시작합니다. 내용: 놀이터에서 친구가 다친 상황을 시각화하며, 주변에
						도움을 청할 어른을 찾는 상황을 제시합니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						2. 신고 절차 시작: 인트로 마지막 화면에서 배경으로 전환, 자막과 음성을 통해 어른이 없으니 직접 119에 신고를
						하자는 내용을 전달합니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						3. 신고 상황 연출: 배경화면에 자막과 소방관, 사용자의 전화 대화가 표시됩니다. 소방관이 사용자에게 상황을
						묻고, 사용자는 친구의 부상 상태를 설명합니다. 오답을 선택한 경우, 정확한 대답을 유도하는 자막과 음성이
						제공됩니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						4. 위치 정보 제공: 사용자가 소방관에게 위치 정보를 제공하는 단계입니다. 배경화면에 도로명주소와 상가 지점이
						표시되며, 이를 통해 정확한 위치를 파악하여 전달합니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						5. 부상 상세 정보 제공: 사용자는 친구가 다친 부위에 대한 정보를 소방관에게 전달합니다. 친구의 상태에 대한
						자세한 설명이 요구됩니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						6. 개인 정보 제공: 전화가 끊길 경우를 대비해 사용자가 자신의 신원 정보를 소방관에게 알립니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						7. 결론: 구급차 도착과 함께 소방관의 칭찬을 포함한 아웃트로가 제시됩니다. 웹 음성을 통해 사용자의 행동을
						칭찬하며, 친구가 병원에 안전하게 도착했음을 알립니다.
					</Typography>

					<Typography variant="h3" color="blue-gray" className="text-start">
						기대효과
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						1. 응급 상황 인식 능력 향상: 학생들이 위험한 상황을 식별하고 적절하게 대응하는 방법을 배웁니다. 이는 실제
						생활에서 발생할 수 있는 다양한 위기 상황에 대한 인식을 높이는 데 기여합니다.{' '}
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						2. 응급처치 및 신고 절차 숙지: 시뮬레이션을 통해 학생들은 응급처치 방법과 119 신고 절차를 자연스럽게
						학습하게 됩니다. 이는 실제 응급 상황 발생 시 적절한 대응을 가능하게 합니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						3. 정확한 정보 전달 능력 배양: 위치 정보, 부상 상세, 개인 신원 정보 제공 등을 통해 학생들은 정확한 정보를
						전달하는 방법을 익힙니다. 이는 비상 상황에서 신속하고 정확한 대처가 가능하도록 도와줍니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						4. 자기 주도적인 문제 해결 능력 개발: 신고 시뮬레이션을 통해 학생들은 스스로 상황을 판단하고 결정을 내리는
						자기 주도적인 문제 해결 능력을 키울 수 있습니다.
					</Typography>
					<Typography variant="h5" color="black" className="text-start mb-3">
						5. 사회적 책임감 및 공동체 의식 함양: 이 프로그램은 학생들에게 타인에 대한 도움의 중요성을 가르치며, 사회적
						책임감과 공동체 의식을 함양시킵니다.
					</Typography>
				</div> */}
			</div>
		</SimulationDetailWrapper>
	);
}

export default SimulationDetail;
