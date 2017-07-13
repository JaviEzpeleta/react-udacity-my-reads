import React, {Component} from 'react'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class Shelves extends Component {

	static propTypes = {
		shelfNames: PropTypes.array.isRequired,
		books: PropTypes.array.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired
	}

	render() {

		const { shelfNames, books, changeSelectedBookshelf } = this.props

		return (
			<div className="list-books-content">
				{ (books) && (
					shelfNames.map( (shelf, index) => (
						<Shelf
							key={index}
							type={shelf}
							changeSelectedBookshelf={changeSelectedBookshelf}
							books={books} />
						)
					)
				)}
			</div>
		)
	}
}

export default Shelves