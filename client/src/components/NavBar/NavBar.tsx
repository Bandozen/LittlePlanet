import React from 'react';
import './NavBar.css';
import logo from '../../assets/logo.png';

function NavBar() {
	return (
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
	);
}

export default NavBar;
