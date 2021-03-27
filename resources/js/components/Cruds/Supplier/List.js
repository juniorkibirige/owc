import React, { Component } from 'react'
import axios from 'axios'
import paginationFactory from 'react-bootstrap-table2-paginator'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Container, Row, ButtonGroup, Button, UncontrolledTooltip, Col, InputGroup, Input, FormGroup } from 'reactstrap'
import ReactToPrint from 'react-to-print'
import BootstrapTable from 'react-bootstrap-table-next'

// const pagination = paginationFactory({
//     page: 1,
// })

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        alert(`clicked on ${row} with index: ${rowIndex}`)
        // console.log(e.currentTarget)
        // console.log(`clicked on ${row.age} with index: ${rowIndex}`);
    }
}

class SupplierList extends Component {
    constructor() {
        super()
        this.state = {
            suppliers: [],
            newCat: '',
            alert: null
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
    }

    handleFieldChange() {
        let data = event.target.value
        this.setState({
            newCat: data
        })
    }

    componentDidMount() {
        axios.get('/api/supplier/all').then(response=>{
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
                                    <ToolkitProvider
                                        data={this.state.suppliers}
                                        keyField="id"
                                        columns={[
                                            {
                                                dataField: 'id',
                                                text: 'ID',
                                            },
                                            {
                                                dataField: 'name',
                                                text: 'Offense Category',
                                                sort: true
                                            }
                                        ]}
                                        hover
                                    >
                                        {
                                            props => (
                                                <div style={{ backgroundColor: `#c8c4e196` }}>
                                                    <Container fluid className='py-4'>
                                                        <Row>
                                                            <Col xs={12} sm={6}>
                                                                <button
                                                                    id="copy-tooltip"
                                                                    type='button'
                                                                    tabIndex='-1'
                                                                    className='btn btn-primary btn-sm buttons-copy button-html5'
                                                                    data-toggle='modal'
                                                                    data-target="#showRefNo">
                                                                    New Supplier Category
                                                                </button>
                                                                <UncontrolledTooltip placeholder='top' target="copy-tooltip">
                                                                    Click to create a new supplier.
                                                                </UncontrolledTooltip>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                    <BootstrapTable
                                                        ref={el => (this.componentRef = el)}
                                                        {...props.baseProps}
                                                        classes={`table-dark`}
                                                        rowEvents={rowEvents}
                                                        bootstrap4={true}
                                                        bordered={true}
                                                        noDataIndication="No Suppliers added"
                                                        id="react-supplier-table" />
                                                </div>
                                            )
                                        }
                                    </ToolkitProvider>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="modal fade" id="showRefNo" tabIndex="-1" role="dialog" aria-labelledby="showRefNoTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="showRefNoTitle">Add New Category</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Row>
                                        <Col >
                                            <FormGroup>
                                                <InputGroup className='input-group-alternative'>
                                                    <Input type='text' name='newCat' placeholder="Offense Category Name" value={this.state.newCat} onChange={this.handleFieldChange}></Input>
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-success" onClick={this.newCategory}>Add Offense Category</button>
                                    <button id="finCopy" type="button" className="btn btn-success d-none d-sm-none" data-dismiss="modal">Finished Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SupplierList
