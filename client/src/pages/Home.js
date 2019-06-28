import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../containers/Navbar';

export default class Home extends Component {
    state = {
        index: [
            {
                category: 'all',
                number: 1032
            },
            {
                category: 'a',
                number: 12
            },
            {
                category: 'b',
                number: 34
            },
            {
                category: 'c',
                number: 32
            },
            {
                category: 'd',
                number: 19
            },
            {
                category: 'a',
                number: 12
            },
            {
                category: 'b',
                number: 34
            },
            {
                category: 'c',
                number: 32
            },
            {
                category: 'd',
                number: 19
            }

        ],
        words: [
            {
                name: "endeavor",
                definition: "to make an effort, to try very hard",
                flag: false
            },
            {
                name: "stray",
                definition: "wander lose one's way",
                flag: false
            },
            {
                name: "renovate",
                definition: "restore something to better condition",
                flag: false
            },
            {
                name: "endeavor",
                definition: "to make an effort, to try very hard",
                flag: false
            },
            {
                name: "stray",
                definition: "wander lose one's way",
                flag: true
            },
            {
                name: "renovate",
                definition: "restore something to better condition",
                flag: false
            },
            {
                name: "endeavor",
                definition: "to make an effort, to try very hard",
                flag: true
            },
            {
                name: "stray",
                definition: "wander lose one's way",
                flag: true
            },
            {
                name: "renovate",
                definition: "restore something to better condition",
                flag: false
            },
            {
                name: "endeavor",
                definition: "to make an effort, to try very hard",
                flag: false
            },
            {
                name: "stray",
                definition: "wander lose one's way",
                flag: false
            },
            {
                name: "renovate",
                definition: "restore something to better condition",
                flag: true
            }
        ]
    }
    flagged = (id) => {
        console.log(`flagged ${id}`);
    }
    sortedBy = (method) => {
        console.log(`sorted by ${method}`);
    }
    setCategory = (category) => {
        console.log(`set category ${category}`);
    }
    changePage = (method) => {
        console.log(`method change ${method}`);
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div className="card" style={{ width: '200px' }}>
                        <div className="card-body">

                            <table className="table table-borderless">
                                <tbody>
                                    {
                                        this.state.index.map(ele => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {ele.category}
                                                        <a onClick={() => this.setCategory(ele.category)} style={{ float: 'right', cursor: 'pointer', textDecoration: 'underline' }}><small>{ele.number} words</small></a>

                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card" style={{ width: '800px' }}>
                        <div className="card-body">
                            <h2 style={{ display: 'inline-block' }}>My words</h2>
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
                                                    <td><FontAwesomeIcon icon='flag' onClick={() => { this.flagged(word.id) }} style={(() => {
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
