import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarWrapper } from './style';
import logo from '../../assets/logo.png';

function NavBar() {
	return (
		<NavBarWrapper>
			<div className="nav-container">
				<div className="main_logo">
					<Link to="/">
						<img src={logo} alt="" />
					</Link>
				</div>
				<ul>
					<Link to="/simulationlist">
						<li>시뮬레이션</li>
					</Link>
					<Link to="/gamelist">
						<li>게임</li>
					</Link>
					<Link to="/mypage">
						<li>마이페이지</li>
					</Link>
					<Link to="/login">
						<li>(임시)로그인</li>
					</Link>
				</ul>
			</div>
		</NavBarWrapper>
	);
}

export default NavBar;
