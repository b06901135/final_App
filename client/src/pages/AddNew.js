import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../containers/Navbar';

export default class AddNew extends Component {
    state = {
        word: '',
        definition: '',
        new_words: []
    }
    addNew = () => {
        document.getElementById('word').value = '';
        document.getElementById('definition').value = '';
        document.getElementById('word').focus();
        this.setState(state => ({
            new_words: [...state.new_words, {
                word: state.word,
                definition: state.definition
            }],
            word: '',
            definition: ''
        }))
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onKeyup = (e) => {
        if (e.keyCode === 13) {
            this.addNew();
        }
    }
    submit = () => {
        console.log(this.state.new_words);
        axios.post('api/add', {data: this.state.new_words})
        .then(res => {
            console.log(res.data);
        });
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div className="card" style={{ width: '500px' }}>
                        <div className="card-body">
                            <h2>Add new word</h2>
                            <div className="input-group mb-3">
                                <input id="word" name="word" type="text" className="form-control" onChange={e => this.onChange(e)} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text">word</span>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input id="definition" name="definition" type="text" className="form-control" onChange={e => this.onChange(e)} onKeyUp={e => this.onKeyup(e)} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text">definition</span>
                                </div>
                            </div>
                            <button className="btn" style={{ width: '150px', backgroundColor: '#e8ecef' }} onClick={() => this.addNew()}>create</button>
                        </div>
                    </div>
                    <div className="card" style={{ width: '500px' }}>
                        <div className="card-body">
                            <h2>Words to add</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">word</th>
                                        <th scope="col">definition</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.new_words.map(word => {
                                            return (
                                                <tr>
                                                    <td>{word.word}</td>
                                                    <td>{word.definition}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                            <button className="btn" style={{ width: '150px', backgroundColor: '#e8ecef' }} onClick={() => this.submit()}>add to dictionary</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
