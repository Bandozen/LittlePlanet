import { Simulation } from '../types/simulation';

const simulations: Simulation[] = [
	{
		id: 1,
		name: '119에 신고해요',
		description:
			'안전한 생활을 위해 꼭 필요한 긴급구조 119!\n아이들이 위급한 상황을 목격했을 때,\n직접 119에 전화해 볼 수 있습니다.',
		need: '준비물 : 신고를 도와줄 스마트폰',
		imageUrl: 'https://littleplanet.s3.ap-northeast-2.amazonaws.com/simulation/119main.png',
	},
	{
		id: 2,
		name: '소화기를 알아요',
		description: '집에 불이 났어요!\n먼저 집에 소화기가 있는지 찾아볼까요?',
		need: '준비물 : 신고를 도와줄 스마트폰',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/simulation/%ED%99%94%EC%9E%AC%EB%8C%80%ED%94%BC.png',
	},
	{
		id: 3,
		name: '가스냄새가 나요',
		description: '집에서 가스냄새가 나면, 어떻게 해야 할까요?',
		need: '준비물 : 신고를 도와줄 스마트폰',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/simulation/%EA%B0%80%EC%8A%A4%EB%83%84%EC%83%88%EA%B0%80%EB%82%98%EC%9A%94.png',
	},
];

export default simulations;
