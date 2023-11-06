import React, { useState, useEffect } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { PhoneArrowUpRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import api from '../../api';

type Content = {
	contentsUrlName: string;
	contentsUrlAddress: string;
	contentsUrlType: number;
	contentsUrlNum: number;
};

// 이름 말하기.
function Scene4page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [isWrong, setIsWrong] = useState(false);
	const answer = '학생 이름 받아두기';

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=4');
			setContentsData(contentsResponse.data);
			console.log(contentsResponse.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{/* 타임아웃 */}
			<Alert variant="outlined">
				{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
				이제 통화가 끊길 경우를 대비해 내가 누군지 소방관에게 말해야 해.
			</Alert>
			<Alert>
				<Typography variant="h3">소방관에게 자기 소개를 해보자!</Typography>
			</Alert>
			<Alert className="flex justify-center" variant="gradient" open={isWrong} onClose={() => setIsWrong(false)}>
				<div className="flex flex-row m-3">
					<SparklesIcon className="w-10 h-10 mr-2" color="yellow" />
					<Typography variant="h3">이렇게 말해볼까?</Typography>
				</div>
				<div className="flex flex-row items-center">
					<PhoneArrowUpRightIcon className="w-5 h-5 mr-2" />
					<Typography variant="h5">{answer}</Typography>
				</div>
			</Alert>
		</>
	);
}

export default Scene4page;
