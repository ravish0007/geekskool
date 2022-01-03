#!/usr/bin/env node

const nullParser = input => {
  if (!input.startsWith('null')) return null
  return [null, input.slice(4).trim()]
}

const booleanParser = input => {
  if (!input.startsWith('true') && !input.startsWith('false')) return null
  if (input.startsWith('true')) return [true, input.slice(4).trim()]
  return [false, input.slice(5).trim()]
}

const colonParser = input => {
  if (!input.startsWith(':')) return null
  return [':', input.slice(1).trim()]
}

const commaParser = input => {
  if (!input.startsWith(',')) return null
  return [',', input.slice(1).trim()]
}

const stringParser = input => {
  // const regex = /^ " ([^"\n\r\t\\\\]* | \\\\ ["\\\\bfnrt/] | \\\\ u [0-9a-f]{4} )* "/     SO/questions/2583472
  const regex = /^\s*\"((\\([\"\\\/bfnrt]|u[a-fA-F0-9]{4})|[^"\\\0-\x1F\x7F]+)*)\"\s*/
  const match = input.match(regex)
  if (!match) return null
  return [match[0].slice(1, match[0].length - 1), input.slice(match[0].length).trim()]
}

const numberParser = input => {
  // const regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/
  const regex = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/    // regex for json numbers  SO/questions/13340717/
  const match = input.match(regex)
  if (!match) return null
  return [parseFloat(match[0]), input.slice(match[0].length).trim()]
}

const objectParser = input => {
  if (!input.startsWith('{')) return null

  let buffer; let key; let value; let colon; let comma; const temp_object = {}
  input = input.slice(1).trim()

  if (input[0] == '}') {                      // handles empty object
    return [temp_object, input.slice(1).trim()]
  }

  while (input) {
    buffer = stringParser(input)
    if (buffer == null) return null;

    [key, input] = buffer

    buffer = colonParser(input)
    if (buffer == null) return null;

    [colon, input] = buffer

    buffer = valueParser(input)
    if (buffer == null) return null;

    [value, input] = buffer

    temp_object[key] = value

    if (input[0] == '}') {
      return [temp_object, input.slice(1).trim()]
    }

    buffer = commaParser(input)
    if (buffer == null) {
      return null
    }

    [comma, input] = buffer
  }
}

const arrayParser = input => {
  if (!input.startsWith('[')) return null

  let buffer; let value; let comma; const temp_arr = []
  input = input.slice(1).trim()

  if (input[0] == ']') {                      // handles empty array
    return [temp_arr, input.slice(1).trim()]
  }

  while (input) {

    buffer = valueParser(input)
    if (buffer == null) return null;

    [value, input] = buffer

    temp_arr.push(value)

    if (input[0] == ']') {
      return [temp_arr, input.slice(1).trim()]
    }

    buffer = commaParser(input)
    if (buffer == null) {
      return null
    }

    [comma, input] = buffer
  }
}

const valueParser = input => {

  return (nullParser(input) || booleanParser(input) || stringParser(input) || arrayParser(input) || numberParser(input) || objectParser(input))

}

const fs = require('fs')

function execFile(jsonFile) {
  fs.readFile(jsonFile, 'utf-8', function(err, data) {
    if (err) {
      return console.log(err)
    }

    let valid = true

    let result; let input; let buffer

    try {
      buffer = valueParser(data);
      [result, input] = buffer
      console.log(buffer, '|', result, '|', input)

      if (input) valid = false
      if (typeof result !== 'object') valid = false

    } catch (error) {
      console.log(error)
      valid = false
    }

    if (valid) {
      console.log('PASS', jsonFile)
      console.log(JSON.stringify(result, null, 2))
    } else {
      console.log('FAIL: ', jsonFile)
    }
  })
}

function main() {
  const dir = './testfiles_json/'

  // list all files in the directory
  fs.readdir(dir, (err, files) => {
    if (err) {
      throw err
    }

    // files object contains all files names
    // log them on console
    files.forEach(file => {
      execFile(dir + file)
    })
  })
}

execFile(process.argv[2])

// main()
