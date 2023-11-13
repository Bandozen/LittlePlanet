import React from 'react';
import Lottie, { Options } from 'react-lottie';
import CompleteAnimation from './lottie.json';

function PointRightLottie() {
	const defaultOptions: Options = {
		loop: true,
		autoplay: true,
		animationData: CompleteAnimation,
	};

	return <Lottie options={defaultOptions} width={50} height={50} isClickToPauseDisabled />;
}

export default PointRightLottie;
