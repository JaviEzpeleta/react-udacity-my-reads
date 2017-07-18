import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class AddBookButton extends Component {

	state = {
		redirectToSearch: false
	}

	resetSearchAndGoToSearch = () => {
		this.props.updateLastQuery('')
		this.setState({redirectToSearch: true})
	}

	render() {

	    const { redirectToSearch } = this.state

	    if (redirectToSearch) {
	    	console.log('redirecting one time')
	      return (
	        <Redirect to='/search'/>
	      )
	    }

		return (
			<div className="open-search">
				<div onClick={this.resetSearchAndGoToSearch}>
					Add a book
				</div>
			</div>
		)
	}

}

export default AddBookButton