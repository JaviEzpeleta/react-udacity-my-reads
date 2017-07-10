import React, {Component} from 'react'
// import PropTypes from 'prop-types'

class BookShelfChanger extends Component {

	/*
	static propTypes = {
		value: PropTypes.string.isRequired,
		changeSelectedBookshelf: PropTypes.func.isRequired
	}
	*/

	constructor(props) {
		super(props)
		this.state = {value: this.props.shelf}
	}

	render() {
		return (
            <div className="book-shelf-changer">
              <select value={this.state.value}
				onChange={ (event) => { this.props.changeSelectedBookshelf({book: this.props.book, shelf: event.target.value})} }>>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
		)
	}
}

export default BookShelfChanger