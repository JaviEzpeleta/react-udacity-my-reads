import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Loading from './utils/Loading'
import Shelves from './Shelves'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {

  shelfNames = ['currentlyReading', 'wantToRead', 'read']

  state = {
    booksByShelf: []
  }

  updateBooks() {
    let booksByShelf = []
    this.showLoading()
    BooksAPI.getAll().then((books) => {
      this.setState({books: books, isLoading: false})
      booksByShelf = this.shelfNames.map( (shelf) =>
        books.filter((book) => (book.shelf === shelf))
      )
      this.setState({ booksByShelf: booksByShelf})
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
            allBooksByShelf={this.state.booksByShelf} />

        )}/>

        <Route exact path='/' render={() => (

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <Shelves
              changeSelectedBookshelf={this.changeSelectedBookshelf}
              booksByShelf={this.state.booksByShelf}
              shelfNames={this.shelfNames} />

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>

        )}/>

      </div>
    )
  }
}

export default BooksApp
