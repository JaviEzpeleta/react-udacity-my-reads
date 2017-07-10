import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'


class SearchBooks extends Component {

	state = { searchResults: []}

	searchBooks = (query) => {
		if (query.length) {
			this.setState({ isLoading: true })
			BooksAPI.search(query).then(results => {
				let searchResults = results.map(result => {
					return this.props.books.has(result.id) ? this.props.books.get(result.id) : result;
				})
				this.setState({
					searchResults: searchResults,
					isLoading: false
				})
			})
		} else {
			this.setState({searchResults: []})
		}
	}

	render() {
		return (
			<div className="search-books">
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