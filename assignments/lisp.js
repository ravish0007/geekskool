// Exceptions
function throwSyntaxError (error) {
  throw error
}

// Types
const Symbol_ = token => String(token)

// Parsing: parse, tokenize, and read_from_tokens
function tokenize (chars) {
  // Convert a string of characters into a list of tokens.
  return chars.replace(/\(/g, '( ').replace(/\)/g, ' ) ').split(' ').filter(Boolean)
}

function parse (program) {
  // Read a Scheme expression from a string.
  return readFromTokens(tokenize(program))
}

function readFromTokens (tokens) {
  // Read an expression from a sequence of tokens.
  if (tokens.length == 0) {
    throwSyntaxError('unexpected EOF')
  }

  const token = tokens.shift()

  if (token === '(') {
    const L = []
    while (tokens[0] !== ')') {
      L.push(readFromTokens(tokens))
    }
    tokens.shift() // pop off ')'
    return L
  } else if (token === ')') {
    throwSyntaxError('unexpected )')
  } else return atom(token)
}

function atom (token) {
  // Numbers become numbers; every other token is a symbol.
  const num = Number(token)
  if (!Number.isNaN(num)) return num
  return Symbol_(token)
}

// Environments
function standardEnv () {
  // An environment with some Scheme standard procedures.

  const env = new Env()

  env.update(Math) // sin, cos, sqrt, pi...

  env.update({
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.floor(a / b),
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '=': (a, b) => a == b,
    // 'abs' : abs,   exists in Math
    append: (l1, l2) => [...l1, ...l2],
    apply: x => x.reduce, // TODO: fix
    begin: (...x) => x[x.length - 1], // TODO: fix
    car: x => x[0],
    cdr: x => x.slice(1),
    cons: (x, y) => [x, y], // more resolution (obj1 is car, obj2 is cdr)
    'eq?': (a, b) => a == b,
    'equal?': (a, b) => a === b,
    length: x => x.length,
    list: (...x) => x,
    'list?': x => Array.isArray(x),
    map: x => x.map, // more resolution
    // 'max' : max,  exists in Math
    // 'min' : min,  exists in Math
    not: x => !x,
    'null?': x => x.length === 0,
    'number?': x => (typeof x === 'number' && !isNaN(x)),
    'procedure?': x => typeof x === 'function',
    // 'round' : round, exists in Math
    'symbol?': x => typeof x === 'string' // better way of identifying as symbol
  })

  return env
}

class Env {
  update (env, outer = null) {
    Object.getOwnPropertyNames(env).map(property => this[property] = env[property])
    this.outer = outer
  }

  find (var_) {
    return this.hasOwnProperty(var_) ? this : this.outer.find(var_)
  }
}

const globalEnv = standardEnv()

// Procedures
function procedure (params, body, env) {
  // A user-defined Scheme procedure.
  return function (...args) {
    const newEnv = new Env()
    const empty = {}
    for (let i = 0; i < args.length; i++) {
      empty[params[i]] = Number(args[i])
    }
    newEnv.update(empty, env)
    return evaluate(body, newEnv)
  }
}

// eval  rename(eval, evaluate)  remove else ifs
function evaluate (x, env = globalEnv) {
  // Evaluate an expression in an environment.

  if (typeof x === 'string') // variable reference
  { return env.find(x)[x] }

  if (typeof x === 'number') // constant number    //may be elimante due to literal
  { return x }

  if (!Array.isArray(x)) { // constant literal     //might not required
    return x
  }

  if (x[0] == 'quote') { // (quote exp)
    const [_, exp] = x
    return exp
  }

  if (x[0] == 'if') { // conditional
    const [_, test, conseq, alt] = x
    const exp = evaluate(test, env) ? conseq : alt
    return evaluate(exp, env)
  }

  if (x[0] == 'define') { // definition
    const [_, symbol, exp] = x
    env[symbol] = evaluate(exp, env)
    return // env[symbol]   // fixes begin procedure NaN
  }

  if (x[0] == 'set!') { // (set! var exp)
    const [_, var_, exp] = x // might not define for new ones but defines for already defined
    env.find(var_)[var_] = evaluate(exp, env)
    return
  }

  if (x[0] == 'lambda') { // (lambda (var...) body)
    const [_, parms, body] = x
    return procedure(parms, body, env)
  }

  const proc = evaluate(x[0], env)
  const args = x.slice(1).map(arg => evaluate(arg, env))
  return proc(...args)
}

// Interaction: A REPL
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function repl () {
  rl.question('lis.js> ', function (input) {
    input = input.trim()

    if (input == '(debug)') {
      console.log(globalEnv)
      repl()
    } else if (input == '(exit)') {
      rl.close()
    } else {
      const val = evaluate(parse(input))
      if (val != undefined) {
        console.log(lispstr(val))
      }
      repl()
    }
  })
}

// Test repl
repl()

function lispstr (exp) {
  // "Convert a JavaScript object back into a Lisp-readable string.

  if (Array.isArray(exp)) {
    return '(' + exp.map(x => lispstr(x)).join(' ') + ')'
  } else {
    return String(exp)
  }
}
