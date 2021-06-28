import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import TaskSingleForm from '../TaskSingleForm';
import { StyledComponent } from './styles';

function TaskSingleWrapper(props) {
	console.log('props', props);
	const { task } = props;
	const [isShowTaskDetail, setIsShowTaskDetail] = useState(false);
	const [taskIdOpened, setTaskIdOpened] = useState(null);
	const [reRender, setReRender] = useState(0);
	const handleShowTaskId = (id) => {
		localStorage.setItem(CONSTANTS_LOCAL_STORAGE.TASK_ID_SHOWED, id);
		setTaskIdOpened(id);
		setReRender(reRender + 1);
	};
	const handleRemoveTaskId = (id) => {
		console.log(id);
	};
	useEffect(() => {
		const taskIdOpened2 =
			localStorage.getItem(CONSTANTS_LOCAL_STORAGE.TASK_ID_SHOWED) || '';
		console.log('taskIdOpened', taskIdOpened);
		console.log('task.id', task.id);
		if (task.id === taskIdOpened2) {
			setIsShowTaskDetail(true);
		} else {
			setIsShowTaskDetail(false);
		}
		return () =>
			localStorage.removeItem(CONSTANTS_LOCAL_STORAGE.TASK_ID_SHOWED);
	}, [task.id, taskIdOpened, reRender]);
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
