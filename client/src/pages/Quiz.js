import React, { Component } from 'react';
import Navbar from '../containers/Navbar';

export default class Quiz extends Component {
    state = {
        answers: [
            {
                id: '0',
                answer: ''
            },
            {
                id: '1',
                answer: ''
            },
            {
                id: '2',
                answer: ''
            }
        ],
        quiz: [
            {
                id: '0',
                name: "endeavor",
                definition: "to make an effort, to try very hard",
                flag: false
            },
            {
                id: '1',
                name: "stray",
                definition: "wander lose one's way",
                flag: false
            },
            {
                id: '2',
                name: "renovate",
                definition: "restore something to better condition",
                flag: false
            }
        ]
    }
    onChange = (id, e) => {
        let answers = this.state.answers;
        answers[answers.findIndex(ele => {
            return (ele.id === id);
        })].answer = e.target.value;
        this.setState({answers, answers});
    }
    submit = () => {
        console.log(this.state.answers);
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">

                    <div className="card">
                        <div className="card-body">
                            <h2>Quiz</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>word</th>
                                        <th>definition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.quiz.map(word => {
                                        return (
                                            <tr>
                                                <td><input type="text" className="form-control" onChange={(e) => this.onChange(word.id, e)} style={{ padding: '0', height: '1.5rem' }} /></td>
                                                <td>{word.definition}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <button className="btn" style={{ width: '150px', backgroundColor: '#e8ecef' }} onClick={() => this.submit()}>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
