import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Loading from './utils/Loading'
import Shelves from './components/Shelves'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import MainPageTitle from './components/MainPageTitle'
import NotFound from './components/NotFound'
import BookDetail from './components/BookDetail'
import NewSearch from './components/NewSearch'

class BooksApp extends React.Component {

	shelfNames = ['currentlyReading', 'wantToRead', 'read']

	state = {
		books: [],
		lastQuery: (localStorage.lastQuery) ? localStorage.lastQuery : ''
	}

	constructor(props) {
		super(props)
		this.updateLastQuery = this.updateLastQuery.bind(this)
	}

	updateLastQuery = (lastQuery) => {
		this.setState({lastQuery: lastQuery})
		localStorage.lastQuery = lastQuery
	}

	updateBooks() {
		this.showLoading()
		BooksAPI.getAll().then((books) => {
			this.setState({books: books, isLoading: false})
		})
	}

	componentDidMount() {
		this.updateBooks()
	}

	changeSelectedBookshelf = (bookChanged) => {
		this.showLoading()
		BooksAPI.update(bookChanged.book, bookChanged.shelf).then(() => {
			let myBookIds = this.state.books.map( (book) => (book.id) )
			if (myBookIds.includes(bookChanged.book.id)) {
				let books = this.state.books.map(bookStored => {
					if (bookChanged.book.id === bookStored.id) {
						bookStored.shelf = bookChanged.shelf
					}
					return bookStored
				})
				this.setState({books});
			} else {
				let newBook = bookChanged.book
				newBook.shelf = bookChanged.shelf
				this.setState({books: this.state.books.concat(newBook)});
			}
			this.hideLoading()
		})
	}

	render() {

		const { updateLastQuery, changeSelectedBookshelf, shelfNames } = this
		const { books, lastQuery, isLoading } = this.state

		return (
			<div className="app">

				{isLoading && ( <Loading/> )}

				<Switch>

					<Route exact path='/search' render={() => (
						<SearchBooks
							updateLastQuery={updateLastQuery.bind(this)}
							changeSelectedBookshelf={changeSelectedBookshelf}
							shelfNames={shelfNames}
							lastQuery={lastQuery}
							books={books} />
					)}/>

					<Route path='/search/:query' render={({ match }) => (
						<SearchBooks
							updateLastQuery={updateLastQuery.bind(this)}
							changeSelectedBookshelf={changeSelectedBookshelf}
							shelfNames={shelfNames}
							books={books}
							lastQuery={lastQuery}
							urlQuery={match.params.query} />
					)}/>

					<Route exact path='/book/:bookId' render={({match}) => (
						<BookDetail bookId={match.params.bookId}
							books={books}
							shelfNames={shelfNames}
							changeSelectedBookshelf={changeSelectedBookshelf} />
					)}/>

					<Route exact path='/' render={() => (

						<div className="list-books">

							<MainPageTitle />

							<Shelves
								changeSelectedBookshelf={changeSelectedBookshelf}
								shelfNames={shelfNames}
								books={books} />

							<div className="open-search">
								<Link to='/newSearch'>
									Add a book
								</Link>
							</div>

						</div>

					)}/>

					<Route exact path='/newSearch' render={() => (
						<NewSearch updateLastQuery={updateLastQuery.bind(this)} />
					)} />

					<Route path="*" component={NotFound} />

					// unused, but it's another option: any other URL may redirect to the home screen and that's OK
					<Redirect from='*' to='/'/>

				</Switch>

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

export default BooksApp
