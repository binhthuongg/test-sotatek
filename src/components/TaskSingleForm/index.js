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
	const textError = '*Thời gian không được trước ngày hôm nay !';
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
			form.reset();
			form.resetFieldState('taskTitle');
			form.resetFieldState('dueDate');
			const newTask = { id: uuidv4(), ...values };
			handleAddNewTask(newTask);
			alert('Tạo task thành công !');
		} else {
			const taskUpdated = { id: task.id, ...values };
			handleEditTask(taskUpdated);
			alert('Cập nhật task thành công !');
		}
	};

	const initialFormValues =
		formAction === CONSTANTS_TASK.IS_EDIT_TASK
			? {
					taskTitle: task.taskTitle,
					taskDescription: task.taskDescription,
					dueDate: task.dueDate,
					priority: task.priority,
			  }
			: {
					taskTitle: '',
					taskDescription: '',
					dueDate: dayjs().toDate(),
					priority: listPriority.normal,
			  };

	const MyForm = ({ subscription }) => (
		<Form
			onSubmit={onSubmit}
			subscription={subscription}
			initialValues={initialFormValues}
			validate={(values) => {
				const errors = {};
				if (!values.taskTitle) {
					errors.taskTitle = '*Required !';
				}
				if (IsBeforeNow(dayjs(values.dueDate))) {
					errors.dueDate = textError;
				}
				return errors;
			}}
			render={({ handleSubmit, form, submitting, pristine, values }) => (
				<form onSubmit={(event, form) => handleSubmit(event, form)}>
					<Field name='taskTitle'>
						{({ input, meta }) => (
							<div className='formElement'>
								<input
									{...input}
									type='text'
									placeholder='Add new task'
								/>
								{!meta.active && meta.error && meta.touched && (
									<div className='errorText'>
										{meta.error}
									</div>
								)}
							</div>
						)}
					</Field>
					<Field name='taskDescription'>
						{({ input, meta }) => (
							<div className='formElement'>
								<label>Description</label>
								<textarea
									{...input}
									type='textarea'
									rows='10'
								/>
								{!meta.active && meta.error && meta.touched && (
									<div className='errorText'>
										{meta.error}
									</div>
								)}
							</div>
						)}
					</Field>
					<div className='formGroup'>
						<Field name='dueDate'>
							{({ input, meta }) => {
								return (
									<div className='formElement'>
										<label>Due Date</label>
										<RenderDatePicker {...input} />
										{/* no need touched, active */}
										{meta.error && (
											<div className='errorText'>
												{meta.error}
											</div>
										)}
									</div>
								);
							}}
						</Field>
						<Field name='priority'>
							{({ input, meta }) => {
								return (
									<div className='formElement'>
										<label>Priority</label>
										<select {...input}>
											<option value={listPriority.low}>
												{listPriority.low}
											</option>
											<option value={listPriority.normal}>
												{listPriority.normal}
											</option>
											<option value={listPriority.high}>
												{listPriority.high}
											</option>
										</select>
									</div>
								);
							}}
						</Field>
					</div>
					<div className='buttons'>
						<button type='submit' className='block btn-green'>
							{formAction === CONSTANTS_TASK.IS_EDIT_TASK
								? 'Update'
								: 'Add'}
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
