import React, { Component } from "react";

export class NumberField extends Component {
  render() {
    return (
      <label className={this.props.className + " flex flex-col items-center"}>
        <div class="text-sm text-grey-dark mb-2">{this.props.label}</div>
        <input
          className="border p-2 shadow-inner w-full"
          type="number"
          value={this.props.value}
          onChange={this.props.onChange}
          min={this.props.min || 0}
          max={this.props.max}
        />
      </label>
    );
  }
}
