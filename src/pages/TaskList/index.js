import React from 'react';
import { Link } from 'react-router-dom';
import TaskSingleWrapper from '../../components/TaskSingleWrapper';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import { StyledComponent } from './styles';

function TaskList(props) {
	const listTask = localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK)
		? JSON.parse(localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK))
		: [];

	const handleOpenDetail = (id) => {
		console.log(id);
		if (id) {
			return true;
		}
		return false;
	};

	const mainRender = () => {
		console.log(listTask);
		if (listTask.length > 0) {
			let html = listTask.map((singleTask) => {
				return (
					<TaskSingleWrapper
						key={singleTask.id}
						task={singleTask}
						isOpenDetail={handleOpenDetail}
					/>
				);
			});
			return html;
		}
		return (
			<>
				<h4>"Không có task nào"</h4>
				<Link to='/task/add'>Add Task</Link>
			</>
		);
	};
	return (
		<StyledComponent>
			<h2>List Tasks</h2>
			{mainRender()}
		</StyledComponent>
	);
}

export default TaskList;
