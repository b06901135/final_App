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
                def: "to make an effort, to try very hard"
            },
            {
                name: "stray",
                def: "wander lose one's way"
            },
            {
                name: "renovate",
                def: "restore something to better condition"
            },
            {
                name: "endeavor",
                def: "to make an effort, to try very hard"
            },
            {
                name: "stray",
                def: "wander lose one's way"
            },
            {
                name: "renovate",
                def: "restore something to better condition"
            },
            {
                name: "endeavor",
                def: "to make an effort, to try very hard"
            },
            {
                name: "stray",
                def: "wander lose one's way"
            },
            {
                name: "renovate",
                def: "restore something to better condition"
            },
            {
                name: "endeavor",
                def: "to make an effort, to try very hard"
            },
            {
                name: "stray",
                def: "wander lose one's way"
            },
            {
                name: "renovate",
                def: "restore something to better condition"
            }
        ]
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
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
                                                        <a href="#" style={{float: 'right'}}><small>{ele.number} words</small></a>
                                                        
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
                                    <a className="dropdown-item" href="#">alphabetic</a>
                                    <a className="dropdown-item" href="#">latest</a>
                                    <a className="dropdown-item" href="#">difficulty</a>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
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
                                                    <td>{word.name}</td>
                                                    <td>{word.def}</td>
                                                    <td><FontAwesomeIcon icon='flag' /></td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
