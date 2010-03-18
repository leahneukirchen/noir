start: dexpr* { return op("seq", $1) }

dexpr: def _sep { return $1 }
     / expr _sep { return $1 }

_: (whitespace / "," __)*
__: (whitespace / eol / comment)*
comment: "#" (![\n\r] .)*
eol "end of line": "\n" / "\r\n" / "\r"
whitespace: [ \t\v\f]
_sep: ";" __ / (whitespace / comment)* eol __ / !. / &")"

def: "def" _ id arg* "=" __ expr {return op("def", $3, $4, $7)}

arg: "{" _ id matcher* "}" _ { return op("match",null,$3,$4) }
   / id ":" _ "{" _ id matcher* "}" _ { return op("match",$1,$6,$7) }
   / id { return op("match",$1,null,null) }

matcher: id ":" _ id { return op("massg",$1,$4) }
       / id          { return op("massg",null,$1) }

id "id": !("and" / "def" / "else" / "if" / "or" / "while")
         [a-zA-Z_][a-zA-Z0-9_-]*[!?]? _ { return $2+$3.join("")+$4 }

expr: or

or: and "or" __ or { return op("||",$1,$4) }
  / and

and: stmt "and" __ and { return op("&&",$1,$4) }
   / stmt

stmt: "if" _ expr _sep expr ("else" __ expr)? { return op("if",$3,$5,$6 ? $6[2] : null) }
    / "while" _ expr _sep expr { return op("while",$3,$5) }
    / call

/* precedences directly taken from Go.  missing so far: &, &^, |, ^, op=. */
/* also, from ruby: <=>, ===, =~, !~, **. */
call: lor lor* { return $2.length == 0 ? $1 : op("call", $1, $2) }

lor: land "||" __ lor { return op("||",$1,$4) }
   / land

land: cmp "&&" __ land { return op("&&",$1,$4) }
    / cmp

cmp: add ( "==" / "!=" / "<=" / ">=" / "<" / ">" ) __ add { return op($2,$1,$4) }
   / add

add: mult ( "+" / "-" ) __ add { return op($2, $1, $4) }
   / mult

mult: assg ( "*" / "/" / "%" / "<<" / ">>" ) __ mult { return op($2, $1, $4) }
    / assg

assg "assignment": id "=" __ expr { return op("assg", $1, $4) }
                 / sel

sel: prim ("." __ id)+ { return op("sel", $1, $2.map(function(x){return x[2]})) }
   / prim

prim: block
    / var
    / literal

block: "(" __ dexpr* ")" _ { return $3.length == 1 ? $3[0] : op("seq", $3) }

var "variable": id { return op("var", $1) }

literal "literal": string
       / array
       / cons
       / number
       / lambda

array: "[" __ (expr __)* "]" _ { return op("ary", $3.map(function(x){return x[0]})) }

cons: "{" __ id __ (assg __)* "}" _ { return op("cons", $3, $5.map(function(x){return x[0]})) }

string "string": '"' doubleQuotedCharacter* '"' _ { return op("lit", $2.join("")) }

lambda: "\\" _ arg* "=" __ expr _ { return op("lambda", $3, $6) }

number "number": hexnumber { return op("lit", $1) }
               / octalnumber { return op("lit", $1) }
               / decimalnumber { return op("lit", $1) }

hexnumber: ("0x" / "0X") hexDigit+ _ { return parseInt($1+$2.join("")) }
octalnumber: "0" [0-7]+ _ { return parseInt($1+$2.join("")) }
decimalnumber: [+-]? digit+
               ("." digit+ {return $1+$2.join("")})? 
               ([eE] [+-]? digit+ {return $1+$2+$3.join("")} )? _
               { return parseFloat($1+$2.join("")+$3+$4) }

doubleQuotedCharacter
  : simpleDoubleQuotedCharacter
  / simpleEscapeSequence
  / zeroEscapeSequence
  / hexEscapeSequence
  / unicodeEscapeSequence
  / eolEscapeSequence

simpleDoubleQuotedCharacter: !('"' / "\\" / eolChar) . { return $2 }

singleQuotedLiteral: "'" singleQuotedCharacter* "'" { return $2.join("") }

singleQuotedCharacter
  : simpleSingleQuotedCharacter
  / simpleEscapeSequence
  / zeroEscapeSequence
  / hexEscapeSequence
  / unicodeEscapeSequence
  / eolEscapeSequence

simpleSingleQuotedCharacter: !("'" / "\\" / eolChar) . { return $2 }
simpleEscapeSequence: "\\" !(digit / "x" / "u" / eolChar) . {
  return $3
    .replace("b", "\b")
    .replace("f", "\f")
    .replace("n", "\n")
    .replace("r", "\r")
    .replace("t", "\t")
    .replace("v", "\v")
}

zeroEscapeSequence: "\\0" !digit { return "\0" }

hexEscapeSequence: "\\x" hexDigit hexDigit {
  return String.fromCharCode(parseInt("0x" + $2 + $3))
}

unicodeEscapeSequence: "\\u" hexDigit hexDigit hexDigit hexDigit {
  return String.fromCharCode(parseInt("0x" + $2 + $3 + $4 + $5))
}

eolEscapeSequence: "\\" eol { return $2 }

digit: [0-9]

hexDigit: [0-9a-fA-F]
