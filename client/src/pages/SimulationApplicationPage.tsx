import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import SimulationApplication from 'components/simualtionapplication/SimulationApplication/SimulationApplication';
import AppHowToUse from 'components/simualtionapplication/HowToUse/AppHowToUse';
import OpenModal from 'components/simualtionapplication/OpenModal/OpenModal';

function SimulationApplicationPage() {
	return (
		<div>
			<NavBar />
			<SimulationApplication />
			<AppHowToUse />
			<OpenModal />
		</div>
	);
}

export default SimulationApplicationPage;
