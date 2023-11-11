import styled, { keyframes } from 'styled-components';

const loop = keyframes`    
	0%{
        transform: scale(1.6);
        transition: transform 1s;
		top:0px;
		left:-400px;
	}
	50%{
        transform: scale(1.6);
		top:0px;
		left:400px;
	}
	100%{
        transform: scale(1.6);
		top:0px;
		left:-400px;    
	}
`;

export const SeqTwoWrapper = styled.div`
	.alert-container {
		position: absolute;
		bottom: 65%;
		right: 30%;
		z-index: 1;
	}

	:is(.left-right .original) {
		animation-fill-mode: forwards;
	}

	.left-right {
		position: relative;
		animation: ${loop} 10s 1;
		animation-delay: 2s;
	}

	.original {
		transform: scale(1);
		transition: transform 1s;
	}
`;
