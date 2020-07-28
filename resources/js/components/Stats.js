
import React, { Component } from 'react'
import {
    Row, Col,
    Card, CardBody, CardTitle
} from 'reactstrap'
import axios from 'axios'
import HighCharts from 'highcharts'
import HighChartsReact from 'highcharts-react-official'

class Stats extends Component {
    constructor() {
        super()
        this.state = {
            perMonth: 0,
            perWeek: 0,
            perDay: 0,
            chartData: {
                series: [{
                    data: [1, 2, 3]
                }]
            }
        }
    }

    componentDidMount() {
        axios.get('/api/form_105').then(response => {
            this.setState({
                perMonth: response.data.perMonth,
                perWeek: response.data.perWeek,
                perDay: response.data.perDay
            })
        })
    }

    render() {
        return (
            <div className='header bg-info pb-3'>
                <div className='container-fluid'>
                    <div className='header-body'>
                        <Row className='align-items-center py-4'></Row>
                        <Row>
                            <Col className='col-xl-4 col-md-4 col-12'>
                                <Card className='card-stats' style={{ marginBottom: 30 + 'px' }}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h5 className='card-title text-uppercase text-muted mb-0'>Total Complaints</h5>
                                                <span className='h2 font-weight-bold mb-0'>{this.state.perDay}&nbsp; <span className='text-nowrap text-sm'>Today</span></span>
                                            </Col>
                                            <Col className='col-auto'>
                                                <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                                                    <i className='ni ni-chart-pie-35'></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className='col-xl-4 col-md-4 col-12'>
                                <Card className='card-stats' style={{ marginBottom: 30 + 'px' }}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h5 className='card-title text-uppercase text-muted mb-0'>Total Complaints</h5>
                                                <span className='h2 font-weight-bold mb-0'>{this.state.perWeek}&nbsp; <span className='text-nowrap text-sm'>This Week</span></span>
                                            </Col>
                                            <Col className='col-auto'>
                                                <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                                                    <i className='ni ni-chart-pie-35'></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col className='col-xl-4 col-md-4 col-12'>
                                <Card className='card-stats' style={{ marginBottom: 30 + 'px' }}>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                <h5 className='card-title text-uppercase text-muted mb-0'>Total Complaints</h5>
                                                <span className='h2 font-weight-bold mb-0'>{this.state.perMonth}&nbsp; <span className='text-nowrap text-sm'>This Month</span></span>
                                            </Col>
                                            <Col className='col-auto'>
                                                <div className='icon icon-shape bg-gradient-red text-white rounded-circle shadow'>
                                                    <i className='ni ni-chart-pie-35'></i>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <HighChartsReact
                            style={{
                                container: {
                                    backgroundColor: "#fff",
                                    justifyContent: 'center'
                                }
                            }}
                            options={this.state.chartData}
                            // modules={modules}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//         justifyContent: 'center'
//     }
// })

export default Stats