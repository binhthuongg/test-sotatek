import React, { useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as CONSTANTS_TASK from '../../constants/task';
import TaskSingleForm from '../TaskSingleForm';
import { StyledComponent } from './styles';

function TaskSingleWrapper(props) {
	const [isShowTaskDetail, setIsShowTaskDetail] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [task, setTask] = useState(props.task);
	const toggleShowTaskId = () => {
		setIsShowTaskDetail(!isShowTaskDetail);
	};
	const checkBoxRef = useRef(false);
	const onEdit = (newTask) => {
		setTask(newTask);
	};
	const handleRemoveTaskId = (taskId) => {
		props.onRemoveSingleTask(taskId);
	};
	const handleCheck = (e, taskId) => {
		setIsChecked(e.target.checked);
		if (e.target.checked) {
			props.onSelectTask(taskId, CONSTANTS_TASK.CHECK_TASK);
		} else {
			props.onSelectTask(taskId, CONSTANTS_TASK.UNCHECK_TASK);
		}
	};
	useEffect(() => {
		if (props.searchText) {
			checkBoxRef.current.checked = false;
			setIsChecked(false);
		}
	}, [props.searchText]);
	return (
		<StyledComponent>
			<div className='taskHeader'>
				<div className='titleWrapper'>
					<input
						type='checkbox'
						ref={checkBoxRef}
						checked={isChecked}
						onChange={(e) => handleCheck(e, task.id)}
					/>
					<h4 className='taskTitle'>{task.taskTitle}</h4>
				</div>
				<div className='buttonGroups'>
					<button
						type='button'
						className='btn-green'
						onClick={() => toggleShowTaskId()}
					>
						{isShowTaskDetail ? 'Hide Detail' : 'Detail'}
					</button>
					<button
						type='button'
						className='btn-red'
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
