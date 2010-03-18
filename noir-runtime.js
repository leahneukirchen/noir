function op(name) {
  if (arguments.length == 2)
    return {op: name, a: arguments[1]}
  if (arguments.length == 3)
    return {op: name, a: arguments[1], b: arguments[2]}
  if (arguments.length == 4)
    return {op: name, a: arguments[1], b: arguments[2], c: arguments[3]}
}

function _noirtype(x) {
  switch (typeof(x)) {
  case "number": return x==Math.ceil(x) ? "Integer" : "Float"
  case "string": return "String"
  case "boolean": return x ? "True" : "False"
  case "object": 
    switch (x.constructor) {
    case Number: return "Float"
    case Array: return "Array"
    default: return x.__type__
    }
  default:
    throw("weird object " + x.toSource())
  }
}

function _genfun(name) {
  var f = function() {
    var args = []
    for (var i = 0; i < arguments.length; i++)
      args.push(arguments[i])
    for (var i = 0; i < f.methods.length; i++)
      if (f.methods[i].match.length == args.length &&
          f.methods[i].match.every(function(x,i){return x == "" ||
                                                      x == _noirtype(args[i])}))
        return f.methods[i].fn.apply(f.methods[i].fn, args)
    throw("no generic found for " + name + "/" + args.map(_noirtype).join(","))
  }
  f.methods = []
  return f
}
