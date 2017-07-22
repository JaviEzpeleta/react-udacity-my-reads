import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedWrapper from './../utils/AnimatedWrapper';

const SearchBar = (props) => {
	return (
		<div className="search-books-bar">
			<Link className="close-search" to="/">Close</Link>
			<div className="search-books-input-wrapper">
				<input type="text"
					placeholder={(props.lastQuery !== '') ? props.lastQuery : '🔎 Search by title or author'}
					onChange={(event) => props.searchBooks(event.target.value)}
				/>
			</div>
		</div>
	)

}

const SearchBarComponent = AnimatedWrapper(SearchBar, '22')

export default SearchBarComponent
