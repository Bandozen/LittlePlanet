import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import MemberInfo from '../components/MemberInfo/MemberInfo';

function MyPage() {
	return (
		<div>
			<NavBar />
			<h1>마이페이지</h1>
			<MemberInfo />
		</div>
	);
}

export default MyPage;
