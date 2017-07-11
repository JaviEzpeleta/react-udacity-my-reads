import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Loading from './utils/Loading'
import Shelves from './components/Shelves'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import MainPageTitle from './components/MainPageTitle'
import AddBookButton from './components/AddBookButton'

class BooksApp extends React.Component {

	shelfNames = ['currentlyReading', 'wantToRead', 'read']

	state = {
		booksByShelf: [],
		books: new Map()
	}

	updateBooks() {
		let booksByShelf = []
		this.showLoading()
		BooksAPI.getAll().then((results) => {

			let books = new Map();
			results.forEach(book => books.set(book.id, book));

			this.setState({books: books, isLoading: false})
				booksByShelf = this.shelfNames.map( (shelf) =>
				results.filter((book) => (book.shelf === shelf))
			)
			this.setState({
				books: books,
				booksByShelf: booksByShelf
			})

		})
	}

	componentDidMount() {
		this.updateBooks()
	}

	showLoading() {
		this.setState({ isLoading: true })
	}

	hideLoading() {
		this.setState({ isLoading: false })
	}

	changeSelectedBookshelf = (bookChanged) => {
		this.showLoading()
		BooksAPI.update(bookChanged.book, bookChanged.shelf).then(() => {
			this.updateBooks()
		})
	}

	render() {

		return (
			<div className="app">

				{this.state.isLoading && ( <Loading/> )}

				<Route path='/search' render={() => (

					<SearchBooks
						changeSelectedBookshelf={this.changeSelectedBookshelf}
						allBooksByShelf={this.state.booksByShelf}
						books={this.state.books} />

				)}/>

				<Route exact path='/' render={() => (

					<div className="list-books">

						<MainPageTitle />

						<Shelves
							changeSelectedBookshelf={this.changeSelectedBookshelf}
							booksByShelf={this.state.booksByShelf}
							shelfNames={this.shelfNames} />

						<AddBookButton />

					</div>

				)}/>

			</div>
		)
	}
}

export default BooksApp
