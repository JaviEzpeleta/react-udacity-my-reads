import React from 'react'
import AnimatedWrapper from './../utils/AnimatedWrapper';

const AnimatedBookCover = (props) => {
	return (
		<div className="book-detail-cover" style={{backgroundImage: 'url('+props.image+')' }} />
	)

}

const AnimatedBookCoverComponent = AnimatedWrapper(AnimatedBookCover, '120')

export default AnimatedBookCoverComponent
