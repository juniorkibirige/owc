import React, {Component} from "react";
import Datepicker from "../DateTimePickerComp";

const script = document.createElement('script');

class DateTimePicker extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const id = this.props.id;
        // script.innerText += '$(#'+id+').datetimepicker();\n'
        // document.body.appendChild(script)
    }

    componentWillUnmount() {
        // document.body.removeChild(script)
    }

    render() {
        return (
            <>
                <div className={`form-group ` + this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    <Datepicker
                        inputProps={{
                            placeholder: "Pick Date here",
                            name: this.props.field,
                            onChange: this.props.onchange,
                            value: this.props.value
                        }}
                        onChange={this.props.onChange}
                    />
                    {/*<div className="input-group date" id={this.props.id}>*/}
                    {/*    <input className="form-control" type={'text'}/>*/}
                    {/*    <div className="input-group-append">*/}
                    {/*        <i className="fa fa-calendar input-group-text"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </>
        );
    }
}

export default DateTimePicker
