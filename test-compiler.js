load("knock.js")
load("pegjs/lib/runtime.js")
load("noir.js")
load("noir-runtime.js")
load("compiler.js")

_cur = []

function compiles(s) {
  try {
    $code = []
    compile(noir.parse(s))
    return " " + $code.join("")
  } catch(e) {
    ok(0, e)
  }
}

function compilesV(s) {
  try {
    $code = []
    compile(noir.parse(s))
    var c = " " + $code.join("")
    diag(c)
    return c
  } catch(e) {
    ok(0, e)
  }
}

function evals(s) {
  return eval(compiles(s))
}

function evalsV(s) {
  var v = eval(compilesV(s))
  p(v)
  return v
}

ok(compiles(""))
ok(evals("1+1") == 2)

ok(evals("1.5") == 1.5)

ok(evals("x=7;x") == 7)

ok(evals("def x=7;x") == 7)

ok(evals("def x {Integer}=7;def x {Float}=8; x 1") == 7)
ok(evals("def x {Integer}=7;def x {Float}=8; x 1.5") == 8)

ok(evals("if 1 < 2; 2 else 1"))

ok(evals("def fib n:{Integer} = if n > 1; (fib (n - 1)) + (fib (n - 2)) else n; fib 20") == 6765)
