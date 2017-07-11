import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {

	if(!props.book) return null;
	const { authors, title, imageLinks, shelf } = props.book;
	const { book, changeSelectedBookshelf, allBooksByShelf } = props;

	let image = imageLinks ? imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover"
						style={{backgroundImage: 'url('+image+')' }}></div>
						<BookShelfChanger
							book={book}
							shelf={shelf}
							changeSelectedBookshelf={changeSelectedBookshelf}
							allBooksByShelf={allBooksByShelf} />
					</div>
				<div className="book-title">{title}</div>
				<div className="book-authors">{authors}</div>
			</div>
		</li>
	)
}

export default Book