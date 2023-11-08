import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	justify-contents: space-around;
	align-items: center;
	margin-left: 20%;

	.image-wrapper {
		position: relative;
		border: solid 2px #188eb7;
		border-radius: 10px;
		margin: 20px;
		width: 460px;
		height: 450px;
		display: flex;
	}

	.loading {
		/* width: 90%; */
		margin: 0px;
		/* justify-items: center; */
		align-items: center;
	}
`;
