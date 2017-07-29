import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component {

	static propTypes = {
		type: PropTypes.string.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
		books: PropTypes.array.isRequired
	}

	bookshelfTitle = this.props.type
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ return str.toUpperCase(); })

	render() {

		const { books, changeSelectedBookshelf, type } = this.props;

		let numberOfBooks = books.filter( (book) => (book.shelf === type)).length;

		return (
			<div className="bookshelf">
				{ (books.length > 0) && (
					<span>
						<h2 className="bookshelf-title">
							{this.bookshelfTitle}
							{ (numberOfBooks > 1) && (
							<span> ({numberOfBooks} books) </span> ) }
							{ (numberOfBooks === 1) && (
							<span> ({numberOfBooks} book) </span> ) }
						</h2>

						<ol className="books-grid">

							{ books && books.filter((book) => (book.shelf === type)).map( (book) => (
								<li key={book.id}>
									<Book
										book={book}
										changeSelectedBookshelf={changeSelectedBookshelf}
										books={books} />
								</li>
							)) }
						</ol>
					</span>
				)}
	        </div>
		)
	}
}

export default Shelf