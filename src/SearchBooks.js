import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import Loading from './utils/Loading'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.object.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
		allBooksByShelf: PropTypes.array.isRequired
	}

	state = { searchResults: []}

	showLoading() {
		this.setState({ isLoading: true })
	}

	hideLoading() {
		this.setState({ isLoading: false })
	}

	searchBooks = (query) => {

		const { books } = this.props;

		this.showLoading()
		let searchResults = []
		if (query.length) {
			BooksAPI.search(query, 20).then(results => {
				if (results.length > 0) {
					searchResults = results.map(result => {
						return books.has(result.id) ? books.get(result.id) : result;
					})
				}
				this.setState({
					searchResults: searchResults,
				})
				this.hideLoading()
			})
		} else {
			this.setState({searchResults: []})
		}
	}

	render() {

		const { changeSelectedBookshelf, allBooksByShelf } = this.props;

		return (

			<div className="search-books">

	        {this.state.isLoading && ( <Loading/> )}

				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author"
							onChange={(event) => this.searchBooks(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
		              { (this.state.searchResults.length > 0) &&
			              	this.state.searchResults.map( (book) => (
			              		<Book id={book.id}
			              			book={book}
			              			changeSelectedBookshelf={changeSelectedBookshelf}
			              			allBooksByShelf={allBooksByShelf} />
				              )
			              	)
		              }
					</ol>
				</div>
			</div>
		)
	}
}

export default SearchBooks