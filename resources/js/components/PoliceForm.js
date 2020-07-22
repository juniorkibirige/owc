import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PoliceForm extends Component {
    constructor() {
        super()
        this.state = {
            refNo: '',
            date: new Date().getDate,
            partOne: {
                title: 'INTRODUCTION'
            },
            partTwo: {
                title: 'COMPLAINANT PARTICULARS',
                name: '',
                age: '',
                gender: '',
                residence: {
                    village: '',
                    subCounty: '',
                    district: '',
                    plotNo: ''
                },
                tel: '',
                email: ''

            },
            partThree: {
                title: 'DETAILS ABOUT THE COMPLAINT',
                involved: {
                    victimName: '',
                    victimAge: '',
                    gender: ''
                },
                statement: '',
                period: new Date(),
                location: '',
                dI: false,
                dIDescription: '',
                witness: false,
                medExam: false,
                reported: false,
                reportRef: ''
            },
            partFour: {
                title: 'POLICE OFFICER/S AGAINST WHOM A COMPLAINT IS MADE',
                name: '',
                rank: '',
                id: {
                    colorUniform: '',
                    nameTag: '',
                    badgeNum: '',
                    uniqPhyFeat: '',
                    other: ''
                },
                detUnit: ''
            },
            errors: [],
            progress: []
        }
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleDate = this.handleDate.bind(this)
    }

    handleCheckBox(e) {
        print(e.target)
    }

    handleDate(date) {
        this.setState(prevState => ({
            partThree: {
                ...prevState.partThree,
                period: date
            }
        }))
    }

    // For nested state objects
    handleInvolved(e) {
        this.setState(prevState => ({
            partThree: {
                ...prevState.partThree,
                involved: {
                    ...prevState.partThree.involved,
                    // field to edit
                }
            }
        }))
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {

        }
    }

    render() {
        return (
            <div className='container py-3'>
                <div className='row justify-content-center'>
                    <div className='col-md-9'>
                        <div className='card'>
                            <div className='col-md-12 text-center pt-3'>
                                <img className='rounded mx-auto d-block' src='static/images/formLogo.png' style={{ width: 120 + 'px', height: 129 + 'px' }} />
                            </div>
                            <div className='card-header text-center'>COMPLAINT/S AGAINST A POLICE OFFICE [POLICE FORM 105]</div>
                            <div className="col-md-12 py-3 bg-secondary">
                                <ul className="nav nav-pills nav-pills-circle mb-3" id="tabs_3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link rounded-circle active" id="first-tab" data-toggle="tab" href="#partOne" role="tab" aria-selected="false">
                                            <span className="nav-link-icon d-block">
                                                <span className="fa-stack">
                                                    <strong className="fa-stack-1x">
                                                        1
                                                    </strong>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="second-tab" data-toggle="tab" href="#partTwo" role="tab" aria-selected="false">
                                            <span className="nav-link-icon d-block">
                                                <span className="fa-stack">
                                                    <strong className="fa-stack-1x">
                                                        2
                                                    </strong>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link rounded-circle" id="third-tab" data-toggle="tab" href="#partThree" role="tab" aria-selected="true">
                                            <span className="nav-link-icon d-block">
                                                <span className="fa-stack">
                                                    <strong className="fa-stack-1x">
                                                        3
                                                    </strong>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="fourth-tab" data-toggle="tab" href="#partFour" role="tab" aria-selected="false">
                                            <span className="nav-link-icon d-block">
                                                <span className="fa-stack">
                                                    <strong className="fa-stack-1x">
                                                        4
                                                    </strong>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="card card-plain">
                                    <form onSubmit={this.handleSubmit} id='form105'>
                                        <div className="tab-content tab-space p-3" style={{ backgroundColor: '#e9ecef' }}>
                                            <fieldset className='tab-pane fade active show' id='partOne'>
                                                <div className='card'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partOne.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
                                                        <br /><br />
                                                        Dramatically visualize customer directed convergence without revolutionary ROI.</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partTwo">
                                                <div className='card'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partTwo.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
                                                        <br /><br />Dramatically maintain clicks-and-mortar solutions without functional solutions.</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partThree">
                                                <div className='card'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partThree.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                                                        <br /><br />Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partFour">
                                                <div className='card'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partFour.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                                                        <br /><br />Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PoliceForm