import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskSingleWrapper from '../../components/TaskSingleWrapper';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import * as CONSTANTS_TASK from '../../constants/task';
import { StyledComponent } from './styles';

function TaskList(props) {
	let listTaskFromStorage = localStorage.getItem(
		CONSTANTS_LOCAL_STORAGE.LIST_TASK
	)
		? JSON.parse(localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK))
		: [];

	const [listTask, setListTask] = useState(listTaskFromStorage);
	const [searchText, setSearchText] = useState('');
	const [listTaskIdChecked, setListTaskIdChecked] = useState([]);

	const onSelectTask = (taskId, checkStatus) => {
		const cloneListTaskIdChecked = [...listTaskIdChecked];
		if (checkStatus === CONSTANTS_TASK.CHECK_TASK) {
			cloneListTaskIdChecked.push(taskId);
		} else {
			const index = cloneListTaskIdChecked.findIndex((singleTask) => {
				return singleTask === taskId;
			});
			if (index > -1) {
				cloneListTaskIdChecked.splice(index, 1);
			}
		}
		setListTaskIdChecked([...cloneListTaskIdChecked]);
	};
	const onRemoveSingleTask = (taskId) => {
		const deleteConfirm = window.confirm(`Bạn có chắc chắn muốn xóa `);
		if (!deleteConfirm) return;
		const taskIdIndex = listTask.findIndex((singleTask) => {
			return singleTask.id === taskId;
		});
		if (taskIdIndex > -1) {
			let cloneTask = [...listTask];
			cloneTask.splice(taskIdIndex, 1);
			setListTask(cloneTask);
			localStorage.setItem(
				CONSTANTS_LOCAL_STORAGE.LIST_TASK,
				JSON.stringify(cloneTask)
			);
		}
	};

	/**
	 * when search, uncheck all
	 */
	const renderListTask = () => {
		let html = null;
		if (listTaskFromStorage.length > 0) {
			html = listTask.map((singleTask) => {
				return (
					<TaskSingleWrapper
						key={singleTask.id}
						task={singleTask}
						onSelectTask={onSelectTask}
						onRemoveSingleTask={onRemoveSingleTask}
						searchText={searchText}
					/>
				);
			});
		}
		return html;
	};

	const handleRemoveTasks = () => {
		const deleteConfirm = window.confirm(
			`Bạn có chắc chắn muốn xóa các task được chọn `
		);
		if (!deleteConfirm) return;

		const leftTasks = listTask.filter((singleTask) => {
			return !listTaskIdChecked.includes(singleTask.id);
		});
		localStorage.setItem(
			CONSTANTS_LOCAL_STORAGE.LIST_TASK,
			JSON.stringify(leftTasks)
		);
		setListTask([...leftTasks]);
	};

	const renderAction = () => {
		let html = null;
		if (listTaskIdChecked && listTaskIdChecked.length > 0) {
			html = (
				<div className='buildAction'>
					<h4 className='title'>Build action</h4>
					<div className='actions'>
						<button type='button'>Done</button>
						<button
							type='button'
							onClick={() => handleRemoveTasks()}
						>
							Remove
						</button>
					</div>
				</div>
			);
		}
		return html;
	};

	const handleChangeSearch = (e) => {
		setListTaskIdChecked([]);
		setSearchText(e.target.value);
		const searchResult = listTaskFromStorage.filter((singleTask) => {
			return (
				singleTask.taskTitle
					.trim()
					.toLowerCase()
					.indexOf(e.target.value) > -1
			);
		});
		setListTask(searchResult);
	};

	const mainRender = () => {
		if (listTaskFromStorage.length > 0) {
			return (
				<>
					<input
						type='text'
						value={searchText}
						onChange={(e) => handleChangeSearch(e)}
					/>
					{renderListTask()}
					{renderAction()}
				</>
			);
		}
		return (
			<>
				<p>Không có task nào</p>
			</>
		);
	};
	return (
		<StyledComponent>
			<h2 className='pageTitle'>List Tasks</h2>
			{mainRender()}
			<div className='mt-5 text-center'>
				<Link to='/task/add'>
					<button>Add Task</button>
				</Link>
			</div>
		</StyledComponent>
	);
}

export default TaskList;
