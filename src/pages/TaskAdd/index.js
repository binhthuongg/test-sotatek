import React from 'react';
import { Link } from 'react-router-dom';
import TaskSingleForm from '../../components/TaskSingleForm';
import { StyledComponent } from './styles';

function TaskAdd(props) {
	return (
		<StyledComponent>
			<h2 className='pageTitle'>New Task</h2>
			<TaskSingleForm />
			<div className='mt-5 text-center'>
				<Link to='/task/list'>
					<button type='button'>List task</button>
				</Link>
			</div>
		</StyledComponent>
	);
}

export default TaskAdd;
