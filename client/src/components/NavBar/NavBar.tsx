import React from 'react';
import { NavBarWrapper } from './style';
import logo from '../../assets/logo.png';

function NavBar() {
	return (
		<NavBarWrapper>
			<div className="nav-container">
				<div className="main_logo">
					<img src={logo} alt="" />
				</div>
				<ul>
					<li>시뮬레이션</li>
					<li>게임</li>
					<li>마이페이지</li>
					<li>로그인 / 회원가입</li>
				</ul>
			</div>
		</NavBarWrapper>
	);
}

export default NavBar;
