import React, { Component } from 'react';
import Navbar from '../containers/Navbar';

export default class AddNew extends Component {
    state = {
        name: '',
        definition: '',
        new_words: []
    }
    addNew = () => {
        this.setState(state => ({new_words: [...state.new_words, {
            name: state.name,
            definition: state.definition
            }],
            name: '',
            definition: ''
        }))
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    onKeyup = (e) => {
        if (e.keyCode === 13) {
            document.getElementById('name').setAttribute('value', '');
            document.getElementById('definition').setAttribute('value', '');
            this.addNew();
        }
    }
    submit = () => {}
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">

                    <div className="card">
                        <div className="card-body">
                            <h2>Add new word</h2>
                            <div className="input-group mb-3">
                                <input id="name" name="name" type="text" className="form-control" onChange={e => this.onChange(e)} />
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
                            <button className="btn" style={{width: '150px', backgroundColor: '#e8ecef'}} onClick={() => this.addNew()}>create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
