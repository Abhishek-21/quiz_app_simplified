import React, { Component } from 'react';

// this component is for the header section of the admin panel

class Header extends Component {
    render() {
        return (
            <div id="header-container">
                <ul>
                    <li id="quiz-category">Quiz Categories</li>
                    <li id="quiz-topic">Quiz Topics</li>
                    <li id="question-set">Questions Set</li>
                </ul>
            </div>
        );
    }
}

export default Header