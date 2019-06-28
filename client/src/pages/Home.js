import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../containers/Navbar';

export default class Home extends Component {
    state = {
        number: 20,
        page: 1,
        words: null
    }
    flagged = (_id) => {
        let word = this.state.words.find(ele => {
            return (ele._id === _id);
        });
        word.flag = ! word.flag;
        axios.post('api/update', word)
        .then(res => {
            console.log(res.data);
        });
    }
    sortedBy = (method) => {
        console.log(`sorted by ${method}`);
    }
    setCategory = (category) => {
        console.log(`set category ${category}`);
    }
    changePage = (method) => {
        let page = this.state.page;
        if (method === 'next') {
            this.setState(state => ({page: page + 1}));
            axios.get(`api/words/${this.state.number}/page/${page + 1}`)
            .then(res => {
                if (res.data.success === true) {
                    this.setState({words: res.data.data});
                }
            });
        } else if (method === 'previous' && page > 1) {
            this.setState(state => ({page: page - 1}));
            axios.get(`api/words/${this.state.number}/page/${page - 1}`)
            .then(res => {
                if (res.data.success === true) {
                    this.setState({words: res.data.data});
                }
            });
        }
    }
    componentDidMount() {
        axios.get(`api/words/${this.state.number}/page/${this.state.page}`)
        .then(res => {
            if (res.data.success === true) {
                this.setState({words: res.data.data});
            }
        });
    }
    render() {
        if (this.state.words === null) {
            return ('loading...');
        } else {
            return (
                <div>
                    <Navbar />
                    <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <div className="card" style={{width: '900px'}}>
                            <div className="card-body">
                                <h2 style={{ display: 'inline-block' }}>My words <small style={{color: '#a9a9a9', fontWeight: '300'}}>page {this.state.page}</small></h2>
                                <div className="dropdown" style={{ float: 'right' }}>
                                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sorted by
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={() => this.sortedBy('alphabetic')}>alphabetic</a>
                                        <a className="dropdown-item" onClick={() => this.sortedBy('latest')}>latest</a>
                                        <a className="dropdown-item" onClick={() => this.sortedBy('flag')}>flag</a>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th scope="col">word</th>
                                            <th scope="col">definition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.words.map(word => {
                                                return (
                                                    <tr>
                                                        <td><FontAwesomeIcon icon='flag' onClick={() => { this.flagged(word._id) }} style={(() => {
                                                            if (word.flag === true) {
                                                                return { color: '#312d2d' };
                                                            } else {
                                                                return { color: '#d8d8d8' };
                                                            }
                                                        })()} /></td>
                                                        <td>{word.word}</td>
                                                        <td>{word.definition}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <nav>
                                        <ul className="pagination" >
                                            <li className="page-item"><a className="page-link" style={{ cursor: 'pointer' }} onClick={() => this.changePage('previous')}>Previous</a></li>
                                            <li className="page-item"><a className="page-link" style={{ cursor: 'pointer' }} onClick={() => this.changePage('next')}>Next</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
