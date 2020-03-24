// renderer.js

const zerorpc = require("zerorpc")
let client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:1234")

let textBox = document.querySelector('#textBox')
let result = document.querySelector('#result')
textBox.addEventListener('input', () => {
  client.invoke("tokenize", textBox.value, (error, res) => {
    if(error) {
      console.error(error)
    } else {
      result.textContent = res
    }
  })
})
textBox.dispatchEvent(new Event('input'))