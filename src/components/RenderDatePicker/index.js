import dayjs from 'dayjs';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router-dom';

function RenderDatePicker(props) {
	console.log('props', props);
	console.log('props222');
	const isEdit = props.history.location.pathname === '/task/list';
	const { value, name, input, onChange, isErrorDate } = props;
	const [startDate, setStartDate] = useState(
		isEdit ? dayjs(value).toDate() : new Date()
		// isEdit ? new Date() : new Date()
	);
	console.log('value', value);
	console.log('startDate', startDate);
	console.log('dayjs(value).format', dayjs(value).toDate());
	const IsBeforeNow = (dateString) => {
		if (dayjs(dateString).isBefore(dayjs(), 'day')) {
			return true;
		}
		return false;
	};
	const handleChange = (date) => {
		console.log('date', date);
		console.log('abc', IsBeforeNow(date));
		// const date
		// if (IsBeforeNow(date)) {
		// 	isErrorDate(true);
		// 	return;
		// } else {
		// 	isErrorDate(false);
		// 	onChange(date);
		// 	setStartDate(date);
		// }
		onChange(dayjs(date).toDate());
		setStartDate(date);
	};
	return (
		<DatePicker
			placeholderText='Chọn ngày'
			// dateFormat='yyyy/MM/dd'
			// dateFormat='dd/MM/yyyy'
			dateFormat='dd/MM/yyyy'
			selected={startDate} // needs to be checked if it is valid date
			disabledKeyboardNavigation
			name={name}
			onChange={(date) => handleChange(date)}
		/>
	);
}

export default withRouter(RenderDatePicker);
