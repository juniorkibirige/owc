import React, {Component} from 'react'
import axios from 'axios'
import TextInput from "../../Fields/TextInput";
import DropDownInput from "../../Fields/DropDownInput";
import DateTimePicker from "../../Fields/DateTimePicker";
import TextAreaInput from "../../Fields/TextAreaInput";
import QuantityInput from "../../Fields/QuantityInput";
import RateInput from "../../Fields/RateInput";
import TotalInput from "../../Fields/TotalInput";

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
            offices: [],
            regions: [],
            counties: [],
            parishes: [],
            statuses: [
                {
                    value: 'pending',
                    label: 'Pending'
                },
                {
                    value: 'running',
                    label: 'Running'
                },
                {
                    value: 'terminated',
                    label: 'Terminated'
                },
            ],
            is: [],
            inputs: [
                {
                    input: 0,
                    quantity: 0,
                    rate: 0,
                    total: 0,
                    office: ''
                },
            ],
            contract_start: null,
            contract_end: null,
            alert: null,
            name: ''
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleQuantityFieldChange = this.handleQuantityFieldChange.bind(this)
        this.handleRateFieldChange = this.handleRateFieldChange.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.handleAddNew = this.handleAddNew.bind(this)
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
        if (date !== '') {
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

    getRepeatableValue(row, field) {
        let vs = this.state.inputs
        return vs[row][field]
    }

    handleRepeatableFieldChange() {
        let data = event.target.value
        let row = parseInt(event.target.dataset['data-row'])
        let vs = this.state.inputs
        vs[row][event.target.name] = data
        this.setState({
            inputs: vs
        })
    }

    handleRateFieldChange() {
        let data = event.target.value
        let row = parseInt(event.target.dataset['data-row'])
        let vs = this.state.inputs
        vs[row]['rate'] = data
        vs[row]['total'] = parseInt(data) * vs[row]['quantity']
        this.setState({
            inputs: vs
        })
    }

    handleQuantityFieldChange() {
        let data = event.target.value
        let row = parseInt(event.target.dataset['data-row'])
        let vs = this.state.inputs
        vs[row]['quantity'] = data
        vs[row]['total'] = parseInt(data) * vs[row]['rate']
        this.setState({
            inputs: vs
        })
    }

    handleFieldChange() {
        let data = event.target.value
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
        } else if (event.target.className.includes('rdtDay')) {
            const day = event.target.dataset['value']
            const month = event.target.dataset['month']
            const year = event.target.dataset['year']
            let d = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].name
            data = (parseInt(month) + 1).toString().concat('/').concat(day).concat('/').concat(year)
            this.setState({
                [d]: data
            })
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

    handleAddNew() {
        let a = {
            input: 0,
            quantity: 0,
            rate: 0,
            total: 0,
            office: ''
        }
        let inps = this.state.inputs
        inps.push(a)
        this.setState({
            inputs: inps
        })
    }

    deleteItem() {
        let i = event.target
        console.log(i)
    }

    render() {
        return (
            <>
                <div className="h-full">
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
                                    <div className="row">
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
                                            onchange={this.handleFieldChange}
                                            value={this.state.contract_end}
                                        />
                                        <TextAreaInput
                                            class={'col-sm-12 offset-md-3 col-md-6 required'}
                                            label={'Details'}
                                            required={true}
                                            field={'details'}
                                            aria-multiline={true}
                                            name={'details'}
                                            value={this.state.details}
                                            onChange={this.handleFieldChange}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Office'}
                                            required={true}
                                            field={'office'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.office}
                                            clearable={true}
                                            options={this.state.offices}
                                        />
                                        <DropDownInput
                                            class={'col-md-6 required'}
                                            label={'Status'}
                                            required={true}
                                            field={'status'}
                                            onChange={this.handleFieldChange}
                                            value={this.state.status}
                                            clearable={true}
                                            options={this.state.statuses}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="inputs-tab" role="tabpanel"
                                 aria-labelledby="inputs">

                                <div className="container-repeatable-elements">
                                    <div data-repeatable-holder={'inputs'} data-init-rows={'1'}
                                         data-max-rows={0} data-min-rows={'1'}
                                         number-of-rows={this.state.inputs.length}>
                                        {
                                            this.state.inputs.map((input, index) => (
                                                <div key={index} data-content={input}
                                                     className="col-md-12 well repeatable-element row m-1 p-2"
                                                     data-repeatable-identifier={'inputs'}
                                                     data-row-number={index.toString()}>
                                                    <button
                                                        onClick={this.deleteItem}
                                                        data-row={index}
                                                        className={(index !== 0) ? "close delete-element" : 'close delete-element d-none'}
                                                        style={{paddingLeft: '0.285rem'}} type={'button'}>
                                                        <span aria-hidden="true"><i className="fa fa-times"/></span>
                                                    </button>
                                                    <DropDownInput
                                                        class={'col-12 mb--1 required'}
                                                        label={'Input'}
                                                        required={true}
                                                        field={'input'}
                                                        dataRow={index}
                                                        onChange={this.handleRepeatableFieldChange}
                                                        value={this.getRepeatableValue(index, 'input')}
                                                        clearable={true}
                                                        options={this.state.is}
                                                    />
                                                    <QuantityInput
                                                        class={'col-6 mb--1 required'}
                                                        label={'Quantity'}
                                                        required={true}
                                                        field={'quantity'}
                                                        onChange={this.handleQuantityFieldChange}
                                                        value={this.getRepeatableValue(index, 'quantity')}
                                                    />
                                                    <RateInput
                                                        class={'col-6 mb--1 required'}
                                                        label={'Rate'}
                                                        required={true}
                                                        field={'rate'}
                                                        onChange={this.handleRateFieldChange}
                                                        value={this.getRepeatableValue(index, 'rate')}
                                                    />
                                                    <TotalInput
                                                        class={'col-6 mb--1 offset-3 required'}
                                                        label={'Total'}
                                                        required={true}
                                                        field={'total'}
                                                        readOnly={true}
                                                        value={this.getRepeatableValue(index, 'total')}
                                                    />
                                                    <DropDownInput
                                                        class={'col-12 required'}
                                                        label={'Office'}
                                                        required={true}
                                                        field={'office'}
                                                        dataRow={index.toString()}
                                                        onChange={this.handleRepeatableFieldChange}
                                                        value={this.getRepeatableValue(index, 'office')}
                                                        clearable={true}
                                                        options={this.state.offices}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <button
                                    onClick={this.handleAddNew}
                                    className="btn btn-outline-primary btn-sm ml-1 add-repeatable-element-button"
                                    type="button"><i className="fa fa-plus"/> Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SupplierCreate
