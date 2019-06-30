import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../containers/Navbar';

export default class Home extends Component {
    state = {
        page: 1,
        number: 20,
        filter: 'all',
        sort: 'date',
        words: null,
        delete_id: null,
        delete_name: null
    }
    flagged = (_id) => {
        let words = this.state.words;
        let index = words.findIndex(ele => {
            return (ele._id === _id);
        });
        axios.put(`api/word/${_id}`, { flag: !words[index].flag })
            .then(res => {
                if (res.data.success) {
                    words[index] = res.data.data;
                    this.setState({ words: words });
                }
            });
    }
    sortedBy = (method) => {
        let state = this.state;
        state.sort = method;
        state.page = 1
        this.fetchData(state);
        this.setState(state);
    }
    setCategory = (category) => {
        let state = this.state;
        state.filter = category;
        state.page = 1
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
    deleteWord = (id) => {
        console.log(`delete ${id}`);
        axios.delete(`api/word/${id}`)
        .then(res => {
            if (res.data.success) {
                this.fetchData(this.state);
            }
        }).catch(err => {
            console.log(err);
        })
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
                    <div className="modal fade" id="deleteWord">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">

                                <div className="modal-body">
                                    Confirm to delete <strong>{this.state.delete_name}</strong>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { this.deleteWord(this.state.delete_id) }}>Confirm</button>
                                </div>

                            </div>
                        </div>
                    </div>
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
                                            <th></th>
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
                                                        <td><FontAwesomeIcon onClick={() => { this.setState({ delete_id: word._id, delete_name: word.name }) }} style={{ color: '#d8d8d8' }} data-toggle="modal" data-target="#deleteWord" icon="trash" /></td>
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
