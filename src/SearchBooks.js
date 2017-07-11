import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import Loading from './utils/Loading'


class SearchBooks extends Component {

	state = { searchResults: []}

	showLoading() {
		this.setState({ isLoading: true })
	}

	hideLoading() {
		this.setState({ isLoading: false })
	}


	searchBooks = (query) => {
		this.showLoading()
		let searchResults = []
		if (query.length) {

			BooksAPI.search(query).then(results => {
				if (results.length > 0) {
					searchResults = results.map(result => {
						return this.props.books.has(result.id) ? this.props.books.get(result.id) : result;
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
			              	this.state.searchResults.map( (book, index) => (
			              		<Book id={book.id+book.index}
			              			book={book}
			              			changeSelectedBookshelf={this.props.changeSelectedBookshelf}
			              			allBooksByShelf={this.props.allBooksByShelf} />
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