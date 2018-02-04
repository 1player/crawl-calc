import React, { Component } from "react";
import { NumberField, SelectField } from "./Fields";
import { calc_damage, calc_brand_damage } from "./lib/damage";
import * as brands from "./lib/brands";

class DamageResult extends Component {
  brandLabel() {
    switch (this.props.brand) {
      case brands.FLAMING:
        return "fire damage";
      case brands.FREEZING:
        return "freezing damage";
      case brands.HOLY_WRATH:
        return "holy damage";
      case brands.ELECTROCUTION:
        return "electric damage";
      case brands.DRAINING:
        return "draining damage";
      default:
        return "";
    }
  }

  brandClass() {
    switch (this.props.brand) {
      case brands.FLAMING:
        return "text-red-light";
      case brands.FREEZING:
        return "text-blue";
      case brands.HOLY_WRATH:
        return "text-purple";
      case brands.ELECTROCUTION:
        return "text-orange";
      case brands.DRAINING:
        return "text-red-dark";
      default:
        return "";
    }
  }

  renderRow(label, fn) {
    let hasBrandDamage = this.props.brandDamage !== null;
    let damageDone = this.props.damage[fn]();

    let cells = null;

    if (hasBrandDamage) {
      let brandDamageDone = this.props.brandDamage[fn]();
      let totalDamageDone = damageDone + brandDamageDone;

      cells = (
        <React.Fragment>
          <td>{damageDone}</td>
          <td>+</td>
          <td className={this.brandClass()}>
            {brandDamageDone} {this.brandLabel()}
          </td>
          <td>= {totalDamageDone} per hit</td>
        </React.Fragment>
      );
    } else {
      cells = <td>{damageDone} per hit</td>;
    }

    return (
      <tr>
        <th class="text-left">{label}:</th>
        {cells}
      </tr>
    );
  }
  render() {
    return (
      <table>
        {this.renderRow("Average", "avg")}
        {this.renderRow("Maximum", "max")}
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: 4,
      weapon_skill: 0,
      fighting_skill: 0,
      base_damage: 4,
      enchantment: 0,
      slay: 0,
      brand: brands.NONE
    };

    this.setBrand = this.setBrand.bind(this);
  }

  setNumberField(fieldName) {
    return event => {
      this.setState({ [fieldName]: parseFloat(event.target.value) });
    };
  }

  setBrand(event) {
    this.setState({ brand: event.target.value });
  }

  render() {
    let damage = calc_damage(this.state);
    let brandDamage = calc_brand_damage(damage, this.state.brand);

    return (
      <div className="App container mx-auto px-2 font-sans">
        <h1>Melee damage calculator</h1>

        <section className="my-4">
          <h2 class="mb-2">Your stats</h2>

          <div class="flex">
            <NumberField
              className="mx-2 w-32"
              label="STR"
              value={this.state.str}
              onChange={this.setNumberField("str")}
            />

            <NumberField
              className="mx-2 w-32"
              label="Weapon Skill"
              value={this.state.weapon_skill}
              onChange={this.setNumberField("weapon_skill")}
            />

            <NumberField
              className="mx-2 w-32"
              label="Fighting Skill"
              value={this.state.fighting_skill}
              onChange={this.setNumberField("fighting_skill")}
            />

            <NumberField
              className="mx-2 w-32"
              label="Slay bonus"
              value={this.state.slay}
              min={-10}
              onChange={this.setNumberField("slay")}
            />
          </div>
        </section>
        <section className="my-4">
          <h2 class="mb-4">Weapon stats</h2>

          <div class="flex">
            <NumberField
              className="mx-2 w-32"
              label="Base Damage"
              value={this.state.base_damage}
              min={4}
              onChange={this.setNumberField("base_damage")}
            />

            <NumberField
              className="mx-2 w-32"
              label="Enchantment"
              value={this.state.enchantment}
              min={-10}
              onChange={this.setNumberField("enchantment")}
            />

            <SelectField
              className="mx-2 w-64"
              label="Brand"
              value={this.state.brand}
              options={brands.all}
              onChange={this.setBrand}
            />
          </div>
        </section>

        <section class="my-4 border-t pt-4">
          <h2 class="mb-4">Estimated damage</h2>
          <DamageResult
            damage={damage}
            brandDamage={brandDamage}
            brand={this.state.brand}
          />
        </section>
      </div>
    );
  }
}

export default App;
