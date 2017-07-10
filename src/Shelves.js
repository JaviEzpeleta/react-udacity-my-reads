import React, {Component} from 'react'
import Shelf from './Shelf'

class Shelves extends Component {
	render() {
		return (
			<div className="list-books-content">
				<Shelf type="currentlyReading" books={this.props.books} changeSelectedBookshelf={this.props.changeSelectedBookshelf}/>
				<Shelf type="wantToRead" books={this.props.books} changeSelectedBookshelf={this.props.changeSelectedBookshelf}/>
				<Shelf type="read" books={this.props.books} changeSelectedBookshelf={this.props.changeSelectedBookshelf}/>
			</div>
		)
	}
}

export default Shelves