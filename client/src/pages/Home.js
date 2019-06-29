import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../containers/Navbar';

export default class Home extends Component {
    state = {
        filter: 'all',
        sort: 'date',
        page: 1,
        number: 20,
        words: null
    }
    flagged = (_id) => {
        let words = this.state.words;
        let index = words.findIndex(ele => {
            return (ele._id === _id);
        });
        axios.put(`api/word/${_id}`, { flag: ! words[index].flag })
            .then(res => {
                if (res.data.success) {
                    words[index] = res.data.data;
                    this.setState({words: words});
                }
            });
    }
    sortedBy = (method) => {
        let state = this.state;
        state.sort = method;
        this.fetchData(state);
        this.setState(state);
    }
    setCategory = (category) => {
        console.log(`set category ${category}`);
        let state = this.state;
        state.filter = category;
        this.fetchData(state);
        this.setState(state);
    }
    changePage = (method) => {
        let state = this.state;
        if (method === 'next') {
            state.page += 1;
        } else if (method === 'previous' && state.page > 1) {
            state.page -= 1;
        }
        this.fetchData(state);
        this.setState(state);
    }
    fetchData = (state) => {
        axios.get(`api/word/${state.filter}/${state.sort}/${state.number * (state.page - 1)}/${state.number * (state.page)}`)
            .then(res => {
                if (res.data.success) {
                    this.setState({ words: res.data.data });
                }
            });
    }
    componentDidMount() {
        this.fetchData(this.state);
    }
    render() {
        if (this.state.words === null) {
            return ('loading...');
        } else {
            return (
                <div>
                    <Navbar />
                    <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                        <div className="card" style={{ width: '900px' }}>
                            <div className="card-body">
                                <h2 style={{ display: 'inline-block' }}>My words <small style={{ color: '#a9a9a9', fontWeight: '300' }}>page {this.state.page}</small></h2>
                                <div className="dropdown" style={{ float: 'right' }}>
                                    <button className="btn dropdown-toggle" type="button" id="dropdownSortedBy" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sorted by
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownSortedBy">
                                        <a className="dropdown-item" onClick={() => this.sortedBy('asc')}>alphabetic</a>
                                        <a className="dropdown-item" onClick={() => this.sortedBy('date')}>latest</a>
                                        <a className="dropdown-item" onClick={() => this.sortedBy('flag')}>flag</a>
                                    </div>
                                </div>
                                <div className="dropdown" style={{ float: 'right' }}>
                                    <button className="btn dropdown-toggle" type="button" id="dropdownCategory" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Category
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownCategory">
                                        {['all', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].map(ele => {
                                            return (
                                                <a className="dropdown-item" onClick={() => this.setCategory(ele)}>{ele}</a>
                                            );
                                        })}
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
                                                        <td>{word.name}</td>
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
