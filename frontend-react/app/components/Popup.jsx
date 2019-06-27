import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 'start',
            title: 'Welcome to Questionnaire',
            text: 'This is a application built using ReactJS. <br /><br /> It will dynamically get questions from backend server developed in flask & python. <br /><br /> Conversation history will be displayed at the end.',
            buttonText: 'Start the quiz'
        };

        this.popupHandle = this.popupHandle.bind(this);
    }

    popupHandle() {
        let { time } = this.state;

        if (time === 'start') {
            this.setState({
                time: 'end',
                title: 'Congratulations!',
                buttonText: 'Restart'
            });

            this.props.startQuiz();
        } else {
            location.reload(); // restart the application
        }
    }

    createMarkup(text) {
        return { __html: text };
    }


    render() {

        let { title, text, buttonText } = this.state;

        let { style, endQuiz, conversationHistory, response } = this.props;

        if (endQuiz) {
            text = 'You have completed the Questionnaire. <br /> Conversation History: <br /><br /> <strong>' + conversationHistory + '</strong>'
            response = 'Response: <strong>' + response + '</strong><br /><br /> '
        }
        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={endQuiz ? this.createMarkup(response) : this.createMarkup('')} />
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
