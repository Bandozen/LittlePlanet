import React from 'react';
import { Link } from 'react-router-dom';
import { NavBarWrapper, NavBarLink } from './style';
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
					<li>
						<NavBarLink to="/simulationlist" className={({ isActive }) => (isActive ? 'active' : '')}>
							시뮬레이션
						</NavBarLink>
					</li>
					<li>
						<NavBarLink to="/gamelist" className={({ isActive }) => (isActive ? 'active' : '')}>
							게임
						</NavBarLink>
					</li>
					<li>
						<NavBarLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
							마이페이지
						</NavBarLink>
					</li>
					<li>
						<NavBarLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
							(임시)로그인
						</NavBarLink>
					</li>
				</ul>
			</div>
		</NavBarWrapper>
	);
}

export default NavBar;
