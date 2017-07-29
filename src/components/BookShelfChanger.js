import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

	static propTypes = {
		shelf: PropTypes.string.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
	    book: PropTypes.object.isRequired,
	    books: PropTypes.array.isRequired
	}

	render () {

		const { shelf, changeSelectedBookshelf, books, book } = this.props

		return (
			<div className="book-shelf-changer">
				<select value={shelf}
					onChange={ (event) => { changeSelectedBookshelf({book: book, shelf: event.target.value})} }>
					<option value="none" disabled>
						Move to...
					</option>
					<option value="currentlyReading">
						Currently Reading ({books.filter( (book) => (book.shelf === "currentlyReading")).length})
					</option>
					<option value="wantToRead">
						Want to Read ({books.filter( (book) => (book.shelf === "wantToRead")).length})
					</option>
					<option value="read">
						Read ({books.filter( (book) => (book.shelf === "read")).length})
					</option>
					<option value="none">
						None
					</option>
				</select>
			</div>
		)
	}

}

export default BookShelfChanger