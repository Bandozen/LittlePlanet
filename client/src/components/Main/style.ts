/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import mainBg from '../../assets/main_image.png';

export const MainWrapper = styled.div`
	.bgimage {
		background-image: url(${mainBg});
		height: 700px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: row-reverse; /* 이 부분이 세로 배열을 위한 코드입니다 */
		align-items: center;
	}

	.main-div {
		display: flex;
		flex-direction: column; /* 이 부분이 세로 배열을 위한 코드입니다 */
		align-items: flex-end; /* 수평 중앙에 위치시키는 코드 */
		color: white;
		margin-right: 4rem;
	}
	.main-text {
		font-size: 5rem;
		font-weight: bold;
		padding: 0rem 0rem 3rem 0rem;
	}
	.sub-text {
		font-size: 2.5rem;
	}
`;
