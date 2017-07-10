import React, {Component} from 'react'
import Book from './Book'

class Shelf extends Component {

	bookshelfTitle = this.props.type
							.replace(/([A-Z])/g, ' $1')
							.replace(/^./, function(str){ return str.toUpperCase(); })


	render() {

		return (
			<div className="bookshelf">
              <h2 className="bookshelf-title">{this.bookshelfTitle}</h2>
              <ol className="books-grid">
	              { this.props.books &&
		              	this.props.books.filter((book) => (book.shelf === this.props.type)).map( (book) => (
			              	<Book key={book.id} book={book} changeSelectedBookshelf={this.props.changeSelectedBookshelf} />
			              )
		              	)
	              }
              </ol>
            </div>
		)
	}
}

export default Shelf