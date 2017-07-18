import React, {Component} from 'react'
import { Link } from 'react-router-dom'

class AddBookButton extends Component {

	state = {
		redirectToSearch: false
	}

	resetSearchAndGoToSearch = () => {
		this.props.updateLastQuery('')
		this.setState({redirectToSearch: true})
	}

	render() {
		return (
			<div className="open-search">
				<Link to='/newSearch'>
					Add a book
				</Link>
			</div>
		)
	}

}

export default AddBookButton