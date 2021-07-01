import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskSingleWrapper from '../../components/TaskSingleWrapper';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import * as CONSTANTS_TASK from '../../constants/task';
import { StyledComponent } from './styles';

function TaskList(props) {
	const listTaskFromStorage = localStorage.getItem(
		CONSTANTS_LOCAL_STORAGE.LIST_TASK
	)
		? JSON.parse(localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK))
		: [];

	const listTaskFromStorageFilter = listTaskFromStorage.sort((a, b) =>
		dayjs(a.dueDate).isAfter(dayjs(b.dueDate)) ? -1 : 1
	);

	const [listTask, setListTask] = useState(listTaskFromStorageFilter);
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
		const deleteConfirm = window.confirm(`Bạn có chắc chắn muốn xóa ?`);
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
			alert('Xóa task thành công !');
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
			`Bạn có chắc chắn muốn xóa các task được chọn ?`
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
		setListTaskIdChecked([]);
		alert('Xóa task thành công !');
	};

	const renderAction = () => {
		let html = null;
		if (listTaskIdChecked && listTaskIdChecked.length > 0) {
			html = (
				<div className='buildAction'>
					<h4 className='title'>Build Action:</h4>
					<div className='actions'>
						<button type='button'>Done</button>
						<button
							type='button'
							className='btn-red'
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

	/**
	 * filter
	 * when search, uncheck all
	 */
	const handleChangeSearch = (e) => {
		setListTaskIdChecked([]);
		setSearchText(e.target.value);
		const searchResult = listTaskFromStorage.filter((singleTask) => {
			return (
				singleTask.taskTitle
					.toLowerCase()
					.indexOf(e.target.value.toLowerCase()) > -1
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
						placeholder='Search'
						onChange={(e) => handleChangeSearch(e)}
					/>
					{renderListTask()}
					{renderAction()}
				</>
			);
		}
		return <p>Không có task nào</p>;
	};
	return (
		<StyledComponent>
			<h2 className='pageTitle'>To do List</h2>
			{mainRender()}
			<div className='mt-50 text-center'>
				<Link to='/task/add'>
					<button>New Task</button>
				</Link>
			</div>
		</StyledComponent>
	);
}

export default TaskList;
