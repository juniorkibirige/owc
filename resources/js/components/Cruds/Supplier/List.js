import React, { Component } from 'react'
import axios from 'axios'

import ToolkitProvider  from 'react-bootstrap-table2-toolkit'

import { Container, Row, UncontrolledTooltip, Col, InputGroup, Input, FormGroup } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        alert(`clicked on ${row} with index: ${rowIndex}`)
    }
}

class SupplierList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suppliers: [],
            newCat: '',
            alert: null
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        document.title += " : Suppliers"
    }

    handleFieldChange() {
        let data = event.target.value
        this.setState({
            newCat: data
        })
    }

    componentDidMount() {
        axios.get('/api/supplier').then(response=>{
            this.setState({
                suppliers: response.data,
            });
        });
    }


    render() {
        return (
            <>
                {this.state.alert}
                <div className='header bg-secondary pb-7'>
                    <div className='container-fluid'>
                        <div className='header-body'>
                            <Row className='align-items-center py-4'>
                                <Col>
                                    In Development
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SupplierList
