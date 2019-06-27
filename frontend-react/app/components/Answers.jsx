import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', '', '']
        }

        this.checkAnswer = this.checkAnswer.bind(this);

    }

    checkAnswer(e) {
        let { isAnswered } = this.props;

        if (!isAnswered) {
            let elem = e.currentTarget;
            let { userAnswer } = this.props;
            let answer = elem.dataset.id;
            let updatedClassNames = this.state.classNames;

            debugger;
            updatedClassNames[answer] = 'right';
            userAnswer(answer);

            this.setState({
                classNames: updatedClassNames
            })

            this.props.showButton();
        }
    }

    shouldComponentUpdate() {
        this.setState({
            classNames: ['', '', '', '']
        });
        return true;
    }

    render() {
        debugger
        let { answers } = this.props;
        let { classNames } = this.state;
        answers = Object.keys(answers)

        return (
            <div id="answers">
                <ul>
                    {(answers[0] != undefined) ? <li onClick={this.checkAnswer} className={classNames[answers[0]]} data-id={answers[0]}><span>A</span> <p>{answers[0]}</p></li> : <span />}
                    {(answers[1] != undefined) ? <li onClick={this.checkAnswer} className={classNames[answers[1]]} data-id={answers[1]}><span>B</span> <p>{answers[1]}</p></li> : <span />}
                    {(answers[2] != undefined) ? <li onClick={this.checkAnswer} className={classNames[answers[2]]} data-id={answers[2]}><span>C</span> <p>{answers[2]}</p></li> : <span />}
                    {(answers[3] != undefined) ? <li onClick={this.checkAnswer} className={classNames[answers[3]]} data-id={answers[3]}><span>D</span> <p>{answers[3]}</p></li> : <span />}
                </ul>
            </div>
        );
    }
}

export default Answers