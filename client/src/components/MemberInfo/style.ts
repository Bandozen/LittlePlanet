/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import memberBg from '../../assets/member_image.png';

export const MemberInfoWrapper = styled.div`
	display: flex;
	flex-flow: row wrap;
	height: 80vh;
	width: 100vw;

	.memberinfoimg {
		background-image: url(${memberBg});
		background-color: black;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		height: 30%;
		width: 50%;
	}

	.memberinfo {
		background-color: yellow;
		height: 30%;
		width: 50%;
	}

	.studentsinfo {
		background-color: yellowgreen;
		width: 100%;
	}
`;
