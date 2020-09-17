import axios from 'axios'
import React, {Component} from 'react'
import {v4} from 'uuid';
import {
    FormGroup, FormText,
    Input, Label,
    Row, Col,
    Card, CardHeader, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap'

import GuestNavbar from './Navbars/GuestNavbar';
import ReactDatetime from 'react-datetime';
import moment from 'moment'

const today = moment()
const disableFutureDt = current => {
    return current.isBefore(today)
}

class PoliceForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isSubmitting: false,
            cR: '',
            cD: '',
            cC: '',
            cR3: '',
            cD3: '',
            cC3: '',
            isLoading: true,
            cityData: [],
            oData: [],
            cData: [],
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
                    region: '',
                    county: ''
                }),
                tel: '',
                email: ''

            },
            partThree: {
                title: 'DETAILS ABOUT THE COMPLAINT',
                offenseType: '',
                involved: new Object({
                    victimName: '',
                    victimAge: '',
                    victimGender: ''
                }),
                sameAsComplainant: false,
                statement: '',
                period: 'default',
                location: new Object({
                    village: '',
                    subCounty: '',
                    district: '',
                    region: '',
                    county: ''
                }),
                dI: false,
                dIDescription: '',
                witness: false,
                witnessName: "",
                witnessContact: "",
                medExam: false,
                medExamRef: '',
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
            errors: {},
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
        this.handleLocation = this.handleLocation.bind(this)
        this.handlePill = this.handlePill.bind(this)
        this.isVisible = this.isVisible.bind(this)
        this.cities = this.cities.bind(this)
        this.getRegions = this.getRegions.bind(this)
        this.getDistricts = this.getDistricts.bind(this)
        this.getCounties = this.getCounties.bind(this)
        this.getSubCounties = this.getSubCounties.bind(this)
        this.getRegions3 = this.getRegions.bind(this)
        this.getDistricts3 = this.getDistricts.bind(this)
        this.getCounties3 = this.getCounties.bind(this)
        this.getSubCounties3 = this.getSubCounties.bind(this)
        this.getRanks = this.getRanks.bind(this)
        this.getCompTypes = this.getCompTypes.bind(this)
        this.showReferenceNumber = this.showReferenceNumber.bind(this)
    }

    componentDidMount() {
        this.getCities()
        this.getRanks()
        const params = new URLSearchParams(window.location.search)
        if (params.has('prev')) {
            this.setState({
                prev: params.get('prev')
            })
        }

        axios.get('/api/cat').then(response => {
            const data = response.data
            let RANKS = []
            data.forEach(oT => {
                for (const key in oT) {
                    if (oT.hasOwnProperty(key)) {
                        const category = oT[key];
                        if (key == 'name')
                            RANKS.push(category)
                    }
                }
            });
            this.setState({
                oData: RANKS
            })
        });
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

    handleSubmit(event) {
        console.log("submit")
        this.setState(prevState => ({
            isSubmitting: true,
            progress: {
                ...prevState.progress,
                p4: true
            }
        }))
        event.preventDefault()

        if (this.state.progress.p1 && this.state.progress.p2 && this.state.progress.p3) {

            const form = {
                'refNo': this.state.refNo,
                'date': this.state.date,
                'compName': this.state.partTwo.name,
                'compAge': this.state.partTwo.age,
                'compEmail': this.state.partTwo.email,
                'compGender': this.state.partTwo.gender,
                'compTel': this.state.partTwo.tel,
                'compDist': this.state.partTwo.residence.district,
                'compRegion': this.state.partTwo.residence.region,
                'compCounty': this.state.partTwo.residence.county,
                'compsubCounty': this.state.partTwo.residence.subCounty,
                'compVillage': this.state.partTwo.residence.village,
                'offenseType': this.state.partThree.offenseType,
                'dI': this.state.partThree.dI,
                'dIDescription': this.state.partThree.dIDescription == '' ? "No Injury" : this.state.partThree.dIDescription,
                'cDist': this.state.partThree.location.district,
                'cRegion': this.state.partThree.location.region,
                'cCounty': this.state.partThree.location.county,
                'csubCounty': this.state.partThree.location.subCounty,
                'cVillage': this.state.partThree.location.village,
                'medExam': this.state.partThree.medExam,
                'medExamRef': this.state.partThree.medExamRef == '' ? "No Medical Exam" : this.state.partThree.medExamRef,
                'period': this.state.partThree.period,
                'reportRef': this.state.partThree.reportRef == '' ? "Not report" : this.state.partThree.reportRef,
                'reported': this.state.partThree.reported,
                'statement': this.state.partThree.statement,
                'witness': this.state.partThree.witness,
                'witnessName': this.state.partThree.witness ? this.state.partThree.witnessName : "N/A",
                'witnessContact': this.state.partThree.witness ? this.state.partThree.witnessContact : "N/A",
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
                    this.showReferenceNumber()
                })
                .catch(error => {
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
        let errors = {}
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
                                if (key != 11) {
                                    if (key != 12) {
                                        if (key == 2 || key == 3) {
                                            if (element.checked && fieldset.elements[key == 2 ? 3 : 2].checked) {
                                                if (!errors['gender']) {
                                                    errors.length += 1
                                                    errors['gender'] = 'Please select in the neccessary gender'
                                                }
                                            } else if ((!element.checked && !fieldset.elements[key == 2 ? 3 : 2].checked)) {
                                                if (!errors['gender']) {
                                                    errors.length += 1
                                                    errors['gender'] = ['Please select in the neccessary gender']
                                                }
                                            }
                                        } else {
                                            if (element.value == '' || element.value == 'default') {
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
                        // console.log(fieldset.elements)
                        for (const key in fieldset.elements) {
                            if (fieldset.elements.hasOwnProperty(key)) {
                                const element = fieldset.elements[key];
                                if (key != 24 || key != 25)
                                    if (key == 3 || key == 5 || key == 8) { /* Selecting and handling select errors */
                                        if (element.value == 'default' && key != 8) {
                                            if (element.name != "") {
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
                                                let repElem = $('textarea#reportRef').get(0)
                                                if (repElem.value == '') {
                                                    errors[repElem.name] = ['Please enter data']
                                                    errors.length += 1
                                                }
                                            }
                                        } else if (element.name == "medExam") {
                                            if ($("#yesmedExam").get(0).checked) {
                                                if (document.getElementsByName('medExamRef')[0].value == '') {
                                                    errors["medExamRef"] = ['Please enter data']
                                                    errors.length += 1
                                                }
                                            }
                                        } else if(element.name == "witness") {
                                            if ($("#yesWitness").get(0).checked) {
                                                if($('[name=witnessName]').val() == '') {
                                                    errors['witnessName'] = ['Please enter data']
                                                }
                                                if($('[name=witnessContact]').val() == '') {
                                                    errors['witnessContact'] = ['Please enter data']
                                                }
                                            }
                                        }
                                    } else {
                                        if (element.value == '' && element.name != "" && element.name != "witnessName" && element.name != "witnessContact" && element.name != "sameAsComplainant" && element.name != "period" && element.name != "dIDescription" && element.name != "reportRef" && key != 21 && element.name != "medExamRef") {
                                            errors[element.name] = ['Please fill the field']
                                            errors.length += 1
                                        }
                                    }
                            }
                        }
                    }
                    break
                case 'done':
                    console.log("Submit")
                    $('#form105').submit()
                    console.log("Submit1")
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
                    case 'medExam':
                        this.setState(prevState => ({
                            partThree: {
                                ...prevState.partThree,
                                medExam: data == 'true' ? true : false
                            }
                        }))
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
        let date = event._d.toDateString()
        if (date != '') {
            this.setState(prevState => ({
                partThree: {
                    ...prevState.partThree,
                    period: date
                }
            }))
        } else {
            event.target.value = this.state.partThree.period
        }
    }

    // For nested state objects
    handleInvolved(e) {
        if (event.target.name == 'sameAsComplainant')
            if (event.target.checked) {
                this.setState(prevState => ({
                    partThree: {
                        ...prevState.partThree,
                        involved: new Object({
                            victimName: this.state.partTwo.name,
                            victimAge: this.state.partTwo.age,
                            victimGender: this.state.partTwo.gender,
                            sameAsComplainant: event.target.checked
                        })
                    }
                }))
                $('select[name=victimGender] option[value=' + this.state.partTwo.gender + ']').attr('selected', 'selected')
                $('div#vicDet').css({
                    display: 'none'
                })
            } else {
                this.setState(prevState => ({
                    partThree: {
                        ...prevState.partThree,
                        involved: new Object({
                            victimName: '',
                            victimAge: '',
                            victimGender: '',
                            sameAsComplainant: event.target.checked
                        })
                    }
                }))
                $('select[name=victimGender] option[value=default]').attr('selected', 'selected')
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
        if (event.target.name == 'region') {
            this.setState({
                cD: '',
                cC: '',
                cR: event.target.value
            })
            this.setState(prevState => ({
                partTwo: {
                    ...prevState.partTwo,
                    residence: {
                        ...prevState.partTwo.residence,
                        district: '',
                        subCounty: '',
                        county: '',
                        [event.target.name]: event.target.value
                    }
                }
            }))
        } else if (event.target.name == 'district') {
            this.setState({
                cD: event.target.value,
                cC: '',
            })
            this.setState(prevState => ({
                partTwo: {
                    ...prevState.partTwo,
                    residence: {
                        ...prevState.partTwo.residence,
                        subCounty: '',
                        county: '',
                        [event.target.name]: event.target.value
                    }
                }
            }))
        } else if (event.target.name == 'county') {
            this.setState({
                cC: event.target.value
            })
            this.setState(prevState => ({
                partTwo: {
                    ...prevState.partTwo,
                    residence: {
                        ...prevState.partTwo.residence,
                        subCounty: '',
                        [event.target.name]: event.target.value
                    }
                }
            }))
        }
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

    handleLocation() {
        if (event.target.name == 'region') {
            this.setState({
                cD: '',
                cC: '',
                cR: event.target.value
            })
            this.setState(prevState => ({
                partThree: {
                    ...prevState.partThree,
                    location: {
                        ...prevState.partThree.location,
                        district: '',
                        subCounty: '',
                        county: '',
                        [event.target.name]: event.target.value
                    }
                }
            }))
        } else if (event.target.name == 'district') {
            this.setState({
                cC: '',
                cD: event.target.value
            })
            this.setState(prevState => ({
                partThree: {
                    ...prevState.partThree,
                    location: {
                        ...prevState.partThree.location,
                        subCounty: '',
                        county: '',
                        [event.target.name]: event.target.value
                    }
                }
            }))
        } else if (event.target.name == 'county') {
            this.setState({
                cC: event.target.value
            })
            this.setState(prevState => ({
                partThree: {
                    ...prevState.partThree,
                    location: {
                        ...prevState.partThree.location,
                        subCounty: '',
                        [event.target.name]: event.target.value
                    }
                }
            }))
        }
        this.setState(prevState => ({
            partThree: {
                ...prevState.partThree,
                location: {
                    ...prevState.partThree.location,
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
                cityData: response.data
            })
        })
        axios.get('/compiled_data/ugData.json').then(response => {
            this.setState({
                cData: response.data
            })
        })
    }

    cities() {
        return (
            <div className={`form-group ${this.hasErrorFor('location') ? 'has-danger' : ''}`}
                 defaultValue="Victim's Gender">
                <select id='location' name='location'
                        className={`form-control ${this.hasErrorFor('location') ? 'is-invalid' : ''}`}
                        placeholder='default' value={this.state.partThree.location}
                        onChange={this.handleFieldChange.bind(this, 'p3')}>
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

    getRegions() {
        let reg = []
        let k = 0
        Object.keys(this.state.cData).forEach(region => {
            reg[k] = <option key={region} value={region}>{region}</option>
            k += 1
        })
        return reg
    }

    getCounties() {
        let cou = []
        let k = 0
        if (this.state.cR != '' && this.state.cD != '') {
            Object.keys(this.state.cData[this.state.cR][this.state.cD]).forEach(county => {
                cou[k] = <option key={county} value={county}>{county}</option>
                k += 1
            })
            return cou
        }
    }

    getSubCounties() {
        let cou = []
        let k = 0
        if (this.state.cR != '' && this.state.cD != '' && this.state.cC != '') {
            Object.keys(this.state.cData[this.state.cR][this.state.cD][this.state.cC]).forEach(index => {
                let county = this.state.cData[this.state.cR][this.state.cD][this.state.cC][index]
                cou[k] = <option key={county} value={county}>{county}</option>
                k += 1
            })
            return cou
        }
    }

    getDistricts() {
        let dis = []
        let k = 0
        if (this.state.cR !== '') {
            Object.keys(this.state.cData[this.state.cR]).forEach(district => {
                dis[k] = <option key={district} value={district}>{district}</option>
                k += 1
            })
            return dis
        }
    }

    getRegions3() {
        let reg = []
        let k = 0
        Object.keys(this.state.cData).forEach(region => {
            reg[k] = <option key={region} value={region}>{region}</option>
            k += 1
        })
        return reg
    }

    getCounties3() {
        let cou = []
        let k = 0
        if (this.state.cR3 != '' && this.state.cD3 != '') {
            Object.keys(this.state.cData[this.state.cR3][this.state.cD3]).forEach(county => {
                cou[k] = <option key={county} value={county}>{county}</option>
                k += 1
            })
            return cou
        }
    }

    getSubCounties3() {
        let cou = []
        let k = 0
        if (this.state.cR3 != '' && this.state.cD3 != '' && this.state.cC3 != '') {
            Object.keys(this.state.cData[this.state.cR3][this.state.cD3][this.state.cC3]).forEach(index => {
                let county = this.state.cData[this.state.cR3][this.state.cD3][this.state.cC3][index]
                cou[k] = <option key={county} value={county}>{county}</option>
                k += 1
            })
            return cou
        }
    }

    getDistricts3() {
        let dis = []
        let k = 0
        if (this.state.cR3 != '') {
            Object.keys(this.state.cData[this.state.cR3]).forEach(district => {
                dis[k] = <option key={district} value={district}>{district}</option>
                k += 1
            })
            return dis
        }
    }

    getCompTypes() {
        let RANKS = this.state.oData

        let ranks = []
        ranks.push(<option key={99999} name={"default"} value={"default"}>Select Offense Type</option>)
        RANKS.forEach((compType, i) => {
            ranks.push(
                <option key={i} name={compType} value={compType}>{compType}</option>
            )
        });
        return ranks
    }

    getRanks() {
        let RANKS = {
            'IGP': 'Inspector General of Police',
            'DIGP': 'Deputy Inspector General of Police',
            'AIGP': 'Assistant Inspector General of Police',
            'SCP': 'Senior Commissioner of Police',
            'CP': 'Commissioner of Police',
            'ACP': 'Assistant Commissioner of Police',
            'SSP': 'Senior Superintendent of Police',
            'SP': 'Superintendent of Police',
            'ASP': 'Assistant Superintedent of Police',
            'IP': 'Inspector of Police',
            'AIP': 'Assistant Inspector of Police',
            'SGT': 'Sergeant',
            'CPL': 'Corporal',
            'PC': 'Police Constable',
            'SPC': 'Special Police Constable'
        }
        let ranks = []
        for (const key in RANKS) {
            if (RANKS.hasOwnProperty(key)) {
                const rank = RANKS[key];
                ranks.push(
                    <option key={key} name={key} value={key}>{rank}</option>
                )
            }
        }
        return ranks
    }

    showReferenceNumber() {
        const {history} = this.props
        $('finCopy').on('click', _ => {
            $("[href='/dashboard/index']")[0].click()
            $("[href='/dashboard/index']")[0].click()
        })
        $('#getRef').click()
    }

    render() {
        return (
            <>
                {this.state.error}
                {this.state.prev == 'guest' ? <GuestNavbar/> : null}
                <div className={`container py-1 ${this.state.prev == 'dashboard' ? "pt-6" : ""}`}>
                    <div className='row justify-content-center'>
                        <div className='col-md-12'>
                            <div className='card'>
                                <div className='col-md-12 text-center pt-3'>
                                    <img className='rounded mx-auto d-block' src='/static/images/formLogo.png'
                                         style={{width: 120 + 'px', height: 129 + 'px'}}/>
                                </div>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-12 mx-auto'>
                                            <div className='float-right'>Date: {this.state.date.toDateString()}</div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-12 mx-auto'>
                                            <div className='float-right'>Ref: {this.state.refNo.split('-')[4]}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card-header text-center'>COMPLAINT/S AGAINST A POLICE OFFICER [POLICE
                                    FORM 105]
                                </div>
                                <div className="col-md-12 py-3 bg-secondary">
                                    <ul className="nav nav-pills nav-pills-circle mb-3" id="tabs_3" role="tablist">
                                        <li className="nav-item">
                                            <a className={`nav-link rounded-circle ${this.state.active.p1 ? 'active' : ''}`}
                                               onClick={this.handlePill.bind(this, 'p1')} id="first-tab"
                                               data-toggle="tab" href="#partOne" role="tab" aria-selected="true">
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
                                            <a className={`nav-link rounded-circle ${this.state.active.p2 ? 'active' : ''}`}
                                               onClick={this.handlePill.bind(this, 'p2')} id="second-tab"
                                               data-toggle="tab" href="#partTwo" role="tab" aria-selected="false">
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
                                            <a className={`nav-link rounded-circle ${this.state.active.p3 ? 'active' : ''}`}
                                               onClick={this.handlePill.bind(this, 'p3')} id="third-tab"
                                               data-toggle="tab" href="#partThree" role="tab" aria-selected="false">
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
                                            <a className={`nav-link rounded-circle ${this.state.active.p4 ? 'active' : ''}`}
                                               onClick={this.handlePill.bind(this, 'p4')} id="fourth-tab"
                                               data-toggle="tab" href="#partFour" role="tab" aria-selected="false">
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
                                            <div className="tab-content tab-space p-3"
                                                 style={{backgroundColor: '#e9ecef'}}>
                                                <fieldset className='tab-pane fade active show' id='partOne'>
                                                    <div className='card pb-3'>
                                                        <div
                                                            className='card-header bg-primary text-white'>{this.state.partOne.title}</div>
                                                        <div className='col-md-12 py-3'>
                                                            <p className="description">
                                                                This form is for lodging complaint/s against a police
                                                                officer on cases of violation of human rights
                                                                and unporofessional conduct under section 70 of the
                                                                Police Act 303, which provides for complaints by
                                                                the public against police officers. A person is
                                                                entitled, without prejudice to any other legal means
                                                                of redress available to him or her, to make a written
                                                                complaint as to - (a) an instance of bribery,
                                                                corruption, oppression or intimidation by a police
                                                                officer; (b) any neglect or non perfomance of his
                                                                or her duties by a police officer; (c) any other
                                                                misconduct by a police officer.
                                                            </p>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <button id='next' type="button"
                                                                    className="btn btn-default float-right"
                                                                    onClick={this.handleNav.bind(this, 'p2')}><i
                                                                className='ni ni-bold-right'></i></button>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="tab-pane fade" id="partTwo">
                                                    <div className='card pb-3'>
                                                        <div
                                                            className='card-header bg-primary text-white'>{this.state.partTwo.title}</div>
                                                        <div className='col-md-12 py-3'>
                                                            <div
                                                                className={`form-group ${this.hasErrorFor('name') ? 'has-danger' : ''}`}>
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
                                                            <div
                                                                className={`form-group ${this.hasErrorFor('age') ? 'has-danger' : ''}`}>
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
                                                                            <input
                                                                                className="custom-control-input gender-sel"
                                                                                id="Male" type="checkbox"
                                                                                onChange={this.handleCheckBox.bind(this, 'p2')}/>
                                                                            <label className="custom-control-label"
                                                                                   htmlFor="Male">Male</label>
                                                                        </div>
                                                                        &nbsp;
                                                                        <div
                                                                            className="custom-control custom-checkbox mb-3">
                                                                            <input
                                                                                className="custom-control-input gender-sel"
                                                                                id="Female" type="checkbox"
                                                                                onChange={this.handleCheckBox.bind(this, 'p2')}/>
                                                                            <label className="custom-control-label"
                                                                                   htmlFor="Female">Female</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {this.renderErrorFor('gender')}
                                                            </div>
                                                            <label htmlFor='residence'>Place of Residence</label>
                                                            <div className='container text-center'>
                                                                <div className='row'>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('region') ? 'has-danger' : ''}`}>
                                                                            <select id='region' name='region'
                                                                                    className={`form-control ${this.hasErrorFor('region') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partTwo.residence.region}
                                                                                    onChange={this.handleResidence}>
                                                                                <option name='default'
                                                                                        value='default'>Select Region
                                                                                </option>
                                                                                {this.getRegions()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('district') ? 'has-danger' : ''}`}>
                                                                            <select id='district' name='district'
                                                                                    className={`form-control ${this.hasErrorFor('district') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partTwo.residence.district}
                                                                                    onChange={this.handleResidence}>
                                                                                <option name='default'
                                                                                        value='default'>{this.state.cR == '' ? "Select a Region first!" : "Select District"}</option>
                                                                                {this.getDistricts()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('county') ? 'has-danger' : ''}`}>
                                                                            <select id='county' name='county'
                                                                                    className={`form-control ${this.hasErrorFor('county') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partTwo.residence.county}
                                                                                    onChange={this.handleResidence}>
                                                                                <option name='default'
                                                                                        value='default'>{this.state.cD == '' ? "Select a District first!" : "Select a County"}</option>
                                                                                {this.getCounties()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('subCounty') ? 'has-danger' : ''}`}>
                                                                            <select id='subCounty' name='subCounty'
                                                                                    className={`form-control ${this.hasErrorFor('subCounty') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partTwo.residence.subCounty}
                                                                                    onChange={this.handleResidence}>
                                                                                <option name='default'
                                                                                        value='default'>{this.state.cC == '' ? "Select a County first!" : "Select a Sub-county"}</option>
                                                                                {this.getSubCounties()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Row>
                                                                    <div className='col-md-12 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('village') ? 'has-danger' : ''}`}>
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
                                                                </Row>
                                                            </div>
                                                            <label htmlFor='contact'>Contact Information</label>
                                                            <div className='container'>
                                                                <div className='row'>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('tel') ? 'has-danger' : ''}`}>
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
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('name') ? 'has-danger' : ''}`}>
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
                                                            <button id='prev' type="button"
                                                                    className="btn btn-default float-left"
                                                                    onClick={this.handleNav.bind(this, 'p1', 'prev')}><i
                                                                className='ni ni-bold-left'></i></button>
                                                            <button id='next' type="button"
                                                                    className="btn btn-default float-right"
                                                                    onClick={this.handleNav.bind(this, 'p3', 'next')}><i
                                                                className='ni ni-bold-right'></i></button>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="tab-pane fade" id="partThree">
                                                    <div className='card pb-3'>
                                                        <div
                                                            className='card-header bg-primary text-white'>{this.state.partThree.title}</div>
                                                        <div className='col-md-12 py-3'>
                                                            <Row>
                                                                <label className='col-12 col-sm-6' htmlFor='contact'>Victim
                                                                    Details &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                </label>
                                                                <div className='col-12 col-sm-6'
                                                                     style={{textAlign: 'right'}}>
                                                                    <Input
                                                                        id='sameAsComplainant'
                                                                        name='sameAsComplainant'
                                                                        type='checkbox'
                                                                        value={this.state.partThree.sAC}
                                                                        onChange={this.handleInvolved.bind(this, 'p3')}
                                                                    /> Same as Complainant
                                                                </div>
                                                            </Row>
                                                            <div className='row' id='vicDet'>
                                                                <div className='col-md-6 col-sm-12'>
                                                                    <div
                                                                        className={`form-group ${this.hasErrorFor('victimName') ? 'has-danger' : ''}`}>
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
                                                                            <div
                                                                                className={`form-group ${this.hasErrorFor('victimAge') ? 'has-danger' : ''}`}>
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
                                                                            <div
                                                                                className={`form-group ${this.hasErrorFor('victimGender') ? 'has-danger' : ''}`}
                                                                                defaultValue="Victim's Gender">
                                                                                <select id='gender' name='victimGender'
                                                                                        className={`form-control ${this.hasErrorFor('victimGender') ? 'is-invalid' : ''}`}
                                                                                        placeholder='Victim Gender'
                                                                                        value={this.state.partThree.involved.gender}
                                                                                        onChange={this.handleInvolved}>
                                                                                    <option name='default'
                                                                                            value='default'>Victim's
                                                                                        Gender
                                                                                    </option>
                                                                                    <option name='gender'
                                                                                            value='Male'>Male
                                                                                    </option>
                                                                                    <option name='gender'
                                                                                            value='Female'>Female
                                                                                    </option>
                                                                                </select>
                                                                                {this.renderErrorFor('victimGender')}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`form-group ${this.hasErrorFor('offenseType') ? 'has-danger' : ''}`}>
                                                                <label htmlFor='statement'>Offense Type (With random
                                                                    data)</label>
                                                                <select
                                                                    id='offenseType'
                                                                    className={`form-control ${this.hasErrorFor('offenseType') ? 'is-invalid' : ''}`}
                                                                    name='offenseType'
                                                                    value={this.state.partThree.offenseType}
                                                                    onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                >
                                                                    {this.getCompTypes()}
                                                                </select>
                                                                {this.renderErrorFor('offenseType')}
                                                            </div>
                                                            <div
                                                                className={`form-group ${this.hasErrorFor('statement') ? 'has-danger' : ''}`}>
                                                                <label htmlFor='statement'>Statement of what
                                                                    happened</label>
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
                                                            <div className='form-group'
                                                                 style={{marginBottom: .5 + 'rem'}}>
                                                                <label htmlFor='period'>When it happened</label>
                                                                <div className='row'>
                                                                    <div className="col-md-6">
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('period') ? 'has-danger' : ''}`}>
                                                                            <select id='selPeriod'
                                                                                    className={`form-control ${this.hasErrorFor('period') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    name='period'
                                                                                    defaultValue={`default`}>
                                                                                <option name='date' value='default'
                                                                                        data-toggle='dateTab'>Date
                                                                                </option>
                                                                            </select>
                                                                            {this.renderErrorFor('period')}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <FormGroup>
                                                                            <InputGroup
                                                                                className="input-group-alternative">
                                                                                <InputGroupAddon addonType="prepend">
                                                                                    <InputGroupText>
                                                                                        <i className="ni ni-calendar-grid-58"/>
                                                                                    </InputGroupText>
                                                                                </InputGroupAddon>
                                                                                <ReactDatetime
                                                                                    inputProps={{
                                                                                        placeholder: "Pick date here",
                                                                                        name: 'period'
                                                                                    }}
                                                                                    timeFormat={true}
                                                                                    isValidDate={disableFutureDt}
                                                                                    onChange={this.handleDate}
                                                                                />
                                                                            </InputGroup>
                                                                            {this.renderErrorFor('period')}
                                                                        </FormGroup>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <label htmlFor='location'>Where crime happened</label>
                                                            <div className='container text-center'>
                                                                <div className='row'>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('region') ? 'has-danger' : ''}`}>
                                                                            <select id='region' name='region'
                                                                                    className={`form-control ${this.hasErrorFor('region') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partThree.location.region}
                                                                                    onChange={this.handleLocation}>
                                                                                <option name='default'
                                                                                        value='default'>Select Region
                                                                                </option>
                                                                                {this.getRegions()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('district') ? 'has-danger' : ''}`}>
                                                                            <select id='district' name='district'
                                                                                    className={`form-control ${this.hasErrorFor('district') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partThree.location.district}
                                                                                    onChange={this.handleLocation}>
                                                                                <option name='default'
                                                                                        value='default'>{this.state.cR == '' ? "Select a Region first!" : "Select District"}</option>
                                                                                {this.getDistricts()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='row'>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('county') ? 'has-danger' : ''}`}>
                                                                            <select id='county' name='county'
                                                                                    className={`form-control ${this.hasErrorFor('county') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partThree.location.county}
                                                                                    onChange={this.handleLocation}>
                                                                                <option name='default'
                                                                                        value='default'>{this.state.cD == '' ? "Select a District first!" : "Select a County"}</option>
                                                                                {this.getCounties()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-md-6 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('subCounty') ? 'has-danger' : ''}`}>
                                                                            <select id='subCounty' name='subCounty'
                                                                                    className={`form-control ${this.hasErrorFor('subCounty') ? 'is-invalid' : ''}`}
                                                                                    placeholder='Victim Gender'
                                                                                    value={this.state.partThree.location.subCounty}
                                                                                    onChange={this.handleLocation}>
                                                                                <option name='default'
                                                                                        value='default'>{this.state.cC == '' ? "Select a County first!" : "Select a Sub-county"}</option>
                                                                                {this.getSubCounties()}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Row>
                                                                    <div className='col-md-12 col-sm-12'>
                                                                        <div
                                                                            className={`form-group ${this.hasErrorFor('village') ? 'has-danger' : ''}`}>
                                                                            <input
                                                                                id='village'
                                                                                type='text'
                                                                                className={`form-control ${this.hasErrorFor('village') ? 'is-invalid' : ''}`}
                                                                                name='village'
                                                                                placeholder='Village'
                                                                                required
                                                                                value={this.state.partThree.location.village}
                                                                                onChange={this.handleLocation}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </Row>
                                                            </div>
                                                            <FormGroup>
                                                                <Row>
                                                                    <Col className='col-md-4 col-sm-6 col-6'>
                                                                        <Label htmlFor='dI'>Was there any damage or
                                                                            injury?</Label>
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
                                                                        <FormGroup
                                                                            className={` ${this.state.partThree.dI ? 'd-block' : 'd-none'}`}>
                                                                            <textarea
                                                                                rows='5'
                                                                                id='dIDescription'
                                                                                name='dIDescription'
                                                                                placeholder='Describe the injury as much as possible'
                                                                                value={this.state.partThree.dIDescription}
                                                                                onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                                className={`form-control ${this.hasErrorFor('dIDescription')}`}
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                {this.renderErrorFor('dI')}
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Row>
                                                                    <Col className='col-md-4 col-sm-6 col-6'>
                                                                        <Label htmlFor='witness'>Were there any
                                                                            witnesses?</Label>
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
                                                                    <Col
                                                                        className={`col-md-6 col-sm-12 col-12 ${this.state.partThree.witness ? 'd-block' : 'd-none'}`}>
                                                                        <FormGroup
                                                                            className={` ${this.state.partThree.witness ? 'd-block' : 'd-none'}`}>
                                                                            <Input
                                                                                type="text"
                                                                                className={`form-control-sm ${this.hasErrorFor('witnessName') ? 'invalid' : ''}`}
                                                                                name="witnessName"
                                                                                placeholder="Witness Name"
                                                                                value={this.state.partThree.witnessName}
                                                                                onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                            />
                                                                            {this.renderErrorFor('witnessName')}
                                                                            <br/>
                                                                            <Input
                                                                                type="tel"
                                                                                className={`form-control-sm ${this.hasErrorFor('witnessContact') ? 'invalid' : ''}`}
                                                                                name="witnessContact"
                                                                                placeholder="Witness Contact"
                                                                                maxLength={14}
                                                                                value={this.state.partThree.witnessContact}
                                                                                onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                            />
                                                                            {this.renderErrorFor('witnessContact')}
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Row>
                                                                    <Col className='col-md-4 col-sm-6 col-6'>
                                                                        <Label htmlFor='medExam'>Were examined by a
                                                                            Medical Officer?</Label>
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
                                                                    <Col className='col-md-6 col-sm-12 col-12'>
                                                                        <FormGroup
                                                                            className={` ${this.state.partThree.medExam ? 'd-block' : 'd-none'}`}>
                                                                            <textarea
                                                                                rows='3'
                                                                                id='medExamRef'
                                                                                name='medExamRef'
                                                                                placeholder='Provide details about the examination i.e. Medical Unit where conducted e.t.c'
                                                                                value={this.state.partThree.medExamRef}
                                                                                onChange={this.handleFieldChange.bind(this, 'p3')}
                                                                                className={`form-control ${this.hasErrorFor('medExamRef') ? 'invalid' : ''}`}
                                                                            />
                                                                            {this.renderErrorFor('medExamRef')}
                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>

                                                                {this.renderErrorFor('medExam')}
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Row>
                                                                    <Col className='col-md-4 col-sm-6 col-6'>
                                                                        <Label htmlFor='reported'>Have you reported
                                                                            incident to any police station?</Label>
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
                                                                        <FormGroup
                                                                            className={` ${this.state.partThree.reported ? 'd-block' : 'd-none'}`}>
                                                                            <textarea
                                                                                rows='3'
                                                                                id='reportRef'
                                                                                name='reportRef'
                                                                                placeholder='Provide details about the report i.e. Police Station filed and Reference number provided e.t.c'
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
                                                            <button id='prev' type="button"
                                                                    className="btn btn-default float-left"
                                                                    onClick={this.handleNav.bind(this, 'p2', 'prev')}><i
                                                                className='ni ni-bold-left'></i></button>
                                                            <button id='next' type="button"
                                                                    className="btn btn-default float-right"
                                                                    onClick={this.handleNav.bind(this, 'p4', 'next')}><i
                                                                className='ni ni-bold-right'></i></button>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="tab-pane fade" id="partFour">
                                                    <Card className='pb-3'>
                                                        <CardHeader
                                                            className='bg-primary text-white'>{this.state.partFour.title}</CardHeader>
                                                        <div className='col-md-12 py-3'>
                                                            <FormGroup
                                                                className={`${this.hasErrorFor('officerName') ? 'has-danger' : ''}`}>
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
                                                            <FormGroup
                                                                className={`${this.hasErrorFor('officerRank') ? 'has-danger' : ''}`}>
                                                                <select id='rank'
                                                                        className={`form-control ${this.hasErrorFor('officerRank') ? 'is-invalid' : ''}`}
                                                                        name='officerRank'
                                                                        placeholder='Offending Officers Rank / Description'
                                                                        value={this.state.partFour.rank}
                                                                        onChange={this.handleFieldChange.bind(this, 'p4')}
                                                                >
                                                                    <option name='default' value='default'>Offending
                                                                        Officers Rank
                                                                    </option>
                                                                    {this.getRanks()}
                                                                </select>
                                                                {this.renderErrorFor('officerRank')}
                                                            </FormGroup>
                                                            <FormGroup
                                                                className={`${this.hasErrorFor('otherId') ? 'has-danger' : ''}`}>
                                                                <textarea id='id'
                                                                          className={`form-control ${this.hasErrorFor('otherId') ? 'is-invalid' : ''}`}
                                                                          name='otherId'
                                                                          placeholder='Any unique features describing the Officer(Colour of Uniform, Name tag, budge number, any unique
                                                                    physical features, etc)'
                                                                          rows='5'
                                                                          value={this.state.partFour.id}
                                                                          onChange={this.handleFieldChange.bind(this, 'p4')}
                                                                />
                                                            </FormGroup>
                                                            <FormGroup
                                                                className={`${this.hasErrorFor('detUnit') ? 'has-danger' : ''}`}>
                                                                <textarea id='detUnit'
                                                                          className={`form-control ${this.hasErrorFor('detUnit') ? 'is-invalid' : ''}`}
                                                                          name='detUnit'
                                                                          placeholder='Details of Unit where Officer is attached if known'
                                                                          rows='5'
                                                                          value={this.state.partFour.detUnit}
                                                                          onChange={this.handleFieldChange.bind(this, 'p4')}
                                                                />
                                                            </FormGroup>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <button id='prev' type="button"
                                                                    className="btn btn-default float-left"
                                                                    onClick={this.handleNav.bind(this, 'p3', 'prev')}>
                                                                <i className='ni ni-bold-left'/>
                                                            </button>
                                                            <button disabled={this.state.isSubmitting}
                                                                    className="btn btn-primary btn-round float-right"
                                                                    type='submit'
                                                                    onClick={() => {
                                                                        this.handleNav.bind(this, 'done', 'next')
                                                                        $('form105').submit()
                                                                    }
                                                                    }>
                                                                <i className={`${this.state.isSubmitting ? 'fa fa-spinner' : 'ni ni-send'}`}></i> {this.state.isSubmitting ? "Submitting Complaint " : "Submit Complaint"}
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
                </div>
                <div>
                    <button id="getRef" type='button' tabIndex='-1' className='btn btn-primary d-none d-sm-none'
                            data-toggle='modal' data-target="#showRefNo">
                        Get Ref
                    </button>
                    <div className="modal fade" id="showRefNo" tabIndex="-1" role="dialog"
                         aria-labelledby="showRefNoTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="showRefNoTitle">Complaint Reference Number</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Row>
                                        <p className='display-7 text-center'>Please write down this number for Reference
                                            if contacted</p><br/>
                                        <div className='text-center display-5'
                                             style={{width: `100%`}}>{this.state.refNo.split('-')[4]}</div>
                                    </Row>
                                </div>
                                <div className="modal-footer">
                                    <button id="finCopy" type="button" className="btn btn-success" data-dismiss="modal"
                                            onClick={() => {
                                                $("[href='/dashboard/index']")[0].click()
                                            }}>Finished Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default PoliceForm
