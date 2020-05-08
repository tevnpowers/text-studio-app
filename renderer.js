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
      } else {
        project = res;
      }
      resolve(project);
    })
  });
  return await promise;
}

async function loadDataset(id) {
  console.log("Loading dataset", id)
  let promise = new Promise((resolve, reject) => {
    let dataset = {}
    client.invoke("load_dataset", id, (error, res) => {
      if (error) {
        console.error(error)
      } else {
        dataset = res;
      }
      resolve(dataset);
    })
  });
  return await promise;
}

async function loadDatasetFromFile(id) {
  console.log("Loading dataset", id)
  let promise = new Promise((resolve, reject) => {
    let dataset = {}
    client.invoke("load_dataset_from_file", id, (error, res) => {
      if (error) {
        console.error(error)
      } else {
        dataset = res;
      }
      resolve(dataset);
    })
  });
  return await promise;
}

async function loadDatasetMock(id) {
  console.log("Loading dataset", id)
  let promise = new Promise((resolve, reject) => {
    let data = {'id': id}
    client.invoke("load_dataset_mock", id, (error, res) => {
      if (error) {
        console.error(error)
      } else {
        data = res;
      }
      resolve(data);
    })
  });
  return await promise;
}

module.exports = {
  openProject,
  tokenizeText,
  loadDataset,
  loadDatasetMock
}