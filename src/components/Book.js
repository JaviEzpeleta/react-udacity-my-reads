import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger'
import * as Animated from "animated/lib/targets/react-dom";
import AnimatedWrapper from './../utils/AnimatedWrapper';

class Book extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animate: new Animated.Value(0)
		};
	}


	render() {

		if(!this.props.book) return null;

		const { authors, title, imageLinks, shelf } = this.props.book;
		const { book, changeSelectedBookshelf, allBooksByShelf } = this.props;

		let image = imageLinks ? imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';

		//fixing the book's thumbnail image URLs so it's all "htpps" and won't trigger the working when visiting the demo page on a HTTPS Firebase Hosting Service
		image.replace("http://", "https://");

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

}

const BookComponent = AnimatedWrapper(Book)

export default BookComponent

