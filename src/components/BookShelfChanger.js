import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

	static propTypes = {
		shelf: PropTypes.string.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
	    book: PropTypes.object.isRequired,
	    allBooksByShelf: PropTypes.array.isRequired
	}

	render () {

		const { shelf, changeSelectedBookshelf, allBooksByShelf, book } = this.props
		const state = {value: shelf}

		return (
	        <div className="book-shelf-changer">
	          <select value={state.value}
				onChange={ (event) => { changeSelectedBookshelf({book: book, shelf: event.target.value})} }>>
	            <option value="none" disabled>Move to...</option>
	            <option value="currentlyReading">Currently Reading ({allBooksByShelf[0].length})</option>
	            <option value="wantToRead">Want to Read ({allBooksByShelf[1].length})</option>
	            <option value="read">Read ({allBooksByShelf[2].length})</option>
	            <option value="none">None</option>
	          </select>
	        </div>
		)
	}

}

export default BookShelfChanger