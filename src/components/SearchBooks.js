import React, {Component} from 'react'
import * as BooksAPI from './../BooksAPI'
import Book from './Book'
import Loading from './../utils/Loading'
import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

class SearchBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired,
	}

	state = {
		searchResults: [],
		query: ''
	}

	searchBooks = (query) => {
		if (!query) return
		query = query.trim();
		const { books } = this.props;
		this.showLoading()
		this.setState({query: query})
		let searchResults = []
		let myBookIds = books.map( (book) => (book.id) );
		if (query.length) {
			BooksAPI.search = BooksAPI.search.bind(this);
			BooksAPI.search(query, 20).then(results => {
				if (results.length > 0) {
					searchResults = results.map(result => {
						return myBookIds.includes(result.id) ? books.find((book) => (book.id === result.id)) : result;
					})
				}
				if (query === this.state.query) {
					// only if the return for this query is the last promise being executed,
					// then we update the search results in the state
					this.setState({
						searchResults: searchResults,
					})
					this.props.updateLastQuery(this.state.query)
				}
				this.hideLoading()
			})
		} else {
			this.setState({searchResults: []})
			this.props.updateLastQuery(this.state.query)
			this.hideLoading()
		}
	}

	componentDidMount() {
		if (this.props.urlQuery) {
			this.searchBooks(this.props.urlQuery)
		} else {
			if (this.props.resetSearch) {
				this.props.updateLastQuery('')
			} else {
				this.searchBooks(this.props.lastQuery)
			}
		}
	}

	render() {

		const { changeSelectedBookshelf, books, urlQuery, updateLastQuery } = this.props;
		const { isLoading, searchResults, query } = this.state;

		return (

			<div className="search-books">

	        	{isLoading && ( <Loading/> )}

	        	<SearchBar searchBooks={this.searchBooks} urlQuery={urlQuery} updateLastQuery={updateLastQuery} />

				<div className="search-books-results">

					{ (searchResults.length > 0) && !isLoading && (
						<h2 className="bookshelf-title">
							{searchResults.length} Search Results for "{query}"
						</h2>
			        ) }

					{ isLoading && (
						<h2 className="bookshelf-title">
							Searching...
						</h2>
			        ) }

					{ ((searchResults.length === 0) && (query.length > 0) && !isLoading ) && (
						<h2 className="bookshelf-title">
							Sorry, there are no results for "{query}"
						</h2>
			        ) }

					<ol className="books-grid">
						{ (searchResults.length > 0) && searchResults.map( (book, index) => (
							<Book key={book.id + index}
								book={book}
								changeSelectedBookshelf={changeSelectedBookshelf}
								books={books} />
						))}
					</ol>
				</div>
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

export default SearchBooks