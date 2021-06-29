import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as CONSTANTS_TASK from '../../constants/task';
import TaskSingleForm from '../TaskSingleForm';
import { StyledComponent } from './styles';

function TaskSingleWrapper(props) {
	console.log('props', props);
	const [isShowTaskDetail, setIsShowTaskDetail] = useState(false);
	const [task, setTask] = useState(props.task);
	const toggleShowTaskId = () => {
		setIsShowTaskDetail(!isShowTaskDetail);
	};
	const onEdit = (newTask) => {
		setTask(newTask);
	};
	const handleRemoveTaskId = (id) => {
		console.log(id);
	};
	return (
		<StyledComponent>
			<div className='taskHeader'>
				<h4 className='taskTitle'>{task.taskTitle}</h4>
				<div className='buttonGroups'>
					<button type='button' onClick={() => toggleShowTaskId()}>
						Detail
					</button>
					<button
						type='button'
						onClick={() => handleRemoveTaskId(task.id)}
					>
						Remove
					</button>
				</div>
			</div>
			{isShowTaskDetail && (
				<TaskSingleForm
					formAction={CONSTANTS_TASK.IS_EDIT_TASK}
					task={task}
					edit={onEdit}
				/>
			)}
		</StyledComponent>
	);
}

export default TaskSingleWrapper;
