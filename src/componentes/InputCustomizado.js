import React, { Component } from 'react';

class InputCustomizado extends Component {

    render() {
        return (
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input {...this.props} />
            </div>
        );
    }
}

export default InputCustomizado;