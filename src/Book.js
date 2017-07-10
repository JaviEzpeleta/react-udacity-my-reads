import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
	render() {

		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{backgroundImage: 'url(' + this.props.book.imageLinks.thumbnail + ')' }}></div>
							<BookShelfChanger
								book={this.props.book}
								shelf={this.props.book.shelf}
								changeSelectedBookshelf={this.props.changeSelectedBookshelf}/>
						</div>
					<div className="book-title">{this.props.book.title}</div>
					<div className="book-authors">{this.props.book.author}</div>
				</div>
			</li>
		)
	}
}

export default Book