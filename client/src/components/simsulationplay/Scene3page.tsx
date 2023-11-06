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

// 다리를 다쳐서 피가 나요.
function Scene3page() {
	const [contentsData, setContentsData] = useState<Content[]>([]);
	const [isWrong, setIsWrong] = useState(false);
	const answer = '다리를 다쳐서 피가 많이 나요.';

	const fetchData = async () => {
		try {
			const contentsResponse = await api.get('/contents?type=11&num=3');
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
			<Alert variant="outlined">
				{contentsData[0] ? contentsData[0].contentsUrlName : '...loading'}
				이제 소방관에게 친구가 어디를 다쳤는지 알려줘야 해. 먼저 친구 쪽으로 가보자.
			</Alert>
			{/* 다가갔다고 인식되면 다친 친구 확대로 변경 */}
			<Alert>
				<Typography variant="h3">소방관에게 다친 친구에 대해 설명해줘.</Typography>
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

export default Scene3page;
