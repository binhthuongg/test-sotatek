import dayjs from 'dayjs';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import RenderDatePicker from '../RenderDatePicker';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import { StyledComponent } from './styles';
import TaskSingleForm from '../TaskSingleForm';

function TaskSingleWrapper(props) {
	console.log('props', props);
	const { task, isOpenDetail } = props;
	const [isShowTaskDetail, setIsShowTaskDetail] = useState(false);
	const handleShowTaskId = (id) => {
		console.log(id);
		isOpenDetail(task.id);
		localStorage.setItem(CONSTANTS_LOCAL_STORAGE.TASK_ID_SHOWED, id);
		if (task.id === id) {
			setIsShowTaskDetail(true);
		} else {
			setIsShowTaskDetail(false);
		}
	};
	const handleRemoveTaskId = (id) => {
		console.log(id);
	};
	return (
		<StyledComponent>
			<div className='taskHeader'>
				<h4 className='taskTitle'>{task.taskTitle}</h4>
				<div className='buttonGroups'>
					<button
						type='button'
						onClick={() => handleShowTaskId(task.id)}
					>
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
			{isShowTaskDetail && <TaskSingleForm isEdit task={task} />}
		</StyledComponent>
	);
}

export default TaskSingleWrapper;
