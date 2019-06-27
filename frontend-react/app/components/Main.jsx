import React from 'react';
import Answers from 'Answers';
import Popup from 'Popup';
import Footer from 'Footer';
import toastr from 'toastr';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startingQuiz: true,
            endQuiz: false,
            showButton: false,
            questionAnswered: false,
            displayPopup: 'flex',
            type: '',
            response: '',
            conversationHistory: '',
            answers: {}
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleUserAnswer = this.handleUserAnswer.bind(this);
    }


    getData() {
        fetch("/question/1")
            .then(res => res.json())
            .then(
                (result) => {
                    debugger;
                    this.setState({
                        id: result.id,
                        type: result.type,
                        response: result.response,
                        answers: result.answers,
                        startingQuiz: false
                    });
                },
                (err) => {
                    console.log(err);
                    debugger;
                    toastr.error("error encounterd receivng question: " + err);
                }
            )
    }

    nextQuestion() {
        debugger;
        fetch('/question', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.id,
                "answer": this.state.userAnswer,
            })
        }).then(res => res.json())
            .then(
                (result) => {
                    debugger;
                    if (result.type === "acknowledgement") {
                        this.setState({
                            displayPopup: 'flex',
                            endQuiz: true,
                            type: result.type,
                            response: result.response,
                            conversationHistory: result.conversationHistory
                        });
                    } else if (result.type === "question") {
                        this.setState({
                            id: result.id,
                            type: result.type,
                            response: result.response,
                            answers: result.answers,
                            showButton: false,
                            questionAnswered: false
                        });
                    }
                },
                (err) => {
                    console.log(err);
                    debugger;
                    toastr.error("error encounterd receivng question: " + err);
                }
            )
    }

    componentWillMount() {
        debugger
        if (this.state.startingQuiz)
            this.getData();
    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
        });
    }

    handleUserAnswer(answer) {
        this.setState({
            userAnswer: answer
        });
    }

    render() {
        let { id, endQuiz, response, conversationHistory, answers, showButton, questionAnswered, displayPopup } = this.state;

        return (
            <div className="container">

                <Popup style={{ display: displayPopup }} response={response} conversationHistory={conversationHistory} endQuiz={endQuiz} startQuiz={this.handleStartQuiz} />

                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Question</h4>
                            <p>{response}</p>
                        </div>
                        <Answers id={id} answers={answers} showButton={this.handleShowButton} isAnswered={questionAnswered} userAnswer={this.handleUserAnswer} />
                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{endQuiz ? 'Finish quiz' : 'Next question'}</button> : null}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};

export default Main
