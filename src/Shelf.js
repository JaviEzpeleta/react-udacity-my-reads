import React, {Component} from 'react'
import Book from './Book'

class Shelf extends Component {

	bookshelfTitle = this.props.type
		.replace(/([A-Z])/g, ' $1')
		.replace(/^./, function(str){ return str.toUpperCase(); })

	render() {

		return (
			<div className="bookshelf">
				{ (this.props.books.length > 0) && (
					<span>
		              <h2 className="bookshelf-title">{this.bookshelfTitle}</h2>
		              <ol className="books-grid">
			              { this.props.books &&
				              	this.props.books.map( (book) => (
					              	<Book
					              		key={book.id}
					              		book={book}
					              		changeSelectedBookshelf={this.props.changeSelectedBookshelf}
					              		allBooksByShelf={this.props.allBooksByShelf} />
					              )
				              	)
			              }
		              </ol>
		            </span>
				)}
	        </div>
		)
	}
}

export default Shelf