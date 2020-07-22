import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PoliceForm extends Component {
    constructor () {
        super()
        this.state = {
            refNo: '',
            date: Date.now(),
            partTwo: {
                name: '',
                age: '',
                gender: '',
                residence: {
                    village: '',
                    subCounty: '',
                    district: '',
                    plotNo: ''
                },
                tel: '',
                email: ''

            },
            partThree: {
                involved: {
                    victimName: '',
                    victimAge: '',
                    gender: ''
                },
                statement: '',
                period: '',
                location: '',
                dI: false,
                dIDescription: '',
                witness: false,
                medExam: false,
                reported: false,
                reportRef: ''
            },
            partFour: {
                name: '',
                rank: '',
                id: {
                    colorUniform: '',
                    nameTag: '',
                    badgeNum: '',
                    uniqPhyFeat: '',
                    other: ''
                },
                detUnit: ''
            },
            progress: []
        }
        this.handleCheckBox = this.handleCheckBox.bind(this)
    }

    handleCheckBox (e) {
        print(e.target)
    }

    render () {

    }
}