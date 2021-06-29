import dayjs from 'dayjs';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import * as CONSTANTS_TASK from '../../constants/task';
import RenderDatePicker from '../RenderDatePicker';
import { StyledComponent } from './styles';

/**
 * params: formAction: edit is edit, else is add
 */
function TaskSingleForm(props) {
	const textError = 'Thời gian không được trước ngày hôm nay';
	const listPriority = {
		low: 'low',
		normal: 'normal',
		high: 'high',
	};

	const { formAction, task, edit } = props;

	const IsBeforeNow = (dateString) => {
		if (dayjs(dateString).isBefore(dayjs(), 'day')) {
			return true;
		}
		return false;
	};

	const listTask = localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK)
		? JSON.parse(localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK))
		: [];

	const handleAddNewTask = (newTask) => {
		listTask.push(newTask);
		localStorage.setItem(
			CONSTANTS_LOCAL_STORAGE.LIST_TASK,
			JSON.stringify(listTask)
		);
	};
	const handleEditTask = (taskUpdated) => {
		const taskUpdatedIndex = listTask.findIndex((singleTask) => {
			return singleTask.id === taskUpdated.id;
		});
		const cloneListTask = [...listTask];
		cloneListTask[taskUpdatedIndex] = taskUpdated;
		localStorage.setItem(
			CONSTANTS_LOCAL_STORAGE.LIST_TASK,
			JSON.stringify(cloneListTask)
		);
		edit(taskUpdated);
	};
	const onSubmit = (values, form) => {
		if (formAction !== CONSTANTS_TASK.IS_EDIT_TASK) {
			alert('Tạo task thành công');
			form.reset();
			form.resetFieldState('taskTitle');
			form.resetFieldState('dueTime');
			const newTask = { id: uuidv4(), ...values };
			handleAddNewTask(newTask);
		} else {
			const taskUpdated = { id: task.id, ...values };
			handleEditTask(taskUpdated);
		}
	};

	const initialFormValues =
		formAction === CONSTANTS_TASK.IS_EDIT_TASK
			? {
					taskTitle: task.taskTitle,
					taskDescription: task.taskDescription,
					dueTime: task.dueTime,
					priority: task.priority,
			  }
			: {
					taskTitle: '',
					taskDescription: '',
					dueTime: dayjs().format('DD/MM/YYYY'),
					priority: listPriority.normal,
			  };

	const MyForm = ({ subscription }) => (
		<Form
			onSubmit={onSubmit}
			subscription={subscription}
			initialValues={initialFormValues}
			validate={(values) => {
				console.log('values', values);
				const errors = {};
				if (!values.taskTitle) {
					errors.taskTitle = 'Required';
				}
				if (IsBeforeNow(dayjs(values.dueTime))) {
					errors.dueTime = textError;
				}
				console.log('errors', errors);
				return errors;
			}}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={(event, form) => handleSubmit(event, form)}>
					<Field name='taskTitle'>
						{({ input, meta }) => (
							<div>
								<label>Title</label>
								<input
									{...input}
									type='text'
									placeholder='Add new task'
								/>
								{!meta.active && meta.error && meta.touched && (
									<span>{meta.error}</span>
								)}
							</div>
						)}
					</Field>
					<Field name='taskDescription'>
						{({ input, meta }) => (
							<div>
								<label>taskDescription</label>
								<textarea
									{...input}
									type='textarea'
									rows='10'
								/>
								{!meta.active && meta.error && meta.touched && (
									<span>{meta.error}</span>
								)}
							</div>
						)}
					</Field>
					<div className='row'>
						<div className='col-sm-6'>
							<Field name='dueTime'>
								{({ input, meta }) => {
									console.log(meta);
									return (
										<div>
											<label>due Time</label>
											<RenderDatePicker {...input} />
											{meta.error && meta.touched && (
												<span>{meta.error}</span>
											)}
										</div>
									);
								}}
							</Field>
						</div>
						<div className='col-sm-6'>
							<Field name='priority' component='select'>
								<option value={listPriority.low}>
									{' '}
									{listPriority.low}
								</option>
								<option value={listPriority.normal}>
									{listPriority.normal}
								</option>
								<option value={listPriority.high}>
									{listPriority.high}
								</option>
							</Field>
						</div>
					</div>
					<div className='buttons'>
						<button type='submit'>
							{formAction === CONSTANTS_TASK.IS_EDIT_TASK
								? 'Cập nhật'
								: 'Tạo mới'}
						</button>
					</div>
				</form>
			)}
		/>
	);

	return (
		<StyledComponent>
			<MyForm subscription={{ submitting: true, pristine: true }} />
		</StyledComponent>
	);
}

export default TaskSingleForm;
