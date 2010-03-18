var $code = []
function emit(code) { $code.push(code) }

function mangle(t) {
  return t.replace(/[^a-zA-Z0-9]/g, function(match) {
                     return "_" + match.charCodeAt(0)
                   })
}

function esc(str) {
  var s = str.toSource()
  return(s.substring(12, s.length-2))
}

function include(ary, val) {
  return ary.some(function(x){return x == val})
}

function compile(ast, vars) {
  if (!vars)
    vars = []

  switch (ast.op) {
  case "call":
    if (ast.a.op == "var")
      emit(ast.a.a)
    else
      compile(ast.a)
    if (!(ast.a.op == "var" && include(vars, ast.a.a))) {
      emit("(")
      ast.b.forEach(function(x,i){vars = compile(x,vars);if(i<ast.b.length-1)emit(",");})
      emit(")")
    }
    break
  case "ary":
    emit("[");
    ast.a.forEach(function(x,i){vars=compile(x,vars);if(i<ast.a.length-1)emit(",");})
    emit("]");
    break
  case "lit":
    if (typeof (ast.a) == "number") {
      emit(ast.a.toString())
    } else if (typeof (ast.a) == "string") {
      emit(ast.a)
    } else {
      emit(ast.a.toSource())
    }
    break
  case "!=": case "#": case "%": case "&&": case "*": case "+": case
       "-": case "/": case "<": case "<<": case "<=": case "=": case
       "==": case ">": case ">=": case ">>": case "||":
    emit("(")
    compile(ast.a,vars);
    emit(")")
    emit(ast.op);
    emit("(")
    compile(ast.b,vars);
    emit(")")
    break
  case "while":
    emit("while(")
    compile(ast.a,vars) 
    emit("){")
    compile(ast.b,vars)
    emit("}")
    break
  case "if":
    emit("(")
    compile(ast.a,vars) 
    emit(") ? (")
    vars = compile(ast.b,vars)
    emit(") : (")
    if (ast.c)
      vars = compile(ast.c,vars)
    else
      emit("false")
    emit(")")
    break
  case "lambda":
    var v = function(x){return x.a};
    emit("function(")
    emit(ast.a.map(v).join(","))
    emit("){return ")
    compile(ast.b,vars.concat(v))
    emit(")")
    break
  case "seq":
    ast.a.forEach(function(x,i){
      vars = compile(x,vars);
      if (i < ast.a.length - 1)
        emit("; ")
    })
    break
  case "var":
    emit(ast.a)
    if (!include(vars, ast.a))
      emit("()")
    break
  case "cons":
    emit("{__type__:")
    emit(esc(ast.a))
    ast.b.forEach(function(x,i){
      emit(",")
      emit(esc(x.a))
      emit(":")
      compile(x.b,vars)
    })
    emit("}")
    break
  case "def":
    var v = []
    emit("if (!_cur." + ast.a + ") _cur." + ast.a + "= _genfun(" + esc(ast.a) + "); var " + ast.a + " = _cur." + ast.a + ";")
    emit("_cur." + ast.a + ".methods.push({match:[")
    for(var i = 0; i < ast.b.length; i++)
      emit(esc(ast.b[i].b || "") + ",")
    emit("],fn:function(")
    for(var i = 0; i < ast.b.length; i++) {
      emit("_"+i)
      if (i < ast.b.length - 1)
        emit(",")
    }
    emit("){")
    for(var i = 0; i < ast.b.length; i++) {
      if (ast.b[i].a) {
        emit("var " + ast.b[i].a + "= _" + i + ";")
        v.push(ast.b[i].a)
      }
      if (ast.b[i].c)
        for(var j = 0; j < ast.b[i].c.length; j++) {
          emit("var " + (ast.b[i].c[j].a || ast.b[i].c[j].b) + " = _" + i + "." +
               ast.b[i].c[j].b + ";")
          v.push(ast.b[i].c[j].a || ast.b[i].c[j].b)
        }
    }
    emit("return ")
    vars = compile(ast.c,vars.concat(v))
    emit("}})")
    break
  case "sel":
    compile(ast.a,vars)
    for(var i = 0; i < ast.b.length; i++) {
      emit(".")
      emit(ast.b[i])
    }
    break
  case "assg":
    emit("var " + ast.a + "=")
    vars = compile(ast.b,vars.concat([ast.a]))
    break
  default:
    throw("cant compile: " + ast.toSource())
    break
  }

  return vars
}
