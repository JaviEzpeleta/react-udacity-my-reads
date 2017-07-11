import React, {Component} from 'react'
import Shelf from './Shelf'

class Shelves extends Component {

	render() {

		return (
			<div className="list-books-content">
				{ (this.props.booksByShelf.length > 0) && (
					this.props.booksByShelf.map( (shelf, index) => (
						<Shelf
							key={index}
							type={this.props.shelfNames[index]}
							books={this.props.booksByShelf[index]}
							changeSelectedBookshelf={this.props.changeSelectedBookshelf}
							allBooksByShelf={this.props.booksByShelf} />
					) )
				)}
			</div>
		)
	}
}

export default Shelves