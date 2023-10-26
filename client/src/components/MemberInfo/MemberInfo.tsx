import React, { useState, useEffect } from 'react';
import { MemberInfoWrapper } from './style';
import api from '../../api';

type MemberData = {
	memberEmail: string;
	memberSchool: string;
};

type StudentData = {
	studentSeq: number;
	studentName: string;
	studentGrade: string;
	studentClass: string;
};

function MemberInfo() {
	const [member, setMember] = useState<MemberData | null>(null);
	const [students, setStudents] = useState<StudentData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const memberResponse = await api.get('/member');
				setMember(memberResponse.data);
				const studentResponse = await api.get('/student');
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
