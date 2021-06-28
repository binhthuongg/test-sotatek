import dayjs from 'dayjs';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import * as CONSTANTS_LOCAL_STORAGE from '../../constants/localStorage';
import RenderDatePicker from '../RenderDatePicker';
import { StyledComponent } from './styles';

function TaskSingleForm(props) {
	const textError = 'Thời gian không được trước ngày hôm nay';
	const listPriority = {
		low: 'low',
		normal: 'normal',
		high: 'high',
	};

	const IsBeforeNow = (dateString) => {
		if (dayjs(dateString).isBefore(dayjs(), 'day')) {
			return true;
		}
		return false;
	};

	const listTask = localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK)
		? JSON.parse(localStorage.getItem(CONSTANTS_LOCAL_STORAGE.LIST_TASK))
		: [];

	const onSubmit = (values, form) => {
		console.log('values', values);
		console.log('form', form);
		alert('Tạo task thành công');
		form.reset();
		form.resetFieldState('taskTitle');
		form.resetFieldState('dueTime');
		const newTask = { id: uuidv4(), ...values };
		listTask.push(newTask);
		localStorage.setItem(
			CONSTANTS_LOCAL_STORAGE.LIST_TASK,
			JSON.stringify(listTask)
		);
		console.log(listTask);
	};

	const initialFormValues = {
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
						<button type='submit'>Submit</button>
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
