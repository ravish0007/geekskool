// Exceptions
function throwSyntaxError(error) {
    throw error;
}


// Types
let Symbol_ = token => String(token);   //try inheriting String

// Parsing: parse, tokenize, and read_from_tokens
function tokenize(chars) {
     // Convert a string of characters into a list of tokens.
    return chars.replace(/\(/g, '( ').replace(/\)/g, ' ) ').split(' ').filter(Boolean);
}

function parse(program) {
    // Read a Scheme expression from a string.
    return read_from_tokens(tokenize(program));
}

function read_from_tokens(tokens) {
    // Read an expression from a sequence of tokens.
    if (tokens.length == 0) {
        thowSyntaxError('unexpected EOF');
    }

    token = tokens.shift();

    if (token == '(') {
        let L = [];
        while (tokens[0] != ')') {
            L.push(read_from_tokens(tokens));
        }
        tokens.shift();  // pop off ')'
        return L;
    }

    else if(token == ')') {
        throwSyntaxError('unexpected )');
    }

    else return atom(token);
}



function atom(token) {
    // Numbers become numbers; every other token is a symbol.
        let num = Number(token);
        if(!Number.isNaN(num)) return num;
        return Symbol_(token);
}


// Environments
function standard_env() {
    
    // An environment with some Scheme standard procedures.

    let env = new Env();

    env.update(Math);  //sin, cos, sqrt, pi...

    env.update({
        '+' : (a, b) => a + b,
        '-' : (a, b) => a - b,
        '*' : (a, b) => a * b,
        '/' : (a, b) => Math.floor(a/b), 
        '>' : (a, b) => a > b,
        '<' : (a, b) => a < b,
        '>=' : (a, b) => a >= b,
        '<=' : (a, b) => a <= b,
        '=' : (a, b) => a == b,
        // 'abs' : abs,   exists in Math
        'append' : (l1, l2) => [...l1, ...l2],  
        // 'apply' : apply, Not defined, seems like reducer
        'begin' : (...x) => x[x.length - 1],
        'car' : x => x[0],
        'cdr' : x => x.slice(1),
        'cons' : (x,y) => [x, y],  // more resolution (obj1 is car, obj2 is cdr)
        'eq?' : (a,b) => a == b,
        'equal?' : (a, b) => a === b,
        'length' : x => x.length, 
        'list' : (...x) => x, 
        'list?' : x => Array.isArray(x), 
        'map' : x => x.map,        // more resolution
        // 'max' : max,  exists in Math
        // 'min' : min,  exists in Math
        'not' : x => !x,
        'null?' : x => x.length == 0, 
        'number?' : x => (typeof x ==  'number' && !isNaN(x)),
        'procedure?' : x => typeof x == 'function',
        // 'round' : round, exists in Math
        'symbol?' : x => typeof x == 'string',            // better way of identifying as symbol
    })

    return env;
}

class Env {

    update(env, outer=null) {
      Object.getOwnPropertyNames(env).map(property => this[property] = env[property]);
      this['outer'] = outer;
    }

    find(var_) {
        return this.hasOwnProperty(var_) ? this : this.outer.find(var_);
    }

}


let global_env = standard_env();

// eval
function eval(x, env=global_env) {
    // Evaluate an expression in an environment.

    if(typeof x == 'string')        // variable reference    // better way of identifying Symbol
        return env[x];

    else if(typeof x == 'number')      // constant number
        return x;                

    else if(x[0] == 'if') {               // conditional
        let [_, test, conseq, alt] = x;
        let exp = eval(test, env) ? conseq : alt;
        return eval(exp, env);
    }

    else if(x[0] == 'define') {           // definition
        let [_, symbol, exp] = x;
        env[symbol] = eval(exp, env);
    }

    else {                           // procedure call
        proc = eval(x[0], env);
        args = x.slice(1).map(arg => eval(arg, env));
        return proc(...args);
    }
}

// Interaction: A REPL
const readline = require('readline')
const rl =  readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

function repl() {
    rl.question("lis.js> ", function(input) {

        input = input.trim()

        if (input == "(exit)"){
            rl.close();
        } else {
            let val = eval(parse(input));
            console.log(val);
            repl();
        }
    });
}

repl()


// def lispstr(exp):
//     // "Convert a Python object back into a Lisp-readable string."
//     if isinstance(exp, List):
//         return '(' + ' '.join(map(lispstr, exp)) + ')'
//     else:
//         return str(exp)



// Test
let x = '((hello x x))'
let r = '(+ 2 2)'
let program = "(begin (define r 10) (* pi (* r r)))"
let pprogram = "(* 3.14 (* 10 10))"
let proogram = "(define r 10)"

// console.log(typeof parse(r))
// console.log(eval(parse(program)))
// console.log(global_env)
// console.log(typeof atom('1'))
// console.log(typeof atom('('))
// console.log(typeof atom('begin'))
// console.log(typeof atom('1.451'))
// console.log(parse(r));
// console.log(eval(parse(r)), 2);
// console.log(global_env);


