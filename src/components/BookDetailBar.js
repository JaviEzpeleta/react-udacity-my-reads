import React from 'react'
import { withRouter } from 'react-router-dom'
import AnimatedWrapper from './../utils/AnimatedWrapper';

const BookDetailBar = (props) => {

	console.log(props.history);

	return (
		<div className="book-detail-bar">
			<div className="close-search" onClick={props.history.goBack}>Close</div>
			<div className="search-books-input-wrapper">
				<input type="text" disabled
					placeholder={props.title}
				/>
			</div>
		</div>
	)

}

const BookDetailBarComponent = AnimatedWrapper(BookDetailBar)



export default withRouter(BookDetailBarComponent)
