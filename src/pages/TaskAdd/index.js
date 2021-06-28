import React from 'react';
import { Link } from 'react-router-dom';
import TaskSingleForm from '../../components/TaskSingleForm';
import { StyledComponent } from './styles';

function TaskAdd(props) {
	return (
		<StyledComponent>
			<h3 className='title'>New Task</h3>
			<TaskSingleForm />
			<Link to='/task/list'>List task</Link>
		</StyledComponent>
	);
}

export default TaskAdd;
