import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'

class NewSearch extends Component {

	state = {
		redirectToSearch: false
	}

	componentDidMount() {
		this.props.updateLastQuery('')
		this.setState({redirectToSearch: true})
	}

	render() {

	    const { redirectToSearch } = this.state

	    if (redirectToSearch) {
			return (
				<Redirect to='/search'/>
			)
		}

		return false

	}

}

export default NewSearch
