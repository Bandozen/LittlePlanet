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
		name: '어느 병원으로 가야 할까요?',
		description: '친구가 아픈 곳이 있어요!\n어느 병원을 가야 하는지 맟춰볼까요?',
		imageUrl: 'https://littleplanet.s3.ap-northeast-2.amazonaws.com/game/%EC%96%B4%EB%8A%90%EB%B3%91%EC%9B%90.jpg',
	},
	{
		id: 3,
		name: '이를 잘 닦아보아요!',
		description: '이~ 하면 보이는 세균을 칫솔질로 물리쳐보아요!\n치카포카~치카포카~ 깨끗해지면 기분이 좋아질거에요!',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/game/%EC%9D%B4%EB%A5%BC%EC%9E%98%EB%8B%A6%EC%95%84%EC%9A%94.jpg',
	},
];

export default games;
