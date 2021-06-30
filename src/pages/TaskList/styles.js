import styled from 'styled-components';

export const StyledComponent = styled.div`
	display: block;
	.mainContainer {
		padding-top: 100px;
	}
	.postListWrapper {
		position: relative;
		padding-left: 100px;
	}
	.postShareWrapper {
		position: fixed;
		z-index: 1;
		top: 200px;
	}
	.buildAction {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #e0e0e0;
		padding: 15px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid #ccc;
		.title {
			font-weight: normal;
		}
		.actions {
			button {
				margin: 5px 3px;
			}
		}
	}
`;
