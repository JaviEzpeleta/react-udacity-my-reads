import React from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div className="notfound-wrapper">
			<div className="notFoundImage"/>
			<Link to="/"><button>Home</button></Link>
		</div>
	)
}

export default NotFound;