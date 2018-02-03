import React, { Component } from "react";
import { calc_damage } from "./lib/damage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      str: 11,
      weapon_skill: 14,
      fighting_skill: 14,
      base_damage: 11,
      enchantment: 5,
      slay: 0
    };
  }

  setField(fieldName) {
    return event => {
      this.setState({ [fieldName]: parseFloat(event.target.value) });
    };
  }

  render() {
    let damage = calc_damage(this.state);

    return (
      <div className="App">
        <section>
          <h2>Your stats</h2>
          <label htmlFor="str">STR</label>
          <input
            type="number"
            id="str"
            value={this.state.str}
            onChange={this.setField("str")}
          />

          <label htmlFor="weapon_skill">Weapon Skill</label>
          <input
            type="number"
            id="weapon_skill"
            value={this.state.weapon_skill}
            onChange={this.setField("weapon_skill")}
          />

          <label htmlFor="fighting_skill">Fighting Skill</label>
          <input
            type="number"
            id="fighting_skill"
            value={this.state.fighting_skill}
            onChange={this.setField("fighting_skill")}
          />
        </section>
        <section>
          <h2>Weapon stats</h2>

          <label htmlFor="base_damage">Base Damage</label>
          <input
            type="number"
            id="base_damage"
            value={this.state.base_damage}
            onChange={this.setField("base_damage")}
          />

          <label htmlFor="enchant">Enchantment</label>
          <input
            type="number"
            id="enchant"
            value={this.state.enchantment}
            onChange={this.setField("enchantment")}
          />

          <label htmlFor="slay">Additional Slaying bonus</label>
          <input
            type="number"
            id="slay"
            value={this.state.slay}
            onChange={this.setField("slay")}
          />
        </section>
        <section>
          <h2>Damage stats</h2>

          <p>Average damage: {damage.avg()}</p>
          <p>Max damage: {damage.max()}</p>
        </section>
      </div>
    );
  }
}

export default App;
