import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import AnimatedWrapper from './../utils/AnimatedWrapper';

const BookDetailBar = (props) => {

	return (
		<div className="book-detail-bar">
			{ (props.history.length > 2) && (
				<div className="close-search" onClick={props.history.goBack}>Close</div>
			) }
			{ (props.history.length <= 2) && (
				<Link className="close-search" to="/">Close</Link>
			) }
			<div className="search-books-input-wrapper">
				<input type="text" disabled
					placeholder={'📖 '+props.title}
				/>
			</div>
		</div>
	)

}

const BookDetailBarComponent = AnimatedWrapper(BookDetailBar, '5')


export default withRouter(BookDetailBarComponent)
