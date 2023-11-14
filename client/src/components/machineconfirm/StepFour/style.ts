import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-contents: space-around;
	align-items: center;
	margin-left: 10%;

	.image-wrapper {
		position: relative;
		border-radius: 10px;
		margin: 20px;
		width: 640px;
		height: 480px;
	}

	.loading {
		height: 480px;
		width: 640px;
		align-items: center;
		justify-content: center;
	}
`;
