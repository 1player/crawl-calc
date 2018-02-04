import { dice0, constant } from "./expr";

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1123
function apply_stat_modifier(damage, str) {
  let mod = constant(39);

  if (str > 10) {
    mod = mod.add(dice0(str - 9).mul(2));
  } else if (str < 10) {
    mod = mod.sub(dice0(11 - str).mul(3));
  }

  return damage.mul(mod).div(39);
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1138
function apply_weapon_skill(damage, weapon_skill) {
  let mod = dice0(constant(weapon_skill * 100).add(1)).add(2500);

  return damage.mul(mod).div(2500);
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1149
function apply_fighting_skill(damage, fighting_skill) {
  const base = 3000;

  let mod = dice0(constant(fighting_skill * 100).add(1)).add(base);
  return damage.mul(mod).div(base);
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/melee-attack.cc#L1481
// TODO: This applies might and berserk
function apply_misc_modifiers(damage) {
  return damage;
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1183
function apply_slaying_bonuses(damage, damage_plus) {
  if (damage_plus > -1) {
    return damage.add(dice0(1 + damage_plus));
  }
  return damage.sub(dice0(1 - damage_plus));
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1199
// and
// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/melee-attack.cc#L1497
// TODO: cleaving, WJC, weak, etc.
function apply_final_multipliers(damage) {
  return damage;
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1442
// function apply_brand(damage) {
//   return damage;
// }

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1286
export function calc_damage({
  str,
  weapon_skill,
  base_damage,
  fighting_skill,
  enchantment,
  slay
}) {
  let potential_damage = apply_stat_modifier(constant(base_damage), str);

  let damage = dice0(potential_damage.add(1));
  damage = apply_weapon_skill(damage, weapon_skill);
  damage = apply_fighting_skill(damage, fighting_skill);
  damage = apply_misc_modifiers(damage);
  damage = apply_slaying_bonuses(damage, slay + enchantment);
  damage = apply_final_multipliers(damage);

  return damage;
}
