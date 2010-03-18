load("knock.js")
load("pegjs/lib/runtime.js")
load("noir.js")
load("noir-runtime.js")
load("compiler.js")

function parses(s) {
  try {
    noir.parse(s)
    return true
  } catch(e) {
    ok(0, e)
  }
}

function parsesV(s) {
  try {
    p(noir.parse(s))
    return true
  } catch(e) {
    ok(0, e)
  }
}

ok(parses("bar"))
ok(parses("(bar)"))
ok(parses("bar 1 * (\\x=x*2) x!"))
ok(parses("4+8*9"))
ok(parses("f 1,\n2"))
ok(parses("f 1  or f 2"))
ok(parses("def foo = bar"))
ok(parses("def foo x = bar"))
ok(parses("def foo {x} = bar"))
ok(parses("def foo z:{x} = bar"))
ok(parses("def foo z:{x foo} = foo"))
ok(parses("def foo z:{x x:foo} = foo"))

ok(parses("[1 2 3]"))
ok(parses("[1 2*3]"))
ok(parses("[1\n2\n3]"))

ok(parses("007"))
ok(parses("1.5"))
ok(parses("0.522e-8"))

ok(parses("{a}"))
ok(parses("{a b=c}"))
ok(parses("{a b=c\nd=e}"))

ok(parses("while true\nfoo"))
ok(parses("while true; bar"))
ok(parses("while a; c d"))
ok(parses("while a b; c d"))
//should work? ok(parses("while (a b) c d"))
//or make it? while a b: c d

ok(parses("(\n  a\n  block)"))

ok(parses("a [b] \\lam = (\nfoo)"))
ok(parses("each [1 2 3 4] \\item = (\n  print item\n  unshift list item\n)"))

ok(parses("def b=x\ndef c=x"))

ok(parses("(fib 2) + (fib 1)"))

ok(parses("a.b c.d"))