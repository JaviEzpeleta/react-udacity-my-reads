import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import BookDetailBar from './BookDetailBar'
import Loading from './../utils/Loading'

class BookDetail extends Component {

	componentDidMount() {
		this.showLoading()
		if (this.props.bookId !== '') {
			this.getBook()
		}
	}

	state = { book: false }

	getBook() {
		BooksAPI.get(this.props.bookId).then(book => {
			this.setState({book})
			this.hideLoading()
		})
	}

	render() {

		const { book, isLoading } = this.state;
		const { imageLinks } = book;
		let image = imageLinks ? imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';


		return (
			<div>
				{isLoading && ( <Loading/> )}

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

	showLoading() {
		this.setState({ isLoading: true })
	}

	hideLoading() {
		this.setState({ isLoading: false })
	}

}



export default BookDetail