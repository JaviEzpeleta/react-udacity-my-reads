import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import BookDetailBar from './BookDetailBar'
//get = (bookId)


class BookDetail extends Component {

	componentDidMount() {
		if (this.props.bookId !== '') {
			this.getBook()
		}
	}

	state = { book: false }

	getBook() {
		BooksAPI.get(this.props.bookId).then(book => {
			this.setState({book})
		})
	}

	render() {

		const { book } = this.state;
		const { imageLinks } = book;
		let image = imageLinks ? imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';


		return (
			<div>
				{(this.state.book) && (
					<div>
			        	<BookDetailBar title={this.state.book.title} />
			        	<div className="book-detail-body">
							<div className="book-cover" style={{backgroundImage: 'url('+image+')' }} />
			        	</div>
			        </div>
				)}
			</div>
		)
	}
}



export default BookDetail