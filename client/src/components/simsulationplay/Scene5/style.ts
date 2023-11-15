/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import outrobgimg1 from '../../../assets/images/outrobackground1.png';
import outrobgimg2 from '../../../assets/images/outrobackground2.png';

export const Scene5Wrapper = styled.div`
	background-image: url(${outrobgimg1});
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	width: 100vw;
	height: 100vh;
	.btn-style {
		margin-top: 50px;
	}
`;
export const Bg2Wrapper = styled.div`
	background-image: url(${outrobgimg2});
	background-size: 100%;
	background-position: center;
	background-repeat: no-repeat;
	width: 100vw;
	height: 100vh;
	.btn-style {
		margin-top: 50px;
	}
`;
