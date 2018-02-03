import * as expr from "./expr";

test("constants are.. constant", () => {
  expect(expr.constant(1).min()).toEqual(1);
  expect(expr.constant(1).avg()).toEqual(1);
  expect(expr.constant(1).max()).toEqual(1);
});

test("can calculate expressions with constants", () => {
  // ((1+1)*3)/2 == 3
  let e = expr
    .constant(1)
    .add(1)
    .mul(expr.constant(3))
    .div(2);

  expect(e.min()).toEqual(3);
  expect(e.avg()).toEqual(3);
  expect(e.max()).toEqual(3);
});

test("dices work as expected", () => {
  let e = expr.dice(6);

  expect(e.min()).toEqual(1);
  // Actual average is (1+2+3+4+5+6) / 6 = 3.5, rounded down to 3
  expect(e.avg()).toEqual(3);
  expect(e.max()).toEqual(6);

  e = expr.dice0(6);

  expect(e.min()).toEqual(0);
  expect(e.avg()).toEqual(2);
  expect(e.max()).toEqual(5);
});

test("dices work as expected in combination", () => {
  let e = expr.dice(6).add(expr.dice(6));

  expect(e.min()).toEqual(2);
  expect(e.avg()).toEqual(6);
  expect(e.max()).toEqual(12);
});

test("terms are always rounded down", () => {
  let e = expr.dice(2.7);

  expect(e.min()).toEqual(1);
  expect(e.avg()).toEqual(1);
  expect(e.max()).toEqual(2);

  e = expr.constant(1).mul(0.9);
  expect(e.min()).toEqual(0);
  expect(e.avg()).toEqual(0);
  expect(e.max()).toEqual(0);
});
