import dayjs from 'dayjs';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RenderDatePicker(props) {
	console.log('props', props);
	console.log('props222');
	const [startDate, setStartDate] = useState(new Date());
	const { value, name, input, onChange, isErrorDate } = props;
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
		onChange(date);
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

export default RenderDatePicker;
