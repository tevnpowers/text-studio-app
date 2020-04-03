// renderer.js
const zerorpc = require("zerorpc")
let client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242")

async function tokenizeText(text) {
  console.log("Input", text)
  let promise = new Promise((resolve, reject) => {
    let tokens = []
    client.invoke("tokenize", text, (error, res) => {
      if (error) {
        console.error(error)
      }
      else {
        tokens = res;
      }
      resolve(tokens);
    })
  });
  return await promise;
}

module.exports = {
  tokenizeText
}