import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { MainWrapper } from './style';

function Main() {
	return (
		<MainWrapper>
			<div className="bgimage">
				<div className="main-div">
					<div className="sub-text">작은 행동으로 성장할 수 있습니다.</div>
					<div className="main-text">소 행 성</div>
					<PlayButton text="체험하기" />
				</div>
			</div>
		</MainWrapper>
	);
}

export default Main;
