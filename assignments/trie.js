class Node {
  constructor(value) {
    this.value = value
    this.isEndOfWord = false
    this.children = {}
  }
}

class Trie {

  constructor() {
    this.root = new Node(null)
  }

  insert(word) {
    let current = this.root

    word = word.toLowerCase()

    for (let character of word) {
      if (current.children[character] === undefined) {
        current.children[character] = new Node(character)
      }

      current = current.children[character]
    }

    current.isEndOfWord = true
  }

  search(word) {
    let current = this.root

    word = word.toLowerCase()

    for (let character of word) {
      if (current.children[character] === undefined) {
        return false
      }

      current = current.children[character]
    }

    return current.isEndOfWord
  }


  autocomplete(prefix) {

    let current = this.root
    prefix = prefix.toLowerCase()

    let possibleWords = []
    let tempStringContainer = prefix.split('')

    //try descending till prefix
    for (let character of prefix) {
      if (current.children[character] === undefined) {
        return false
      }
      current = current.children[character]
    }

    // dfs on associated children
    this.enumerate(current, tempStringContainer, possibleWords)
    return possibleWords
  }

  enumerate(node, stringcontainer, store) {
    if (node.isEndOfWord) {
      store.push(stringcontainer.join(''))
    }

    for (let key in node.children) {
      this.enumerate(node.children[key], [...stringcontainer, key], store)
    }

  }

}



const trie = new Trie()


// Interaction: A REPL
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function repl() {
  rl.question('*> ', function(input) {
    input = input.trim().split(' ')

    if (input[0] === 'i') {
      trie.insert(input[1])
    }
    else if (input[0] === 's') {
      let words = trie.autocomplete(input[1])

      words.sort()

      for (let word of words) {
        console.log(word[0].toUpperCase() + word.slice(1))
      }
    }
    repl()
  })
}

// Test repl
repl()
