import React, {Component} from 'react'
import ReactLoading from 'react-loading';


class Loading extends Component {
	render() {
		return (
			<div className="loading-wrapper">
				<div className="loading-loader">
					<ReactLoading type="bars" color="#444"/>
				</div>
			</div>
		)
	}
}

export default Loading