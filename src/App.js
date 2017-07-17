import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Loading from './utils/Loading'
import Shelves from './components/Shelves'
import { Route, Redirect, Switch } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import MainPageTitle from './components/MainPageTitle'
import AddBookButton from './components/AddBookButton'
import NotFound from './components/NotFound'

class BooksApp extends React.Component {

	shelfNames = ['currentlyReading', 'wantToRead', 'read']

	state = {
		books: []
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
			let books = this.state.books.map(bookStored => {
				if (bookChanged.book.id === bookStored.id) {
					bookStored.shelf = bookChanged.shelf
				}
				return bookStored
			})
			this.setState(books);
			this.hideLoading()
		})
	}

	render() {

		return (
			<div className="app">

				{this.state.isLoading && ( <Loading/> )}

				<Switch>

					<Route exact path='/search' render={() => (
						<SearchBooks
							changeSelectedBookshelf={this.changeSelectedBookshelf}
							shelfNames={this.shelfNames}
							books={this.state.books}/>
					)}/>

					<Route path='/search/:query' render={({ match }) => (
						<SearchBooks
							changeSelectedBookshelf={this.changeSelectedBookshelf}
							shelfNames={this.shelfNames}
							books={this.state.books}
							urlQuery={match.params.query}/>
					)}/>

					<Route exact path='/' render={() => (

						<div className="list-books">

							<MainPageTitle />

							<Shelves
								changeSelectedBookshelf={this.changeSelectedBookshelf}
								shelfNames={this.shelfNames}
								books={this.state.books} />

							<AddBookButton />

						</div>

					)}/>


					<Route path="*" component={NotFound} />

					// unused, but it's another option: any other URL may redirect to the home screen and that's OK
					<Redirect from='*' to='/' />

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
