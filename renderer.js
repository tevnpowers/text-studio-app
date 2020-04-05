// renderer.js
const zerorpc = require("zerorpc")
let client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242")

async function tokenizeText(text) {
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

async function openProject(path) {
  let promise = new Promise((resolve, reject) => {
    let project = {}
    client.invoke("open_project", path, (error, res) => {
      if (error) {
        console.error(error)
      }
      else {
        project = res;
      }
      resolve(project);
    })
  });
  return await promise;
}

module.exports = {
  openProject,
  tokenizeText
}