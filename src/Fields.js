import React, { Component } from "react";

function WrapInLabel(props) {
  return (
    <label className={props.className + " flex flex-col items-center"}>
      <div class="text-sm text-grey-dark mb-2">{props.label}</div>
      {props.children}
    </label>
  );
}

export class NumberField extends Component {
  render() {
    return (
      <WrapInLabel label={this.props.label} className={this.props.className}>
        <input
          className="border p-2 shadow-inner w-full"
          type="number"
          value={this.props.value}
          onChange={this.props.onChange}
          min={this.props.min || 0}
          max={this.props.max}
        />
      </WrapInLabel>
    );
  }
}

export class SelectField extends Component {
  render() {
    let options = this.props.options.map(key => (
      <option value={key}>{key}</option>
    ));

    return (
      <WrapInLabel label={this.props.label} className={this.props.className}>
        <select
          className="border p-2 shadow-inner w-full"
          onChange={this.props.onChange}
          value={this.props.value}
        >
          {options}
        </select>
      </WrapInLabel>
    );
  }
}
