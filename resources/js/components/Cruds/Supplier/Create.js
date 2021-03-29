import React, {Component} from 'react'
import axios from 'axios'
import TextInput from "../../Fields/TextInput";
import DropDownInput from "../../Fields/DropDownInput";
import Datepicker from "../../DateTimePickerComp";
import DateTimePicker from "../../Fields/DateTimePicker";

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        alert(`clicked on ${row} with index: ${rowIndex}`)
    }
}

class SupplierCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suppliers: [],
            cData: [],
            cR: '',
            cD: '',
            cC: '',
            cP: '',
            districts: [],
            regions: [],
            counties: [],
            parishes: [],
            alert: null,
            name: ''
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        document.title = document.title.split(':')[0] + " : Supplier Create"
        axios.get('/compiled_data/ugData.json').then(response => {
            this.setState({
                cData: response.data
            })
            this.getRegions();
        })
    }

    getDistricts(re) {
        console.log(this.state.cData[re.split(' ')[0].toString()])
        let dis = []
        let k = 0
        if (re !== '') {
            Object.keys(this.state.cData[re.split(' ')[0].toString()]).forEach(district => {
                let d = {}
                d['value'] = district
                d['label'] = district.concat(' District')
                dis.push(d)
                k += 1
            })
            this.setState({
                districts: dis
            })
            return dis
        }
    }

    getCounties(re, di) {
        let dis = []
        let k = 0
        if (re !== '' && di !== '') {
            Object.keys(this.state.cData[re.split(' ')[0].toString()][di.split(' ')[0].toString()]).forEach(county => {
                let d = {}
                d['value'] = county
                d['label'] = county.concat(' County')
                dis.push(d)
                k += 1
            })
            this.setState({
                counties: dis
            })
            return dis
        }
    }

    handleDateChange(event) {
        let date = event._d.toDateString()
        if(date !== '') {
            console.log(event)
        }
    }

    getParish(re, di, co) {
        let dis = []
        let k = 0
        if (re !== '' && di !== '' && co !== '') {
            Object.keys(this.state.cData[re.split(' ')[0].toString()][di.split(' ')[0].toString()][co.split(' ')[0].toString()]).forEach(county => {
                let d = {}
                d['value'] = this.state.cData[re.split(' ')[0].toString()][di.split(' ')[0].toString()][co.split(' ')[0].toString()][county]
                d['label'] = this.state.cData[re.split(' ')[0].toString()][di.split(' ')[0].toString()][co.split(' ')[0].toString()][county].concat(' Parish')
                dis.push(d)
                k += 1
            })
            this.setState({
                parishes: dis
            })
            return dis
        }
    }

    getRegions() {
        let reg = []
        let k = 0
        Object.keys(this.state.cData).forEach(region => {
            if (k < 4) {
                let r = {}
                r['value'] = region
                r['label'] = region.concat(' Region')
                reg.push(r)
                k += 1
            }
        })
        this.setState({
            regions: reg
        })
        return reg
    }

    handleFieldChange() {
        let data = event.target.value
        console.log(event.target)
        if (event.target.id.includes('react-select')) {
            data = event.target.textContent
            let isR = false, isD = false, isC = false
            for (const regionsKey in this.state.regions) {
                if (this.state.regions[regionsKey].label === data) {
                    isR = true;
                    break;
                }
            }
            if (!isR) {
                for (const districtsKey in this.state.districts) {
                    if (this.state.districts[districtsKey].label === data) {
                        isD = true;
                        break;
                    }
                }
            }
            if (!isR && !isD) {
                for (const countyKey in this.state.counties) {
                    if (this.state.counties[countyKey].label === data) {
                        isC = true;
                        break;
                    }
                }
            }
            if (isR) {
                this.setState({
                    cR: data
                })
                this.getDistricts(data)
            } else if (isD) {
                this.setState({
                    cD: data
                })
                this.getCounties(this.state.cR, data)
            } else if (isC) {
                this.setState({
                    cC: data
                })
                this.getParish(this.state.cR, this.state.cD, data)
            } else {
                this.setState({
                    cP: data
                })
            }
        } else
            this.setState({
                [event.target.name]: data
            })
    }

    componentDidMount() {
        axios.get('/api/supplier/all').then(response => {
            this.setState({
                suppliers: response.data,
            });
        });
    }

    render() {
        return (
            <>
                <div className="h-full" style={{}}>
                    {this.state.alert}
                    <div className='header'>
                        <div className='container-fluid pt-4 pb-2'>
                            <span className="text-2xl text-capitalize">Suppliers</span> <small>Add Supplier.</small><a
                            href="#"><i className="fa fa-angle-double-left"/> Back to all Suppliers</a>
                        </div>
                    </div>
                    <div className="col-md-10 bg-blue-gray-400 pb-7">
                        <ul className="nav nav-tabs nav-justified mb-3" id="sCreate" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#per-det-tab" className="nav-link active" id="per-det" data-mdb-toggle="tab"
                                   role="tab" aria-controls="per-det-tab" aria-selected="true">
                                    Personal Details
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#contact-tab" className="nav-link" id="contact" data-mdb-toggle="tab"
                                   role="tab" aria-controls="contact-tab" aria-selected="false">
                                    Contact Details
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#contract-tab" className="nav-link" id="contract" data-mdb-toggle="tab"
                                   role="tab" aria-controls="contract-tab" aria-selected="false">
                                    Contract
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#inputs-tab" className="nav-link" id="inputs" data-mdb-toggle="tab"
                                   role="tab" aria-controls="inputs-tab" aria-selected="false">
                                    Inputs
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content bg-blue-gray-50 mt--3 p-4" id="sCreate-content">
                            <div className="tab-pane fade show active" id="per-det-tab" role="tabpanel"
                                 aria-labelledby="per-det">
                                <div className="container">
                                    <div className="row">
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Company Name'}
                                            required={true}
                                            field={'name'}
                                            placeholder={'Company Name'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.name}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Regions'}
                                            required={true}
                                            field={'cR'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cR}
                                            clearable={true}
                                            options={this.state.regions}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'District'}
                                            required={true}
                                            field={'cD'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cD}
                                            clearable={true}
                                            disabled={this.state.districts.length === 0}
                                            options={this.state.districts}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'County'}
                                            required={true}
                                            field={'cC'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cC}
                                            clearable={true}
                                            disabled={this.state.counties.length === 0}
                                            options={this.state.counties}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Parish'}
                                            required={true}
                                            field={'cP'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.cP}
                                            clearable={true}
                                            disabled={this.state.parishes.length === 0}
                                            options={this.state.parishes}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="contact-tab" role="tabpanel"
                                 aria-labelledby="contact">
                                <div className="container">
                                    <div className="row"><TextInput
                                        class={'col-sm-12 required'}
                                        label={'Email'}
                                        type={'email'}
                                        required={true}
                                        field={'email'}
                                        placeholder={'Email Address'}
                                        onChange={this.handleFieldChange}
                                        value={this.state.email}
                                    />
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Phone Number'}
                                            required={true}
                                            field={'phone'}
                                            type={'phone'}
                                            placeholder={'Phone Number'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.phone}
                                        />
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Address'}
                                            required={true}
                                            field={'address'}
                                            placeholder={'Address'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="contract-tab" role="tabpanel"
                                 aria-labelledby="contract">
                                <div className="container">
                                    <div className="row">
                                        <DateTimePicker
                                            class={'col-sm-6 required'}
                                            label={'Contract Start'}
                                            required={true}
                                            id={'contract_start'}
                                            field={'contract_start'}
                                            placeholder={'Start'}
                                            onchange={this.handleFieldChange}
                                            value={this.state.contract_start}
                                        />
                                        <DateTimePicker
                                            class={'col-sm-6 required'}
                                            label={'Contract End'}
                                            required={true}
                                            field={'contract_end'}
                                            id={'contract_end'}
                                            placeholder={'End'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.contract_end}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="inputs-tab" role="tabpanel"
                                 aria-labelledby="inputs">
                                Inputs Details
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 d-none">
                        <div className="card mx-4 my-3">
                            <div className="card-body row">
                                <div className="card col-md-8 offset-md-2">
                                    <div className="card-header bg-gradient-blue">Contact Details</div>
                                    <div className="card-body bg-light-blue-500">
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Email'}
                                            type={'email'}
                                            required={true}
                                            field={'email'}
                                            placeholder={'Email Address'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.email}
                                        />
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Phone Number'}
                                            required={true}
                                            field={'phone'}
                                            type={'phone'}
                                            placeholder={'Phone Number'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.phone}
                                        />
                                        <TextInput
                                            class={'col-sm-12 required'}
                                            label={'Address'}
                                            required={true}
                                            field={'address'}
                                            placeholder={'Address'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.address}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SupplierCreate
