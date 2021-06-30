import styled from 'styled-components';

export const StyledComponent = styled.div`
	/* border: 1px solid #ccc; */
	display: block;
	margin-bottom: 30px;
	.taskHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border: 1px solid #ccc;
	}
	.taskHeader,
	form {
		padding-left: 15px;
		padding-right: 15px;
	}
	.buttonGroups {
		button:not(:last-child) {
			margin-right: 10px;
		}
	}
	form {
		padding-top: 30px;
		padding-bottom: 30px;
		border: 1px solid #ccc;
		border-top: none;
	}
	.titleWrapper {
		display: flex;
		align-items: center;
	}
	input[type='checkbox'] {
		/* position: relative; */
		/* top: 3px; */
	}
	.taskTitle {
		margin: 0;
		font-size: 1.35em;
		font-weight: normal;
	}
`;
