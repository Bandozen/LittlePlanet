import { Game } from '../types/game';

const games: Game[] = [
	{
		id: 1,
		name: '하늘에서 쓰레기가 내려온다면?',
		description: '하늘에서 쓰레기가 내려와요!\n분리수거를 정확히 하지 않으면, 집이 더러워질 수 있어요!',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/game/%ED%9C%B4%EC%A7%80%EB%8A%94%ED%9C%B4%EC%A7%80%ED%86%B5%EC%97%90.png',
	},
	{
		id: 2,
		name: '친구와 함께 단어를 맞춰요!',
		description: '제시되는 문제에 빈칸에 들어갈 낱말을\n친구와 함께 맟춰볼까요?',
		imageUrl: 'https://littleplanet.s3.ap-northeast-2.amazonaws.com/game/%EC%96%B4%EB%8A%90%EB%B3%91%EC%9B%90.jpg',
	},
];

export default games;
