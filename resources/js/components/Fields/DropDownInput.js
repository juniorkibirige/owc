import React, {Component} from "react";
import Select from 'react-select'

class DropDownInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        }
    }

    render() {
        return (
            <>
                <div className={`form-group ` + this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    <Select
                        className={`basic-single `}
                        classNamePrefix={'select'}
                        defaultValue={this.props.options[0]}
                        isDisabled={this.props.disabled}
                        isLoading={false}
                        isClearable={this.props.clearable}
                        isRtl={false}
                        isSearchable={true}
                        name={this.props.name}
                        options={this.props.options}
                        onChange={this.props.onChange}
                        id={this.props.field}
                        data-row={this.props.dataRow ?? 0}
                    />
                </div>
            </>
        );
    }
}

export default DropDownInput
