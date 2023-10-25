import React, { useState } from 'react';
import Button from 'components/common/Button';
import { MainWrapper } from './style';

function Main() {
	const [num, setNum] = useState(0);
	console.log(num);

	return (
		<MainWrapper>
			<div className="bgimage">
				<div className="main-div">
					<div className="sub-text">작은 행동으로 성장할 수 있습니다.</div>
					<div className="main-text">소 행 성</div>
					<Button text="체험하기" handleClick={() => setNum(1)} />
				</div>
			</div>
		</MainWrapper>
	);
}

export default Main;
