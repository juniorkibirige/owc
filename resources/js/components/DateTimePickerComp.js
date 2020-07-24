import React, { Component } from 'react'
import ReactDatetime from 'react-datetime'

import {
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Col, Row
} from 'reactstrap'

class Datepicker extends Component {

    constructor () {
        super()
        this.state = {}
    }
    render() {
        return (
            <Row>
                <Col>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                                timeFormat={false}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default Datepicker