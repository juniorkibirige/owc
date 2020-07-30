import axios from 'axios'
import React, { Component } from 'react'
import { v4 } from 'uuid';
import {
    FormGroup, FormText,
    Input, Label,
    Row, Col,
    Card, CardHeader
} from 'reactstrap'

class PoliceForm extends Component {

    componentDidMount() {
        this.getCities()
        this.setInputFilter(document.getElementById('age'), function (value) {
            return /^-?\d*$/.test(value);
        });

        this.setInputFilter(document.getElementById('tel'), function (value) {
            return /^-?\d*$/.test(value);
        });
        let state_of_state = localStorage["appState"]
        if (!state_of_state) {
            let appState = {
                isLoggedIn: false,
                user: {}
            }
            localStorage['appState'] = JSON.stringify(appState)
        }

        let state = localStorage['appState']
        let AppState = JSON.parse(state)

        const Auth = {
            isLoggedIn: AppState.isLoggedIn,
            user: AppState.user
        }

        this.setState({
            isLoggedIn: Auth.isLoggedIn,
            user: Auth.user
        })
    }
    setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    textbox.oldValue = textbox.value;
                    textbox.oldSelectionStart = textbox.selectionStart;
                    textbox.oldSelectionEnd = textbox.selectionEnd;
                } else if (textbox.hasOwnProperty("oldValue")) {
                    textbox.value = textbox.oldValue;
                    textbox.setSelectionRange(textbox.oldSelectionStart, textbox.oldSelectionEnd);
                } else {
                    textbox.value = "";
                }
            });
        });
    }

    constructor() {
        super()
        this.state = {
            isSubmitting: false,
            isLoading: true,
            cityData: [],
            refNo: v4(),
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
                    victimGender: ''
                }),
                sameAsComplainant: false,
                statement: '',
                period: '',
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
                id: '',
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
            },
            tab: {
                dateTab: false,
                timeTab: false,
                yearTab: false
            },
            tabSel: '',
            user: [],
            isLoggedIn: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleDate = this.handleDate.bind(this)
        this.handleInvolved = this.handleInvolved.bind(this)
        this.handleNav = this.handleNav.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleSel = this.handleSel.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
        this.handleResidence = this.handleResidence.bind(this)
        this.handlePill = this.handlePill.bind(this)
        this.isVisible = this.isVisible.bind(this)
        this.cities = this.cities.bind(this)
    }

    handleSubmit(event) {
        this.setState(prevState => ({
            isSubmitting: true,
            progress: {
                ...prevState.progress,
                p4: true
            }
        }))
        event.preventDefault()

        if (this.state.progress.p1 && this.state.progress.p2 && this.state.progress.p3 && this.state.progress.p4) {

            const { history } = this.props

            const form = {
                'refNo': this.state.refNo,
                'date': this.state.date,
                'compName': this.state.partTwo.name,
                'compAge': this.state.partTwo.age,
                'compEmail': this.state.partTwo.email,
                'compGender': this.state.partTwo.gender,
                'compTel': this.state.partTwo.tel,
                'compDist': this.state.partTwo.residence.district,
                'compPlotNo': this.state.partTwo.residence.plotNo,
                'compsubCounty': this.state.partTwo.residence.subCounty,
                'compVillage': this.state.partTwo.residence.village,
                'dI': this.state.partThree.dI,
                'dIDescription': this.state.partThree.dIDescription,
                'location': this.state.partThree.location,
                'medExam': this.state.partThree.medExam,
                'period': this.state.partThree.period,
                'reportRef': this.state.partThree.reportRef,
                'reported': this.state.partThree.reported,
                'statement': this.state.partThree.statement,
                'witness': this.state.partThree.witness,
                'victimName': this.state.partThree.involved.victimName,
                'victimAge': this.state.partThree.involved.victimAge,
                'victimGender': this.state.partThree.involved.victimGender,
                'officerName': this.state.partFour.name,
                'officerRank': this.state.partFour.rank,
                'otherId': this.state.partFour.id,
                'detUnit': this.state.partFour.detUnit
            }

            axios.post('/api/form_105', form)
                .then(response => {
                    this.state.isLoggedIn ? history.push('/dashboard') : history.push('/')
                }).catch(error => {
                    console.warn(error.response.data.errors)
                    this.setState({
                        errors: error.response.data.errors
                    })
                }).finally(_ => {
                    this.setState({
                        isSubmitting: false
                    })
                })
        } else {
            alert('Please cross check the form and fill in any missing fields')
            this.setState({
                isSubmitting: false
            })
        }
    }

    handleSel(e) {
        let data = e.target.value
        switch (data) {
            case 'dateTab':
                this.setState({
                    tab: {
                        dateTab: true,
                        timeTab: false,
                        yearTab: false
                    },
                    tabSel: data
                })
                break;
            case 'timeTab':
                this.setState({
                    tab: {
                        dateTab: false,
                        timeTab: true,
                        yearTab: false
                    },
                    tabSel: data
                })
                break;
            case 'yearTab':
                this.setState({
                    tab: {
                        dateTab: false,
                        timeTab: false,
                        yearTab: true
                    },
                    tabSel: data
                })
                break;

            default:
                break;
        }
    }

    handleNav(nav, dir) {
        let errors = new Object()
        errors.length = 0;
        if (dir == 'next') {
            let fieldset = null
            switch (nav) {
                case 'p3':
                    fieldset = $('#partTwo').get(0)
                    if (fieldset != null) {
                        for (const key in fieldset.elements) {
                            if (fieldset.elements.hasOwnProperty(key)) {
                                const element = fieldset.elements[key];
                                if (key != 10) {
                                    if (key != 11) {
                                        if (key == 2 || key == 3) {
                                            if (element.checked && fieldset.elements[key == 2 ? 3 : 2].checked) {
                                                if (!errors['gender']) {
                                                    errors.length += 1
                                                    errors['gender'] = 'Please fill in the neccessary gender'
                                                }
                                            } else if ((!element.checked && !fieldset.elements[key == 2 ? 3 : 2].checked)) {
                                                if (!errors['gender']) {
                                                    errors.length += 1
                                                    errors['gender'] = ['Please fill in the neccessary gender']
                                                }
                                            }
                                        } else {
                                            if (element.value == '') {
                                                errors[element.name] = ['Please fill in the field']
                                                errors.length += 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 'p4':
                    fieldset = $('#partThree').get(0)
                    if (fieldset != null) {
                        for (const key in fieldset.elements) {
                            if (fieldset.elements.hasOwnProperty(key)) {
                                const element = fieldset.elements[key];
                                if (key == 2 || key == 4 || key == 7) { /* Selecting and handling select errors */
                                    if (element.value == 'default' && key != 7) {
                                        if (element.name != "") {
                                            console.log(key)
                                            console.log(element.name)
                                            errors[element.name] = ['Please select the required data']
                                            errors.length += 1
                                        }
                                    }
                                } else if (element.type == 'radio') { /* Handling radio inputs errors */
                                    if (element.name == 'dI') {
                                        if (this.state.partThree.dI) {
                                            let desc = $('textarea#dIDescription').get(0)
                                            if (desc.value == '') {
                                                errors[desc.name] = ['Please enter data']
                                                errors.length += 1
                                            }
                                        }
                                    } else if (element.name == 'reported') {
                                        if (this.state.partThree.reported) {
                                            let rep = $('#reportRef[type="text"]').get(0)
                                            if (rep.value == '') {
                                                errors[rep.name] = ['Please enter data']
                                                errors.length += 1
                                            }
                                        }
                                    }
                                } else {
                                    if (element.value == '' && element.name != "" && element.name != "sameAsComplainant" && element.name != "period" && element.name != "dIDescription" && element.name != "reportRef") {
                                        errors[element.name] = ['Please fill the field']
                                        errors.length += 1
                                    }
                                }
                            }
                        }
                    }
                    break
                default:
                    break
            }
            console.log(errors)
        }
        if (errors.length == 0) {
            switch (nav) {
                case 'p1':
                    this.setState(prevState => ({
                        progress: {
                            ...prevState.progress
                        }
                    }))
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
                    this.setState(prevState => ({
                        active: {
                            p1: false,
                            p2: true,
                            p3: false,
                            p4: false
                        },
                        progress: {
                            ...prevState.progress,
                            p1: true
                        }
                    }))
                    $('#second-tab').click()
                    break;
                case 'p3':
                    this.setState(prevState => ({
                        active: {
                            p1: false,
                            p2: false,
                            p3: true,
                            p4: false
                        },
                        progress: {
                            ...prevState.progress,
                            p2: true
                        }
                    }))
                    $('#third-tab').click()
                    break;
                case 'p4':
                    this.setState(prevState => ({
                        active: {
                            p1: false,
                            p2: false,
                            p3: false,
                            p4: true
                        },
                        progress: {
                            ...prevState.progress,
                            p3: true
                        }
                    }))
                    $('#fourth-tab').click()
                    break;
                case 'done':
                    this.setState(prevState => ({
                        progress: {
                            ...prevState.progress,
                            p4: true
                        }
                    }))
                    break
                default:
                    break;
            }
        } else {
            this.setState({
                errors: errors
            })
        }
    }

    handlePill(nav) {
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
                    },
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
    }

    handleCheckBox(nav, type) {
        let data = event.target.id
        let invalid = document.getElementById('error')
        if (invalid) {
            invalid.style.display = 'none'
        }
        if (data == 'Male') {
            event.target.checked = true
            $('#Female').get(0).checked = false
        } else if (data == 'Female') {
            event.target.checked = true
            $('#Male').get(0).checked = false
        }
        switch (nav) {
            case 'p2':
                this.setState(prevState => ({
                    partTwo: {
                        ...prevState.partTwo,
                        gender: data
                    }
                }))
                break
            case 'p3':
                data = event.target.value
                switch (type) {
                    case 'dI':
                        this.setState(prevState => ({
                            partThree: {
                                ...prevState.partThree,
                                dI: data == 'true' ? true : false
                            }
                        }))
                        break
                    case 'wit':
                        this.setState(prevState => ({
                            partThree: {
                                ...prevState.partThree,
                                witness: data == 'true' ? true : false
                            }
                        }))
                        break
                    case 'rep':
                        this.setState(prevState => ({
                            partThree: {
                                ...prevState.partThree,
                                reported: data == 'true' ? true : false
                            }
                        }))
                        break
                }
                break;
        }
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
                        [event.target.id]: event.target.value
                    }
                }))
                break;

            default:
                break;
        }
    }

    handleDate(event) {
        let date = event.target.value
        if (date != '') {
            this.setState(prevState => ({
                partThree: {
                    ...prevState.partThree,
                    period: date
                }
            }))
        }
        else { event.target.value = this.state.partThree.period }
    }

    // For nested state objects
    handleInvolved(e) {
        if (event.target.name == 'sameAsComplainant')
            if (event.target.checked) {
                this.setState(prevState => ({
                    partThree: {
                        ...prevState.partThree,
                        involved: {
                            victimName: this.state.partTwo.name,
                            victimAge: this.state.partTwo.age,
                            victimGender: this.state.partTwo.gender,
                            sameAsComplainant: event.target.checked
                        }
                    }
                }))
                $('div#vicDet').css({
                    display: 'none'
                })
            } else {
                this.setState(prevState => ({
                    partThree: {
                        ...prevState.partThree,
                        involved: {
                            victimName: '',
                            victimAge: '',
                            victimGender: '',
                            sameAsComplainant: event.target.checked
                        }
                    }
                }))
                $('div#vicDet').removeAttr('style')
            }
        else
            this.setState(prevState => ({
                partThree: {
                    ...prevState.partThree,
                    involved: {
                        ...prevState.partThree.involved,
                        [event.target.name]: event.target.value
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

    isVisible(id) {
        if (id == 'dateTab') {
            return this.state.tab.dateTab
        } else if (id == 'timeTab') {
            return this.state.tab.timeTab
        } else if (id == 'yearTab') {
            return this.state.tab.yearTab
        }
        return false
    }

    getCities() {
        axios.get('/compiled_data/ugCities.json').then(response => {
            this.setState({
                cityData: response.data,
                isLoading: false
            })
        })
    }

    cities() {
        return (
            <div className={`form-group ${this.hasErrorFor('location') ? 'has-danger' : ''}`} defaultValue="Victim's Gender">
                <select id='location' name='location' className={`form-control ${this.hasErrorFor('location') ? 'is-invalid' : ''}`} placeholder='default' value={this.state.partThree.location} onChange={this.handleFieldChange.bind(this, 'p3')}>
                    <option name='default' value='default' key="default">Select where crime happened</option>
                    {
                        this.state.cityData.map(city => {
                            return <option name={city} value={city} key={city.toString()}>{city}</option>
                        })
                    }
                </select>
                {this.renderErrorFor('location')}
            </div>
        )
    }

    render() {
        return (
            <div className='container py-3 bg-gradient-primary'>
                <div className='row justify-content-center'>
                    <div className='col-md-9'>
                        <div className='card'>
                            <div className='col-md-12 text-center pt-3'>
                                <img className='rounded mx-auto d-block' src='/static/images/formLogo.png' style={{ width: 120 + 'px', height: 129 + 'px' }} />
                            </div>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 mx-auto'>
                                        <div className='float-right'>Date: {this.state.date.toDateString()}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-12 mx-auto'>
                                        <div className='float-right'>Ref: {this.state.refNo}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-header text-center'>COMPLAINT/S AGAINST A POLICE OFFICER [POLICE FORM 105]</div>
                            <div className="col-md-12 py-3 bg-secondary">
                                <ul className="nav nav-pills nav-pills-circle mb-3" id="tabs_3" role="tablist">
                                    <li className="nav-item">
                                        <a className={`nav-link rounded-circle ${this.state.active.p1 ? 'active' : ''}`} onClick={this.handlePill.bind(this, 'p1')} id="first-tab" data-toggle="tab" href="#partOne" role="tab" aria-selected="true">
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
                                        <a className={`nav-link rounded-circle ${this.state.active.p2 ? 'active' : ''}`} onClick={this.handlePill.bind(this, 'p2')} id="second-tab" data-toggle="tab" href="#partTwo" role="tab" aria-selected="false">
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
                                        <a className={`nav-link rounded-circle ${this.state.active.p3 ? 'active' : ''}`} onClick={this.handlePill.bind(this, 'p3')} id="third-tab" data-toggle="tab" href="#partThree" role="tab" aria-selected="false">
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
                                        <a className={`nav-link rounded-circle ${this.state.active.p4 ? 'active' : ''}`} onClick={this.handlePill.bind(this, 'p4')} id="fourth-tab" data-toggle="tab" href="#partFour" role="tab" aria-selected="false">
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
                                                                accept="number"
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
                                                                        <input className="custom-control-input gender-sel" id="Male" type="checkbox" onChange={this.handleCheckBox.bind(this, 'p2')} />
                                                                        <label className="custom-control-label" htmlFor="Male">Male</label>
                                                                    </div>
                                                                    &nbsp;
                                                                    <div className="custom-control custom-checkbox mb-3">
                                                                        <input className="custom-control-input gender-sel" id="Female" type="checkbox" onChange={this.handleCheckBox.bind(this, 'p2')} />
                                                                        <label className="custom-control-label" htmlFor="Female">Female</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {this.renderErrorFor('gender')}
                                                        </div>
                                                        <label htmlFor='residence'>Place of Residence</label>
                                                        <div className='container text-center'>
                                                            <div className='row'>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div className={`form-group ${this.hasErrorFor('district') ? 'has-danger' : ''}`}>
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
                                                                </div>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div className={`form-group ${this.hasErrorFor('subCounty') ? 'has-danger' : ''}`}>
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
                                                            </div>
                                                            <div className='row'>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div className={`form-group ${this.hasErrorFor('village') ? 'has-danger' : ''}`}>
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
                                                                </div>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div className={`form-group ${this.hasErrorFor('plotNo') ? 'has-danger' : ''}`}>
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
                                                        </div>
                                                        <label htmlFor='contact'>Contact Information</label>
                                                        <div className='container'>
                                                            <div className='row'>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div className={`form-group ${this.hasErrorFor('tel') ? 'has-danger' : ''}`}>
                                                                        <input
                                                                            id='tel'
                                                                            type='tel'
                                                                            size={10}
                                                                            maxLength={10}
                                                                            className={`form-control ${this.hasErrorFor('tel') ? 'is-invalid' : ''}`}
                                                                            name='tel'
                                                                            placeholder='Telephone i.e 0701753951'
                                                                            required
                                                                            value={this.state.partTwo.tel}
                                                                            onChange={this.handleFieldChange.bind(this, 'p2')}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div className={`form-group ${this.hasErrorFor('name') ? 'has-danger' : ''}`}>
                                                                        <input
                                                                            id='email'
                                                                            type='email'
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
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partThree">
                                                <div className='card pb-3'>
                                                    <div className='card-header bg-primary text-white'>{this.state.partThree.title}</div>
                                                    <div className='col-md-12 py-3'>
                                                        <label htmlFor='contact'>Victim Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </label>
                                                        <div className='float-right display-inline' style={{ textAlign: 'right' }}>
                                                            <Input
                                                                id='sameAsComplainant'
                                                                name='sameAsComplainant'
                                                                type='checkbox'
                                                                value={this.state.partThree.sAC}
                                                                onChange={this.handleInvolved.bind(this, 'p3')}
                                                            /> Same as Complainant
                                                        </div>
                                                        <div className='row' id='vicDet'>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className={`form-group ${this.hasErrorFor('victimName') ? 'has-danger' : ''}`}>
                                                                    <input
                                                                        id='victimName'
                                                                        type='text'
                                                                        className={`form-control ${this.hasErrorFor('victimName') ? 'is-invalid' : ''}`}
                                                                        name='victimName'
                                                                        placeholder="Victim's Name"
                                                                        required
                                                                        value={this.state.partThree.involved.victimName}
                                                                        onChange={this.handleInvolved}
                                                                    />
                                                                    {this.renderErrorFor('victimName')}
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6 col-sm-12'>
                                                                <div className='row'>
                                                                    <div className="col-md-6 col-sm-12">
                                                                        <div className={`form-group ${this.hasErrorFor('victimAge') ? 'has-danger' : ''}`}>
                                                                            <input
                                                                                id='victimAge'
                                                                                type='text'
                                                                                className={`form-control ${this.hasErrorFor('victimAge') ? 'is-invalid' : ''}`}
                                                                                name='victimAge'
                                                                                placeholder='Victim`s Age'
                                                                                value={this.state.partThree.involved.victimAge}
                                                                                onChange={this.handleInvolved}
                                                                            />
                                                                            {this.renderErrorFor('victimAge')}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6 col-sm-12">
                                                                        <div className={`form-group ${this.hasErrorFor('victimGender') ? 'has-danger' : ''}`} defaultValue="Victim's Gender">
                                                                            <select id='gender' name='victimGender' className={`form-control ${this.hasErrorFor('victimGender') ? 'is-invalid' : ''}`} placeholder='Victim Gender' value={this.state.partThree.involved.gender} onChange={this.handleInvolved}>
                                                                                <option name='default' value='default'>Victim's Gender</option>
                                                                                <option name='gender' value='Male'>Male</option>
                                                                                <option name='gender' value='Female'>Female</option>
                                                                            </select>
                                                                            {this.renderErrorFor('victimGender')}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`form-group ${this.hasErrorFor('statement') ? 'has-danger' : ''}`}>
                                                            <label htmlFor='statement'>Statement of what happened</label>
                                                            <textarea
                                                                id='statement'
                                                                className={`form-control ${this.hasErrorFor('statement') ? 'is-invalid' : ''}`}
                                                                name='statement'
                                                                placeholder='Explain in your own words what happened'
                                                                rows='5'
                                                                value={this.state.partThree.statement}
                                                                onChange={this.handleFieldChange.bind(this, 'p3')}
                                                            />
                                                            {this.renderErrorFor('statement')}
                                                        </div>
                                                        <div className='form-group' style={{ marginBottom: .5 + 'rem' }}>
                                                            <label htmlFor='period'>When it happened</label>
                                                            <div className='row'>
                                                                <div className="col-md-6">
                                                                    <div className={`form-group ${this.hasErrorFor('period') ? 'has-danger' : ''}`}>
                                                                        <select id='selPeriod' className={`form-control ${this.hasErrorFor('period') ? 'is-invalid' : ''}`} placeholder='Victim Gender' name='period' value={this.state.tabSel} onChange={this.handleSel}>
                                                                            <option name='default' value='default' data-toggle='default'>Select when it happened</option>
                                                                            <option name='date' value='dateTab' data-toggle='dateTab'>Date</option>
                                                                            <option name='time' id='time' value='timeTab' data-toggle='timeTab'>Time</option>
                                                                            <option name='year' id='year' value='yearTab' data-toggle='yearTab'>Year</option>
                                                                        </select>
                                                                        {this.renderErrorFor('period')}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className={`form-group ${this.hasErrorFor('period') ? 'has-danger' : ''} ${this.state.tab.dateTab ? 'd-block' : 'd-none'}`}>
                                                                        <div className="input-group input-group-alternative">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                                            </div>
                                                                            <input className="form-control datepicker" name='period' placeholder="Select date" type="text" value={this.state.partThree.period} onBlur={this.handleDate} onChange={this.handleDate} />
                                                                        </div>
                                                                        {this.renderErrorFor('period')}
                                                                    </div>
                                                                    <div className={`form-group ${this.hasErrorFor('period') ? 'has-danger' : ''} ${this.state.tab.timeTab ? 'd-block' : 'd-none'}`}>
                                                                        <div className="input-group input-group-alternative">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text"><i className="ni ni-watch-time"></i></span>
                                                                            </div>
                                                                            <input className="form-control datetimepicker" name='period' placeholder="Please input time (HH:MM)" type="text" value={this.state.partThree.period} onBlur={this.handleDate} onChange={this.handleDate} />
                                                                        </div>
                                                                        {this.renderErrorFor('period')}
                                                                    </div>
                                                                    <div className={`form-group ${this.hasErrorFor('period') ? 'has-danger' : ''} ${this.state.tab.yearTab ? 'd-block' : 'd-none'}`}>
                                                                        <div className="input-group input-group-alternative">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text"><i className="ni ni-watch-time"></i></span>
                                                                            </div>
                                                                            <select id='selPeriodYear' period='' className={`form-control`} placeholder='Victim Gender' value={this.state.partThree.period} onChange={this.handleDate}>
                                                                                <option name='default' value='default' data-toggle='default'>Select year it happened</option>
                                                                                <option name='2020' value={2020} >2020</option>
                                                                                <option name='2019' value={2019} >2019</option>
                                                                                <option name='2018' value={2018} >2018</option>
                                                                                <option name='2017' value={2017} >2017</option>
                                                                                <option name='2016' value={2016} >2016</option>
                                                                                <option name='2015' value={2015} >2015</option>
                                                                                <option name='2014' value={2014} >2014</option>
                                                                                <option name='2013' value={2013} >2013</option>
                                                                                <option name='2012' value={2012} >2012</option>
                                                                                <option name='2011' value={2011} >2011</option>
                                                                                <option name='2010' value={2010} >2010</option>
                                                                            </select>
                                                                        </div>
                                                                        {this.renderErrorFor('period')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <label htmlFor='location'>Where crime happened</label>
                                                        <FormGroup className={`${this.hasErrorFor('location') ? 'has-danger' : ''}`}>
                                                            {this.state.isLoading ? <></> : <this.cities />}
                                                            {this.renderErrorFor('location')}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Row>
                                                                <Col className='col-md-4 col-sm-6 col-6'>
                                                                    <Label htmlFor='dI'>Was there any damage or injury?</Label>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='dI'
                                                                        id='yes'
                                                                        value={true}
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'dI')}
                                                                    />
                                                                    <FormText> Yes</FormText>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='dI'
                                                                        id='no'
                                                                        value={false}
                                                                        defaultChecked
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'dI')}
                                                                    />
                                                                    <FormText> No</FormText>
                                                                </Col>
                                                                <Col className='col-md-6 col-sm-12 col-12'>
                                                                    <FormGroup className={` ${this.state.partThree.dI ? 'd-block' : 'd-none'}`}>
                                                                        <textarea
                                                                            rows='5'
                                                                            id='dIDescription'
                                                                            name='dIDescription'
                                                                            placeholder='Describe the injury as much as possible'
                                                                            value={this.state.partThree.dIDescription}
                                                                            onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                            className={`form-control ${this.hasErrorFor('dIDescription')}`}
                                                                        ></textarea>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            {this.renderErrorFor('dI')}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Row>
                                                                <Col className='col-md-4 col-sm-6 col-6'>
                                                                    <Label htmlFor='witness'>Were there any witnesses?</Label>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='witness'
                                                                        id='yesWitness'
                                                                        value={true}
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'wit')}
                                                                    />
                                                                    <FormText> Yes</FormText>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='witness'
                                                                        id='noWitness'
                                                                        value={false}
                                                                        defaultChecked
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'wit')}
                                                                    />
                                                                    <FormText> No</FormText>
                                                                </Col>
                                                            </Row>
                                                            {this.renderErrorFor('witness')}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Row>
                                                                <Col className='col-md-4 col-sm-6 col-6'>
                                                                    <Label htmlFor='medExam'>Were examined by a Medical Officer?</Label>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='medExam'
                                                                        id='yesmedExam'
                                                                        value={true}
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'medExam')}
                                                                    />
                                                                    <FormText> Yes</FormText>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='medExam'
                                                                        id='nomedExam'
                                                                        value={false}
                                                                        defaultChecked
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'medExam')}
                                                                    />
                                                                    <FormText> No</FormText>
                                                                </Col>
                                                            </Row>
                                                            {this.renderErrorFor('medExam')}
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Row>
                                                                <Col className='col-md-4 col-sm-6 col-6'>
                                                                    <Label htmlFor='reported'>Have you reported incident to any police station?</Label>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='reported'
                                                                        id='yesReported'
                                                                        value={true}
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'rep')}
                                                                    />
                                                                    <FormText> Yes</FormText>
                                                                </Col>
                                                                <Col className='col-md-1 col-sm-2 col-2'>
                                                                    <Input
                                                                        type='radio'
                                                                        name='reported'
                                                                        id='noReported'
                                                                        value={false}
                                                                        defaultChecked
                                                                        onChange={this.handleCheckBox.bind(this, 'p3', 'rep')}
                                                                    />
                                                                    <FormText> No</FormText>
                                                                </Col>
                                                                <Col className='col-md-6 col-sm-12 col-12'>
                                                                    <FormGroup className={` ${this.state.partThree.reported ? 'd-block' : 'd-none'}`}>
                                                                        <Input
                                                                            id='reportRef'
                                                                            type='text'
                                                                            name='reportRef'
                                                                            placeholder='Reference provided at police station'
                                                                            value={this.state.partThree.reportRef}
                                                                            onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                            className={`form-control ${this.hasErrorFor('reportRef') ? 'invalid' : ''}`}
                                                                        />
                                                                        {this.renderErrorFor('reportRef')}
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button id='prev' type="button" className="btn btn-default float-left" onClick={this.handleNav.bind(this, 'p2', 'prev')}><i className='ni ni-bold-left'></i></button>
                                                        <button id='next' type="button" className="btn btn-default float-right" onClick={this.handleNav.bind(this, 'p4', 'next')}><i className='ni ni-bold-right'></i></button>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset className="tab-pane fade" id="partFour">
                                                <Card className='pb-3'>
                                                    <CardHeader className='bg-primary text-white'>{this.state.partFour.title}</CardHeader>
                                                    <div className='col-md-12 py-3'>
                                                        <FormGroup className={`${this.hasErrorFor('officerName') ? 'has-danger' : ''}`}>
                                                            <input id='name'
                                                                className={`form-control ${this.hasErrorFor('officerName') ? 'is-invalid' : ''}`}
                                                                name='officerName'
                                                                placeholder='Offending Officers Name/s'
                                                                required
                                                                value={this.state.partFour.name}
                                                                onChange={this.handleFieldChange.bind(this, 'p4')}
                                                            />
                                                            {this.renderErrorFor('officerName')}
                                                        </FormGroup>
                                                        <FormGroup className={`${this.hasErrorFor('officerRank') ? 'has-danger' : ''}`}>
                                                            <input id='rank'
                                                                className={`form-control ${this.hasErrorFor('officerRank') ? 'is-invalid' : ''}`}
                                                                name='officerRank'
                                                                placeholder='Offending Officers Rank / Description'
                                                                value={this.state.partFour.rank}
                                                                onChange={this.handleFieldChange.bind(this, 'p4')}
                                                            />
                                                            {this.renderErrorFor('officerRank')}
                                                        </FormGroup>
                                                        <FormGroup className={`${this.hasErrorFor('otherId') ? 'has-danger' : ''}`}>
                                                            <textarea id='id'
                                                                className={`form-control ${this.hasErrorFor('otherId') ? 'is-invalid' : ''}`}
                                                                name='otherId'
                                                                placeholder='Any unique features describing the Officer(Colour of Uniform, Name tag, budge number, any unique 		
                                                                    physical features, etc)'
                                                                rows='5'
                                                                value={this.state.partFour.id}
                                                                onChange={this.handleFieldChange.bind(this, 'p4')}
                                                            ></textarea>
                                                        </FormGroup>
                                                        <FormGroup className={`${this.hasErrorFor('detUnit') ? 'has-danger' : ''}`}>
                                                            <textarea id='detUnit'
                                                                className={`form-control ${this.hasErrorFor('detUnit') ? 'is-invalid' : ''}`}
                                                                name='detUnit'
                                                                placeholder='Details of Unit where Officer is attached if known'
                                                                rows='5'
                                                                value={this.state.partFour.detUnit}
                                                                onChange={this.handleFieldChange.bind(this, 'p4')}
                                                            ></textarea>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <button id='prev' type="button" className="btn btn-default float-left" onClick={this.handleNav.bind(this, 'p3', 'prev')}><i className='ni ni-bold-left'></i></button>
                                                        <button disabled={this.state.isSubmitting} className="btn btn-primary btn-round float-right" type='submit' onClick={this.handleNav.bind(this, 'done', 'next')}>
                                                            <i className="ni ni-send"></i> {this.state.isSubmitting ? "Submitting Complaint " + <i className='fa fa-spinner'></i> : "Submit Complaint"}
                                                        </button>
                                                    </div>
                                                </Card>
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
