import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../containers/Navbar';

export default class Quiz extends Component {
    state = {
        number: 20,
        answers: null,
        quiz: null
    }
    onChange = (_id, e) => {
        let answers = this.state.answers;
        answers[answers.findIndex(ele => {
            return (ele._id === _id);
        })].answer = e.target.value;
        this.setState({answers, answers});
    }
    submit = () => {
        console.log(this.state.answers);
        let quiz = this.state.quiz;
        let answers = this.state.answers;
        for (let i = 0; i < quiz.length; i++) {
            if (quiz[i].word === answers[i].answer) {
                quiz[i].correct = true;
            }
        }
        this.setState({quiz: quiz});
    }
    componentDidMount() {
        axios.get(`api/quiz/${this.state.number}`)
        .then(res => {
            if (res.data.success === true) {
                let quiz = res.data.data;
                let answers = quiz.map(ele => {
                    return {
                        _id: ele._id,
                        word: ele.word,
                        answer: ''
                    };
                });
                this.setState({quiz: quiz, answers: answers});
            }
        });
    }
    render() {
        if (this.state.quiz === null) {
            return 'loading...';
        } else {
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
                                                    <td><input type="text" className="form-control" onChange={(e) => this.onChange(word._id, e)} style={{ padding: '0', height: '1.5rem' }} /></td>
                                                    <td style={(() => {
                                                        if (word.correct === true) {
                                                            return {backgroundColor: '#caefd2'}
                                                        }
                                                    })()}>{word.definition}</td>
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
}
