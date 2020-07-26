import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Stats from './Stats'

class Forms extends Component {
    constructor() {
        super()
        this.state = {
            forms: [],
            numPerMonth: 0,
            numPerWeek: 0,
            numPerDay: 0
        }
        this.checkDone = this.checkDone.bind(this)
    }

    componentDidMount() {
        axios.get('/api/form_105').then(response => {
            this.setState({
                forms: response.data.forms,
                numPerMonth: response.data.perMonth,
                numPerWeek: response.data.perWeek,
                numPerDay: response.data.perDay
            })
        })
    }

    checkDone(attr) {
        if (attr == true) {
            return (
                <span className='d-block'>
                    <i className='fa fa-check-circle' aria-hidden='true'></i>
                </span>
            )
        } else {
            return (
                <span className='d-block'>
                    <i className='fa fa-refresh'></i>
                </span>
            )
        }
    }

    render() {
        const { forms } = this.state
        return (
            <div>
                <Stats />
                <div className='container-fluid py-4 bg-gradient-primary'>
                    <div className='row justify-content-center'>
                        <div className='col-md-8'>
                            <div className='card'>
                                <div className='card-header'>All Complaints</div>
                                <div className='card-body'>
                                    <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                        Make new complaint
                                </Link>
                                    <ul className='list-group list-group-flush'>
                                        {forms.map(form => (
                                            <Link
                                                className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                                to={`/complaints/${form.refNo}`}
                                                key={form.refNo}
                                            >
                                                {form.officerName}
                                                {this.checkDone(form.done)}
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default Forms