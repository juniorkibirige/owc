const $ = require('jquery')
$.DataTable = require('datatables.net')
import React, { Component } from 'react'
import paginationFactory from 'react-bootstrap-table2-paginator'

import { dataTable } from "./../../variables/general"
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Container, Row, ButtonGroup, Button, UncontrolledTooltip, Col } from 'reactstrap'
import ReactToPrint from 'react-to-print'
import BootstrapTable from 'react-bootstrap-table-next'

const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
        <div className="dataTables_length" id="datatable-basic_length">
            <label>
                Show{" "}
                {
                    <select
                        name='datatable-basic_length'
                        aria-controls="datatable-basic"
                        className="form-control form-control-sm"
                        onChange={e => onSizePerPageChange(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                }{" "}
                entries.
            </label>
        </div>
    )
})

const { SearchBar } = Search;

class Tables extends Component {

    constructor() {
        super()
        this.state = {
            alert: null
        }
        this.copyToClipboardAsTable = this.copyToClipboardAsTable.bind(this)
    }
    componentWillUnmount() {
        this.props.history.prev = 'tables'
    }

    copyToClipboardAsTable(el) {
        var body = document.body, range, sel
        if (document.createRange && window.getSelection) {
            range = document.createRange()
            sel = window.getSelection()
            sel.removeAllRanges()
            try {
                range.selectNodeContents(el)
                sel.addRange(range)
            } catch (e) {
                range.selectNode(el)
                sel.addRange(range)
            }
            document.execCommand("copy")
        } else if (body.createTextRange) {
            range = body.createTextRange()
            range.moveToElementText(el)
            range.select()
            range.execCommand("Copy")
        }
        this.setState({
            alert: (
                <ReactBSAlert
                    success
                    style={{ display: "block", marginTop: `-100px` }}
                    title="Good Job!"
                    onConfirm={() => this.setState({ alert: null })}
                    onCancel={() => this.setState({ alert: null })}
                    confirmBtnBsStyle="info"
                    btnSize=""
                >Copied to clipboard!</ReactBSAlert>
            )
        })
    }

    updateTable(names) {
        const table = $('.data-table.wrapper')
            .find('table')
            .DataTable()
        let dataChanged = false
        table.rows().every(function () {
            const oldNameData = this.data()
            const newNameData = names.find((nameData) => {
                return nameData.name === oldNameData.name
            })
            if (oldNameData.nickname !== newNameData.nickname) {
                dataChanged = true;
                this.data(newNameData);
            }
            return true; // RCA esLint configuration wants us to 
            // return something
        })

        if (dataChanged) {
            table.draw();
        }
    }

    render() {
        require('../../variables/main.3eb61e62.chunk.css')
        require('../../../../public/argon/css/datatables.min.css')
        require("../../../../public/argon/vendor/datatables.net-bs4/css/dataTables.bootstrap4.min.css")
        require("../../../../public/argon/vendor/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css")
        require("../../../../public/argon/vendor/datatables.net-select-bs4/css/select.bootstrap4.min.css")
        require("../../../../public/argon/vendor/datatables.net/js/jquery.dataTables.min.js")
        require("../../../../public/argon/vendor/datatables.net-bs4/js/dataTables.bootstrap4.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/dataTables.buttons.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/buttons.html5.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/buttons.flash.min.js")
        require("../../../../public/argon/vendor/datatables.net-buttons/js/buttons.print.min.js")
        require("../../../../public/argon/vendor/datatables.net-select/js/dataTables.select.min.js")
        return (
            <>
                {this.state.alert}
                <ToolkitProvider
                    data={dataTable}
                    keyField="name"
                    columns={[
                        {
                            dataField: "name",
                            text: "Name",
                            sort: true
                        },
                        {
                            dataField: "position",
                            text: "Position",
                            sort: true
                        },
                        {
                            dataField: "office",
                            text: "Office",
                            sort: true
                        },
                        {
                            dataField: "age",
                            text: "Age",
                            sort: true
                        },
                        {
                            dataField: "start_date",
                            text: "Start date",
                            sort: true
                        },
                        {
                            dataField: "salary",
                            text: "Salary",
                            sort: true
                        }
                    ]}
                    search
                >
                    {props => (
                        <div className="py-4">
                            <Container fluid>
                                <Row>
                                    <Col xs={12} sm={6}>
                                        <ButtonGroup>
                                            <Button
                                                className="buttons-copy button-html5"
                                                color="default"
                                                size="sm"
                                                id="copy-tooltip"
                                                onClick={() => this.copyToClipboardAsTable(document.getElementById("react-bs-table"))}>
                                                <span>Copy</span>
                                            </Button>
                                            <ReactToPrint
                                                trigger={() => (
                                                    <Button
                                                        href="#"
                                                        color="default"
                                                        size='sm'
                                                        className='buttons-copy buttons-html5'
                                                        id="print-tooltip"
                                                    >
                                                        Print
                                                    </Button>
                                                )}
                                                content={() => this.componentRef}
                                            />
                                        </ButtonGroup>
                                        <UncontrolledTooltip placeholder='top' target="print-tooltip">
                                            This will open a print page with the visible rows of the table.
                                        </UncontrolledTooltip>
                                        <UncontrolledTooltip placeholder='top' target="copy-tooltip">
                                            This will copy to your clipboard the visible rows of the table.
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col xs={12} sm={6}>
                                        <div id='datatable-basic_filter' className='dataTables_filter px-4 pb-1 float-right'>
                                            <label>
                                                Search:
                                                <SearchBar className='form-control-sm' placeholder="" {...props.searchProps} />
                                            </label>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            <BootstrapTable
                                ref={el => (this.componentRef = el)}
                                {...props.baseProps}
                                bootstrap4={true}
                                pagination={pagination}
                                bordered={false}
                                id="react-bs-table" />
                        </div>
                    )}
                </ToolkitProvider>
            </>
        )
    }
}

export default Tables