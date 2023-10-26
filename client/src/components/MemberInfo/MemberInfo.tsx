import React, { useState, useEffect } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Alert } from '@material-tailwind/react';
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
	const [open, setOpen] = React.useState(false);
	const [confirmOpen, setConfirmOpen] = React.useState(false);

	const handleOpen = () => setOpen((cur) => !cur);

	const [password, setPassword] = useState('');
	const [school, setSchool] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSchool(e.target.value);
	};

	const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirm(e.target.value);
	};

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

	const handleEdit = async () => {
		if (newPassword === passwordConfirm) {
			console.log(newPassword, passwordConfirm);
			try {
				const response = await api.put('member/edit', {
					memberPassword: password,
					memberSchool: school,
					memberNewPassword: newPassword,
				});
				console.log(response);
				setPassword('');
				setSchool('');
				setNewPassword('');
				setPasswordConfirm('');
				handleOpen();
				fetchData();
			} catch (e) {
				console.log(e);
			}
		} else {
			setConfirmOpen(true);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MemberInfoWrapper>
			<div className="memberinfo">
				{member && (
					<>
						<div className="flex items-center">
							<p className="text-3xl mr-3">회원 정보</p>
							<PencilSquareIcon className="h-6 w-6" onClick={handleOpen} />
						</div>
						<Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
							<Card className="mx-auto w-full max-w-[24rem]">
								<CardBody className="flex flex-col gap-4">
									<Typography variant="h4" color="blue-gray">
										회원정보 수정
									</Typography>
									<Typography className="mb-3 font-normal" variant="paragraph" color="gray">
										현재 비밀번호 입력 후, 수정할 정보를 입력하세요
									</Typography>
									<Input
										label="현재 비밀번호"
										type="password"
										value={password}
										onChange={handlePassword}
										size="lg"
										crossOrigin=""
									/>
									<Input label="OO초등학교" size="lg" value={school} onChange={handleSchool} crossOrigin="" />
									<Input
										label="새 비밀번호"
										size="lg"
										type="password"
										value={newPassword}
										onChange={handleNewPassword}
										crossOrigin=""
									/>
									<Input
										label="비밀번호를 한번 더 입력하세요."
										size="lg"
										type="password"
										value={passwordConfirm}
										onChange={handlePasswordConfirm}
										crossOrigin=""
									/>
									<Alert variant="outlined" color="red" open={confirmOpen} onClose={() => setConfirmOpen(false)}>
										비밀번호가 일치하지 않습니다.
									</Alert>
								</CardBody>
								<CardFooter className="pt-0">
									<Button variant="gradient" onClick={handleEdit} fullWidth>
										정보 수정
									</Button>
								</CardFooter>
							</Card>
						</Dialog>
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
