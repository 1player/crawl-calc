import React, { Component } from "react";
import { NumberField } from "./NumberField";
import { calc_damage } from "./lib/damage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: 4,
      weapon_skill: 0,
      fighting_skill: 0,
      base_damage: 4,
      enchantment: 0,
      slay: 0
    };
  }

  setNumberField(fieldName) {
    return event => {
      this.setState({ [fieldName]: parseFloat(event.target.value) });
    };
  }

  render() {
    let damage = calc_damage(this.state);

    return (
      <div className="App container mx-auto px-2 font-sans">
        <h1>Crawl melee damage calculator</h1>

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

            <NumberField
              className="mx-2 w-32"
              label="Slay bonus"
              value={this.state.slay}
              min={-10}
              onChange={this.setNumberField("slay")}
            />
          </div>
        </section>
        <section class="my-4 border-t pt-4">
          <h2 class="mb-4">Damage per hit</h2>

          <p className="my-2">Average: {damage.avg()}</p>
          <p className="my-2">Max: {damage.max()}</p>
        </section>
      </div>
    );
  }
}

export default App;
