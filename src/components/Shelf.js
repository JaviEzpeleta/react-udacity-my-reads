import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component {

	static propTypes = {
		type: PropTypes.string.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
		allBooksByShelf: PropTypes.array.isRequired
	}

	bookshelfTitle = this.props.type
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ return str.toUpperCase(); })

	render() {

		const { books, changeSelectedBookshelf, allBooksByShelf } = this.props;

		return (
			<div className="bookshelf">
				{ (books.length > 0) && (
					<span>
						<h2 className="bookshelf-title">
							{this.bookshelfTitle}
							{ (books.length > 1) && (
							<span> ({books.length} books) </span> ) }
							{ (books.length === 1) && (
							<span> ({books.length} book) </span> ) }
						</h2>

						<ol className="books-grid">
							{ books && books.map( (book) => (
								<Book
									key={book.id}
									book={book}
									changeSelectedBookshelf={changeSelectedBookshelf}
									allBooksByShelf={allBooksByShelf} />
							)) }
						</ol>
					</span>
				)}
	        </div>
		)
	}
}

export default Shelf