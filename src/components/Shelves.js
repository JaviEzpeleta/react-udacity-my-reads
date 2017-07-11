import React, {Component} from 'react'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class Shelves extends Component {

	static propTypes = {
		shelfNames: PropTypes.array.isRequired,
		booksByShelf: PropTypes.array.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired
	}

	render() {

		const { shelfNames, booksByShelf, changeSelectedBookshelf } = this.props
		return (
			<div className="list-books-content">
				{ (booksByShelf.length > 0) && (
					booksByShelf.map( (shelf, index) => (
						<Shelf
							key={index}
							type={shelfNames[index]}
							books={booksByShelf[index]}
							changeSelectedBookshelf={changeSelectedBookshelf}
							allBooksByShelf={booksByShelf} />
					) )
				)}
			</div>
		)
	}
}

export default Shelves