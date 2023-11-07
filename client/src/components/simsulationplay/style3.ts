/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import background from '../../assets/images/background.png';
export const Scene3Wrapper = styled.div`
	.background-image {
		background-image: url(${background});
		background-size: cover; /* 배경 이미지를 컨테이너에 맞게 확대 또는 축소합니다. */
		background-position: center; /* 배경 이미지를 수평 및 수직 가운데 정렬합니다. */
		background-repeat: no-repeat; /* 배경 이미지 반복을 중단합니다. */
		width: 150vh; /* 필요에 따라 컨테이너의 너비와 높이를 조절합니다. */
		height: 100vh;
	}
	.background-right {
		background-image: url(${background});
		background-size: cover; /* 배경 이미지를 컨테이너에 맞게 확대 또는 축소합니다. */
		background-position: right; /* 배경 이미지를 수평 및 수직 가운데 정렬합니다. */
		background-repeat: no-repeat; /* 배경 이미지 반복을 중단합니다. */
		width: 150vh; /* 필요에 따라 컨테이너의 너비와 높이를 조절합니다. */
		height: 100vh;
	}
	.background-left {
		background-image: url(${background});
		background-size: cover; /* 배경 이미지를 컨테이너에 맞게 확대 또는 축소합니다. */
		background-position: left; /* 배경 이미지를 수평 및 수직 가운데 정렬합니다. */
		background-repeat: no-repeat; /* 배경 이미지 반복을 중단합니다. */
		width: 150vh; /* 필요에 따라 컨테이너의 너비와 높이를 조절합니다. */
		height: 100vh;
	}
	.zoomed {
		transform: scale(2); /* 원하는 확대 비율을 지정 */
		transition: transform 0.5s; /* 원하는 애니메이션 시간을 지정 */
		transform-origin: 60% 80%;
	}
`;
