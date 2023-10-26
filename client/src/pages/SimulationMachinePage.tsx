import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import SimulationMachine from 'components/simulationmachine/SimulationMachine/SimulationMachine';
import OpenModal from 'components/simulationmachine/OpenModal/OpenModal';
import HowToUse from 'components/simulationmachine/HowToUse/HowToUse';

function SimulationMachinePage() {
	return (
		<div>
			<NavBar />
			<SimulationMachine />
			<HowToUse />
			<OpenModal />
		</div>
	);
}

export default SimulationMachinePage;
