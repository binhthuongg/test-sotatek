import dayjs from 'dayjs';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router-dom';

function RenderDatePicker(props) {
	const isEdit = props.history.location.pathname === '/task/list';
	const { value, name, onChange } = props;
	const [startDate, setStartDate] = useState(
		isEdit ? dayjs(value).toDate() : new Date()
	);
	const handleChange = (date) => {
		onChange(dayjs(date).toDate());
		setStartDate(date);
	};
	return (
		<DatePicker
			placeholderText='Chọn ngày'
			dateFormat='dd/MM/yyyy'
			selected={startDate} // needs to be checked if it is valid date
			disabledKeyboardNavigation
			name={name}
			onChange={(date) => handleChange(date)}
		/>
	);
}

export default withRouter(RenderDatePicker);
