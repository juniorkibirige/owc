
import React, { Component } from 'react'
import {
    Row, Col,
    Card, CardBody, CardTitle
} from 'reactstrap'
import axios from 'axios'
import HighCharts from 'highcharts'
import HighChartsReact from 'highcharts-react-official'
import { Link } from 'react-router-dom'
var addFunnel = require('highcharts/modules/funnel')

class Stats extends Component {
    constructor() {
        super()
        this.state = {
            perMonth: 0,
            perWeek: 0,
            perDay: 0,
            cityNames: [],
            chart1Data: {
                title: {
                    text: 'Crime rates by Offense Type, 2020',
                    align: 'center',
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                subtitle: {
                    text: 'Source: AI Data from database'
                },
                yAxis: {
                    title: {
                        text: 'Number of crimes'
                    }
                },
                accessiblity: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                xAxis: {
                    accessiblity: {
                        rangeDescription: 'Range: 2019 to 2020'
                    }
                },
                legend: {
                    layout: 'vertical',
                    alight: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            style: {
                                fontWeight: 'bold',
                                color: 'white'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%'],
                        size: '110%'
                    }
                },
                series: [{
                    type: 'pie',
                    name: '{title.text}',
                    innerSize: '50%',
                    data: [
                        ['Chrome', 58.9],
                        ['Firefox', 13.29],
                        ['Internet Explorer', 13],
                        ['Edge', 3.78],
                        ['Safari', 3.42],
                        {
                            name: 'Other',
                            y: 7.61,
                            dataLabels: {
                                enabled: false
                            }
                        }
                    ]
                }]
            },
            chart2Data: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Monthly Average Rainfall'
                },
                subtitle: {
                    text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Rainfall (mm)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Tokyo',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

                }, {
                    name: 'New York',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

                }, {
                    name: 'London',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

                }, {
                    name: 'Berlin',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

                }]
            }
        }
        this.getCities = this.getCities.bind(this)
    }

    getCities() {
        axios.get('/compiled_data/ugCities.json').then(response => {
            this.setState({
                cityNames: response.data,
                isLoading: false
            })
        })
    }

    componentDidMount() {
        addFunnel(HighCharts)
        axios.get('/api/form_105').then(response => {
            this.setState({
                perMonth: response.data.perMonth,
                perWeek: response.data.perWeek,
                perDay: response.data.perDay
            })
            this.getCities()
        })
        HighCharts.chart('chart', this.state.chart1Data)
        // HighCharts.chart('chart2', this.state.chart2Data)
        HighCharts.chart('chart3', this.state.chart2Data)
    }

    render() {
        return (
            <div className='header bg-info pb-7 pt-5'>
                <div className='container-fluid'>
                    <div className='header-body'>
                        <Row className='align-items-center py-4'>
                            <Col className="col-sm-3 col-3"></Col>
                            <Col className="col-sm-3 col-3"></Col>
                            <Col className="col-sm-3 col-3"></Col>
                            <Col className="col-sm-3 col-3 text-right align-items-right">
                                <Link className="btn btn-outline-secondary" to='/dashboard/complain' data-toggle='buttons'>Add Complaint</Link>
                            </Col>
                        </Row>
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
                        <Row>
                            <div id="chart" className='col-sm-12 col-md-5 col-12' style={{ borderRadius: `10px` }}></div>
                            <div id="chart2" className='col-sm-12 col-md-3 col-12' style={{ borderRadius: `10px`, height: `100%` }}></div>
                            <div id="chart3" className='col-sm-12 col-md-4 col-12' style={{ borderRadius: `10px` }}></div>
                        </Row>
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