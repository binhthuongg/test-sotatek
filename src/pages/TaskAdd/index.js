import React from 'react';
import TaskSingleForm from '../../components/TaskSingleForm';
import { StyledComponent } from './styles';

function TaskAdd(props) {
	return (
		<StyledComponent>
			<h3 className='title'>New Task</h3>
			<TaskSingleForm />
		</StyledComponent>
	);
}

export default TaskAdd;
