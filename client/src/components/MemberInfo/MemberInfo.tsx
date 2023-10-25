import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MemberInfoWrapper } from './style';

type MemberData = {
	memberEmail: string;
	memberSchool: string;
	memberSeq: number;
};

type StudentData = {
	studentSeq: number;
	studentName: string;
	studentGrade: string;
	studentClass: string;
};

function MemberInfo() {
	// const [token, setToken] = useState(null);
	const token =
		'eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJFbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiaWF0IjoxNjk4MjIwMDU3LCJleHAiOjE2OTgzMDY0NTd9.B-KHCOaIbj57i3qmlGILrk42ECDfOTCpgGhgbivxYvgHONDNaEqk43u4cOL-wpFort-hZJ4tr8q5wr0RzvCTxQ';

	const [member, setMember] = useState<MemberData | null>(null);
	const [students, setStudents] = useState<StudentData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const memberResponse = await axios.get('http://localhost:8080/api/v1/member', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setMember(memberResponse.data);

				const studentResponse = await axios.get('http://localhost:8080/api/v1/student', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setStudents(studentResponse.data);
			} catch (error) {
				console.log('api 요청 실패', error);
			}
		};

		fetchData();
	}, []);

	return (
		<MemberInfoWrapper>
			<div className="memberinfo">
				{member && (
					<>
						<h1>회원 정보</h1>
						<p>이메일: {member.memberEmail}</p>
						<p>학교명: {member.memberSchool}</p>
					</>
				)}
			</div>
			<div className="memberinfoimg" />
			<div>
				<h1>학생 정보</h1>
				<ul>
					{students.map((student) => (
						<li key={student.studentSeq}>
							<p>
								{student.studentName} {student.studentGrade} {student.studentClass}
							</p>
						</li>
					))}
				</ul>
			</div>
		</MemberInfoWrapper>
	);
}

export default MemberInfo;
