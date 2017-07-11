import React from 'react'
import AnimatedWrapper from './../utils/AnimatedWrapper';

const MainPageTitle = (props) => {
	return (
        <div className="list-books-title">
          <h1>My Reads
	          <br />
	          <span>Udacity React Nanodegree · Project #1 · Javier Ezpeleta · July 2017</span>
          </h1>
        </div>
	)

}

const MainPageTitleComponent = AnimatedWrapper(MainPageTitle)

export default MainPageTitleComponent
