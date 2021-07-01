import React from 'react';
import { Link } from 'react-router-dom';
import { StyledComponent } from './styles';

function Home(props) {
	return (
		<StyledComponent>
			<Link to='task/add'>
				<button>New Task</button>
			</Link>
			<Link to='task/list'>
				<button className='btn-green'>To do List</button>
			</Link>
		</StyledComponent>
	);
}

export default Home;
