import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import Book from './Book'
import Loading from './../utils/Loading'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.object.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
		allBooksByShelf: PropTypes.array.isRequired
	}

	state = {
		searchResults: [],
		query: ''
	}

	showLoading() {
		this.setState({ isLoading: true })
	}

	hideLoading() {
		this.setState({ isLoading: false })
	}

	searchBooks = (query) => {
		query = query.trim();
		const { books } = this.props;
		this.showLoading()
		this.setState({query: query})
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
			this.hideLoading()
		}
	}

	render() {

		const { changeSelectedBookshelf, allBooksByShelf } = this.props;
		const { isLoading, searchResults, query } = this.state;

		return (

			<div className="search-books">

	        {isLoading && ( <Loading/> )}

	        	<SearchBar searchBooks={this.searchBooks} />

				<div className="search-books-results">

					{ (searchResults.length > 0) && (
						<h2 className="bookshelf-title">
							{searchResults.length} Search Results for "{query}"
						</h2>
			        ) }

					{ ((searchResults.length === 0) && (query.length > 0) ) && (
						<h2 className="bookshelf-title">
							Sorry, there are no results for "{query}"
						</h2>
			        ) }

					<ol className="books-grid">
		              { (searchResults.length > 0) &&
			              	searchResults.map( (book) => (
			              		<Book key={book.id}
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