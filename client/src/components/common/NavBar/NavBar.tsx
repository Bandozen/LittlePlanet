import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import logo from 'assets/images/logo.png';
import api from '../../../api';
import { NavBarWrapper, NavBarLink } from './style';
import { userEmail } from '../../../store/RecoilState';

function NavBar() {
	const userMail = useRecoilValue(userEmail);
	const setUserMail = useSetRecoilState(userEmail);

	const handleLogout = async () => {
		try {
			await api.post('/member/command', {
				memberEmail: userMail,
				memberCommand: 'logout',
			});
			setUserMail('');
			const response = await api.post('/member/logout');
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<NavBarWrapper>
			<div className="nav-container">
				<div className="main_logo">
					<Link to="/main">
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
						<NavBarLink to="/" onClick={handleLogout}>
							로그아웃
						</NavBarLink>
					</li>
				</ul>
			</div>
		</NavBarWrapper>
	);
}

export default NavBar;
