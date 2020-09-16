import React, { Component } from 'react'
import paginationFactory from 'react-bootstrap-table2-paginator'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

import ReactBSAlert from 'react-bootstrap-sweetalert'
import { Container, Row, ButtonGroup, Button, UncontrolledTooltip, Col } from 'reactstrap'
import ReactToPrint from 'react-to-print'
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios'

const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: true,
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

function statusFormatter(cell, row) {
    if (row.open) {
        return (
            <span>
                <strong style={{ color: `green` }}>Open</strong>
            </span>
        )
    } else if(row.underInv) {
        return (
            <span>
                <strong style={{ color: `orange` }}>Under Investigation</strong>
            </span>
        )
    } else {
        return (
            <span>
                <strong style={{ color: `Red` }}>Dismissed</strong>
            </span>
        )
    }
}

const columns = [
    {
        dataField: 'id',
        text: 'UID',
        hidden: true
    },
    {
        dataField: 'refNo',
        text: 'Reference No.',
        formatter: cell => {
            return (<span>{cell.toString().split('-')[4]}</span>)
        }
    },
    {
        dataField: 'victimName',
        text: 'Victim Name',
        sort: true
    },
    {
        dataField: 'cDist',
        text: 'District',
        sort: true
    },
    {
        dataField: 'victimAge',
        text: 'Victim Age',
        sort: true
    },
    {
        dataField: 'victimGender',
        text: 'Victim Gender',
        sort: true
    },
    {
        dataField: 'officerName',
        text: 'Offending Officer',
        sort: true
    },
    {
        dataField: 'officerRank',
        text: 'Officer Rank',
        sort: true
    }
    , {
        dataField: 'complaintStatus',
        text: 'Status',
        sort: true,
        formatter: statusFormatter
    }
]

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        alert(`clicked on ${row.victimAge} with index: ${rowIndex}`)
    }
}

class Tables extends Component {

    constructor(props) {
        super(props)
        this.state = {
            alert: null,
            loading: false,
            page: 1,
            sizePerPage: 10,
            data: [],
            dataTable: []
        }
        this.copyToClipboardAsTable = this.copyToClipboardAsTable.bind(this)
    }
    componentWillUnmount() {
        this.props.history.prev = 'tables'
    }

    componentDidMount() {
        axios.get('/api/form_105').then(response => {
            this.setState({
                data: response.data.forms.slice(0, 10),
                dataTable: response.data.forms
            })
        })
    }

    handleDataChange({ page, sizePerPage, }) {
        const currIndex = (page - 1) * sizePerPage
        setTimeout(() => {
            this.setState(prevState => ({
                ...prevState,
                page: page,
                loading: false,
                data: this.state.dataTable.slice(currIndex, currIndex + sizePerPage),
                sizePerPage: sizePerPage
            }))
        }, 3000)
        this.setState({
            loading: true
        })
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
                <div style={{backgroundColor: `#c8c4e196`}}>
                    <ToolkitProvider
                        data={this.state.dataTable}
                        keyField="id"
                        columns={columns}
                        search
                        hover
                        striped
                    >
                        {props => (
                            <div className="py-7 px-4">
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
                                        <Col xs={12} sm={6} >
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
                                    classes={`table-dark`}
                                    rowEvents={rowEvents}
                                    bootstrap4={true}
                                    pagination={pagination}
                                    bordered={true}
                                    noDataIndication="No complaints made"
                                    id="react-bs-table" />
                            </div>
                        )}
                    </ToolkitProvider>
                </div>
            </>
        )
    }
}

export default Tables
