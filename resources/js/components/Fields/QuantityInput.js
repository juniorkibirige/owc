import React, {Component} from "react";

class QuantityInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={`form-group ` + this.props.class}>
                    <label htmlFor={this.props.field}>{this.props.label}:<sup
                        className='text-red'>{this.props.required ? '*' : ''}</sup></label>
                    {
                        <input type={`number`} className="form-control"
                               name={'quality'}
                               data-row={this.props.dataRow}
                               value={this.props.value}
                               placeholder={this.props.placeholder}
                               required={this.props.required ?? false}
                               onChange={this.props.onChange}
                        />
                    }
                </div>
            </>
        );
    }
}

export default QuantityInput
