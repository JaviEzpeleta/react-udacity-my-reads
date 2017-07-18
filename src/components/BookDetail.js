import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import BookDetailBar from './BookDetailBar'
import Loading from './../utils/Loading'
import Moment from 'react-moment';

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
		image = image.replace("http://", "https://");

		return (
			<div>
				{isLoading && ( <Loading/> )}

				{(this.state.book) && (
					<div>
			        	<BookDetailBar title={this.state.book.title} />
			        	<div className="book-detail-body">
							<div className="book-detail-cover" style={{backgroundImage: 'url('+image+')' }} />
				        	<div className="book-detail-subbody">
								<div className="book-detail-label"> Title: </div>
					        	<div className="book-detail-title">
					        		{book.title}
				        		</div>
				        		<div className="book-detail-authors">
									{ book.authors && (
										<div className="book-detail-label"> Authors: </div>
									) }
									{ book.authors && book.authors.map( (author, index) => (
										<div key={index}>
											{author}
										</div>
										)
									) }
				        		</div>
								<div className="book-detail-label"> Publisher: </div>
					        	<div className="book-detail-publisher">
					        		{book.publisher}
				        		</div>
				        		<div className="book-detail-categories">
									{ book.authors && (
										<div className="book-detail-label"> Categories: </div>
									) }
									{ book.categories && book.categories.map( (category, index) => (
										<div key={index}>
											{category}
										</div>
										)
									) }
				        		</div>

								<div className="book-detail-label"> Date published: </div>
					        	<div className="book-detail-publisher">
					        		<Moment format="YYYY, MMM Do">{book.publishedDate}</Moment>
				        		</div>

				        	</div>
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