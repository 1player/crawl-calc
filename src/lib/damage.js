import { dice, dice0, constant } from "./expr";

function apply_stat_modifier(damage, str) {
  let mod = constant(39);

  if (str > 10) {
    mod = mod.add(dice0(str - 9).mul(2));
  } else if (str < 10) {
    mod = mod.sub(dice0(11 - str).mul(3));
  }

  return damage.mul(mod).div(39);
}

function apply_weapon_skill(damage, weapon_skill) {
  let mod = dice(weapon_skill * 100).add(2500);

  return damage.mul(mod).div(2500);
}

function apply_fighting_skill(damage, fighting_skill) {
  const base = 3000;

  let mod = dice(fighting_skill * 100).add(base);

  return damage.mul(mod).div(base);
}

function apply_misc_modifiers(damage) {
  return damage;
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1183
function apply_slaying_bonuses(damage, slaying_bonus) {
  return damage.add(dice0(slaying_bonus));
}

// https://github.com/crawl/crawl/blob/7bf63f6c59ec0b09b03f62e0b917198a2f13f101/crawl-ref/source/attack.cc#L1442
// function apply_brand(damage) {
//   return damage;
// }

export function calc_damage({
  str,
  weapon_skill,
  base_damage,
  fighting_skill,
  enchantment,
  slay
}) {
  console.log(arguments);

  let damage = dice(apply_stat_modifier(constant(base_damage), str).add(1));
  damage = apply_weapon_skill(damage, weapon_skill);
  damage = apply_fighting_skill(damage, fighting_skill);
  damage = apply_misc_modifiers(damage);
  damage = apply_slaying_bonuses(damage, slay + enchantment);
  // TODO https://github.com/crawl/crawl/blob/db02301618d730d66a36defae39f69395b5df7a6/crawl-ref/source/melee-attack.cc#L1493
  // TODO https://github.com/crawl/crawl/blob/db02301618d730d66a36defae39f69395b5df7a6/crawl-ref/source/melee-attack.cc#L1477
  // damage = apply_brand(damage);

  return damage;
}
