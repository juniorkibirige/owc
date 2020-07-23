import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PoliceForm extends Component {
    constructor() {
        super()
        this.state = {
            refNo: '',
            date: new Date(),
            partOne: {
                title: 'INTRODUCTION'
            },
            partTwo: {
                title: 'COMPLAINANT PARTICULARS',
                name: '',
                age: '',
                gender: '',
                residence: new Object({
                    village: '',
                    subCounty: '',
                    district: '',
                    plotNo: ''
                }),
                tel: '',
                email: ''

            },
            partThree: {
                title: 'DETAILS ABOUT THE COMPLAINT',
                involved: new Object({
                    victimName: '',
                    victimAge: '',
                    gender: ''
                }),
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
                id: new Object({
                    colorUniform: '',
                    nameTag: '',
                    badgeNum: '',
                    uniqPhyFeat: '',
                    other: ''
                }),
                detUnit: ''
            },
            errors: new Object(),
            active: {
                p1: true,
                p2: false,
                p3: false,
                p4: false
            },
            progress: {
                p1: false,
                p2: false,
                p3: false,
                p4: false
            }
        }
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.handleInvolved = this.handleInvolved.bind(this)
        this.handleNav = this.handleNav.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleResidence = this.handleResidence.bind(this)
    }

    handleNav(nav, dir) {
        let errors = new Object()
        errors.length = 0
        if (dir == 'next') {
            let fieldset = null
            switch (nav) {
                case 'p3':
                    fieldset = $('#partTwo').get(0)
                    break;
                case 'p4':
                    fieldset = $('#partThree').get(0)
                    break;
                default:
                    break;
            }
            if (fieldset != null) {
                for (const key in fieldset.elements) {
                    if (fieldset.elements.hasOwnProperty(key)) {
                        const element = fieldset.elements[key];
                        if (key != 10) {
                            if (key != 11) {
                                if (key == 2 || key == 3) {
                                    if (element.checked && !fieldset.elements[key == 2 ? 3 : 2].checked) {
                                        if (!errors['gender'])
                                            errors.length += 1
                                        errors['gender'] = 'Please fill in the neccessary gender'
                                    } else if ((!element.checked && !fieldset.elements[key == 2 ? 3 : 2].checked)) {
                                        if (!errors['gender'])
                                            errors.length += 1
                                        errors['gender'] = ['Please fill in the neccessary gender']
                                    }
                                } else {
                                    if (element.value == '') {
                                        errors[element.name] = ['Please fill in the field']
                                        errors.length += 1
                                    }
                                }
                                console.log(key)
                                console.log(element)
                            }
                        }
                    }
                }
            }
            console.log(errors)
        }
        if (errors.length == 0) {
            switch (nav) {
                case 'p1':
                    this.setState({
                        active: {
                            p1: true,
                            p2: false,
                            p3: false,
                            p4: false
                        }
                    })
                    $('#first-tab').click()
                    break;
                case 'p2':
                    this.setState({
                        active: {
                            p1: false,
                            p2: true,
                            p3: false,
                            p4: false
                        }
                    })
                    $('#second-tab').click()
                    break;
                case 'p3':
                    this.setState({
                        active: {
                            p1: false,
                            p2: false,
                            p3: true,
                            p4: false
                        }
                    })
                    $('#third-tab').click()
                    break;
                case 'p4':
                    this.setState({
                        active: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: true
                        }
                    })
                    $('#fourth-tab').click()
                    break;

                default:
                    break;
            }
        } else {
            this.setState({
                errors: errors
            })
        }
    }

    handleCheckBox(e) {
        let data = e.target.id
        let invalid = document.getElementById('error')
        if(invalid) {
            invalid.style.display = 'none'
        }
        if (data == 'Male') {
            e.target.checked = true
            $('#Female').get(0).checked = false
        } else {
            e.target.checked = true
            $('#Male').get(0).checked = false
        }
        this.setState(prevState => ({
            partTwo: {
                ...prevState.partTwo,
                gender: data
            }
        }))
    }

    handleFieldChange(nav) {
        switch (nav) {
            case 'p2':
                this.setState(prevState => ({
                    partTwo: {
                        ...prevState.partTwo,
                        [event.target.name]: event.target.value
                    }
                }))
                break;
            case 'p3':
                this.setState(prevState => ({
                    partThree: {
                        ...prevState.partThree,
                        [event.target.name]: event.target.value
                    }
                }))
                break;
            case 'p4':
                this.setState(prevState => ({
                    partFour: {
                        ...prevState.partFour,
                        [event.target.name]: event.target.value
                    }
                }))
                break;

            default:
                break;
        }
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

    handleResidence() {
        this.setState(prevState => ({
            partTwo: {
                ...prevState.partTwo,
                residence: {
                    ...prevState.partTwo.residence,
                    [event.target.name]: event.target.value
                }
            }
        }))
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback d-block' id='error'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
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
                            <div className='card-header text-center'>COMPLAINT/S AGAINST A POLICE OFFICER [POLICE FORM 105]</div>
                            <div className="col-md-12 py-3 bg-secondary">
                                <ul className="nav nav-pills nav-pills-circle mb-3" id="tabs_3" role="tablist">
                                    <li className="nav-item">
                                        <a className={`nav-link rounded-circle ${this.state.active.p1 ? 'active' : ''}`} id="first-tab" data-toggle="tab" href="#partOne" role="tab" aria-selected="true">
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
                                        <a className={`nav-link rounded-circle ${this.state.active.p2 ? 'active' : ''}`} id="second-tab" data-toggle="tab" href="#partTwo" role="tab" aria-selected="false">
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
                                        <a className={`nav-link rounded-circle ${this.state.active.p3 ? 'active' : ''}`} id="third-tab" data-toggle="tab" href="#partThree" role="tab" aria-selected="false">
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
                                        <a className={`nav-link rounded-circle ${this.state.active.p4 ? 'active' : ''}`} id="fourth-tab" data-toggle="tab" href="#partFour" role="tab" aria-selected="false">
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
                                                <div className='card pb-3'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partOne.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">
                                                            This form is for lodging complaint/s against a police officer on cases of violation of human rights
                                                            and unporofessional conduct under section 70 of the Police Act 303, which provides for complaints by
                                                            the public against police officers. A person is entitled, without prejudice to any other legal means
                                                            of redress available to him or her, to make a written complaint as to - (a) an instance of bribery,
                                                            corruption, oppression or intimidation by a police officer; (b) any neglect or non  perfomance of his
                                                            or her duties by a police officer; (c) any other misconduct by a police officer.
                                                        </p>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button id='next' type="button" className="btn btn-default float-right" onClick={this.handleNav.bind(this, 'p2')}><i className='ni ni-bold-right'></i></button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partTwo">
                                                <div className='card pb-3'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partTwo.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <div className={`form-group ${this.hasErrorFor('name') ? 'has-danger' : ''}`}>
                                                            <input
                                                                id='name'
                                                                type='text'
                                                                className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                                                name='name'
                                                                placeholder='Name'
                                                                required
                                                                value={this.state.partTwo.name}
                                                                onChange={this.handleFieldChange.bind(this, 'p2')}
                                                            />
                                                        </div>
                                                        <div className={`form-group ${this.hasErrorFor('age') ? 'has-danger' : ''}`}>
                                                            <input
                                                                id='age'
                                                                type='text'
                                                                className={`form-control ${this.hasErrorFor('age') ? 'is-invalid' : ''}`}
                                                                name='age'
                                                                placeholder='Age'
                                                                required
                                                                value={this.state.partTwo.age}
                                                                onChange={this.handleFieldChange.bind(this, 'p2')}
                                                            />
                                                        </div>
                                                        <div className='form-group'>
                                                            <div className='container'>
                                                                <div className='row'>
                                                                    <label htmlFor='gender'>Gender &nbsp;</label>
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input className="custom-control-input gender-sel" id="Male" type="checkbox" onChange={this.handleCheckBox} />
                                                                        <label className="custom-control-label" htmlFor="Male">Male</label>
                                                                    </div>
                                                                    &nbsp;
                                                                    <div className="custom-control custom-checkbox mb-3">
                                                                        <input className="custom-control-input gender-sel" id="Female" type="checkbox" onChange={this.handleCheckBox} />
                                                                        <label className="custom-control-label" htmlFor="Female">Female</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {this.renderErrorFor('gender')}
                                                        </div>
                                                        <label htmlFor='residence'>Place of Residence</label>
                                                        <div className='container text-center'>
                                                            <div className='row'>
                                                                <div className={`form-group col-md-6 col-sm-12 ${this.hasErrorFor('village') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='village'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('village') ? 'is-invalid' : ''}`}
                                                                        name='village'
                                                                        placeholder='Village'
                                                                        required
                                                                        value={this.state.partTwo.residence.village}
                                                                        onChange={this.handleResidence}
                                                                    />
                                                                </div>
                                                                <div className={`form-group col-md-6 col-sm-12 ${this.hasErrorFor('subCounty') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='subCounty'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('subCounty') ? 'is-invalid' : ''}`}
                                                                        name='subCounty'
                                                                        placeholder='Sub County'
                                                                        required
                                                                        value={this.state.partTwo.residence.subCounty}
                                                                        onChange={this.handleResidence}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className='row'>
                                                                <div className={`form-group col-md-6 col-sm-12 ${this.hasErrorFor('district') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='district'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('district') ? 'is-invalid' : ''}`}
                                                                        name='district'
                                                                        placeholder='District'
                                                                        required
                                                                        value={this.state.partTwo.residence.district}
                                                                        onChange={this.handleResidence}
                                                                    />
                                                                </div>
                                                                <div className={`form-group col-md-6 col-sm-12 ${this.hasErrorFor('plotNo') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='plotNo'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('plotNo') ? 'is-invalid' : ''}`}
                                                                        name='plotNo'
                                                                        placeholder='Plot No'
                                                                        required
                                                                        value={this.state.partTwo.residence.plotNo}
                                                                        onChange={this.handleResidence}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <label htmlFor='contact'>Contact Information</label>
                                                        <div className='container'>
                                                            <div className='row'>
                                                                <div className={`form-group col-md-6 col-sm-12 ${this.hasErrorFor('tel') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='tel'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('tel') ? 'is-invalid' : ''}`}
                                                                        name='tel'
                                                                        placeholder='Telephone'
                                                                        required
                                                                        value={this.state.partTwo.tel}
                                                                        onChange={this.handleFieldChange.bind(this, 'p2')}
                                                                    />
                                                                </div>
                                                                <div className={`form-group col-md-6 col-sm-12 ${this.hasErrorFor('name') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='email'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                        name='email'
                                                                        placeholder='Email Address'
                                                                        value={this.state.partTwo.email}
                                                                        onChange={this.handleFieldChange.bind(this, 'p2')}
                                                                    />
                                                                    {this.renderErrorFor('email')}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12'>
                                                    <button id='prev' type="button" className="btn btn-default float-left" onClick={this.handleNav.bind(this, 'p1', 'prev')}><i className='ni ni-bold-left'></i></button>
                                                    <button id='next' type="button" className="btn btn-default float-right" onClick={this.handleNav.bind(this, 'p3', 'next')}><i className='ni ni-bold-right'></i></button>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partThree">
                                                <div className='card pb-3'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partThree.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                                                        <br /><br />Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button id='prev' type="button" className="btn btn-default float-left" onClick={this.handleNav.bind(this, 'p2', 'prev')}><i className='ni ni-bold-left'></i></button>
                                                        <button id='next' type="button" className="btn btn-default float-right" onClick={this.handleNav.bind(this, 'p4', 'next')}><i className='ni ni-bold-right'></i></button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partFour">
                                                <div className='card pb-3'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partFour.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <p className="description">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
                                                        <br /><br />Dynamically innovate resource-leveling customer service for state of the art customer service.</p>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button id='prev' type="button" className="btn btn-default float-left" onClick={this.handleNav.bind(this, 'p3', 'prev')}><i className='ni ni-bold-left'></i></button>
                                                        <button className="btn btn-primary btn-round float-right">
                                                            <i className="ni ni-send"></i> Submit
                                                        </button>
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
            </div >
        )
    }
}

export default PoliceForm