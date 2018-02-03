function is_expr(x) {
  return x instanceof Expr;
}

function to_expr(x) {
  if (!is_expr(x)) {
    x = new Constant(x);
  }
  return x;
}

class Expr {
  min() {}
  avg() {}
  max() {}

  add(right) {
    return new Add(this, right);
  }

  sub(right) {
    return new Sub(this, right);
  }

  mul(right) {
    return new Mul(this, right);
  }

  div(right) {
    return new Div(this, right);
  }
}

// Primitives

class Constant extends Expr {
  constructor(n) {
    super();
    this.n = n;
  }

  min() {
    return this.n;
  }
  avg() {
    return this.n;
  }
  max() {
    return this.n;
  }
}

class Dice extends Expr {
  constructor(sides) {
    super();
    this.sides = to_expr(sides);
  }

  min() {
    return 1;
  }

  avg() {
    return Math.trunc(this.sides.avg() / 2 + 0.5);
  }

  max() {
    return Math.trunc(this.sides.max());
  }
}

// Operators

function make_op_class(fn) {
  return class extends Expr {
    constructor(left, right) {
      super();
      this.left = to_expr(left);
      this.right = to_expr(right);
    }

    min() {
      return Math.trunc(fn(this.left.min(), this.right.min()));
    }

    avg() {
      return Math.trunc(fn(this.left.avg(), this.right.avg()));
    }

    max() {
      return Math.trunc(fn(this.left.max(), this.right.max()));
    }
  };
}

let Add = make_op_class((a, b) => a + b);
let Sub = make_op_class((a, b) => a - b);
let Mul = make_op_class((a, b) => a * b);
let Div = make_op_class((a, b) => a / b);

// Helpers

export function constant(n) {
  return new Constant(n);
}

// Such as 1dN
export function dice(max) {
  return new Dice(max);
}

// Such as 1d6 - 1
export function dice0(max) {
  return dice(max).sub(1);
}
