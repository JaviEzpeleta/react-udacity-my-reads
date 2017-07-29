import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import BookDetailBar from './BookDetailBar'
import Loading from './../utils/Loading'
import Moment from 'react-moment';
import AnimatedBookCover from './AnimatedBookCover'

class BookDetail extends Component {

	componentWillReceiveProps() {
		this.showLoading()
		if (this.props.bookId !== '') {
			this.getBook()
		}
	}

	componentDidMount() {
		this.showLoading()
		if (this.props.bookId !== '') {
			this.getBook()
		}
	}

	state = { book: false, currentShelf: 'none' }

	getBook() {
		BooksAPI.get(this.props.bookId).then(book => {
			this.setState({book})
			this.hideLoading()

			let myBookIds = this.props.books.map( (book) => (book.id) )

			if (myBookIds.includes(book.id)) {
				let currentShelf = this.props.books.find((bookItem) => (bookItem.id === book.id)).shelf
				this.setState({currentShelf: currentShelf})
			}

		})
	}

	render() {

		const { book, isLoading, currentShelf } = this.state
		const { imageLinks } = book
		const { shelfNames, changeSelectedBookshelf } = this.props

		let image = imageLinks ? imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
		image = image.replace("http://", "https://")

		let bookShelfTitles = shelfNames.map( (shelf) =>
			{ return shelf.replace(/([A-Z])/g, ' $1')
					.replace(/^./, function(str){ return str.toUpperCase(); })
			}
		)

		return (
			<div>
				{isLoading && ( <Loading/> )}

				{(book) && (
					<div>
			        	<BookDetailBar title={book.title} />
			        	<div className="book-detail-body">
							<div className="book-detail-left-area">
								<AnimatedBookCover image={image} />
								<form>
									{ shelfNames.map( (shelf, index) => (
										<label key={index}>
											<input type="radio" name="shelf" value={shelf}
												onChange={ (event) => { changeSelectedBookshelf({book: book, shelf: event.target.value})} }
												checked={currentShelf === shelf}
											 /> {bookShelfTitles[index]}
										</label>
									) )}
									<label>
										<input type="radio" name="shelf" value="none"
										onChange={ (event) => { changeSelectedBookshelf({book: book, shelf: event.target.value})} }
										checked={currentShelf === 'none'} /> None
									</label>
								</form>
							</div>
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
