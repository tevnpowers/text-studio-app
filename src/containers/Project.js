import React from 'react';
import TextForm from './Form';
import DatasetEditor from './DatasetEditor';
import './index.css';

const { ipcRenderer } = require('electron');
const { OPEN_PROJECT } = require('../../utils/constants.js')


class Panel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            maxHeight: null
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
    }

    updateDimensions() {
        this.setState({
            maxHeight: document.body.scrollHeight
        })
    }

    render() {
        const divStyle = {
            maxHeight: (this.props.isExpanded ? this.state.maxHeight : 0) + "px",
        };
        let config = []
        if (this.props.path) {
            config.push(<p key="path">{"Path: " + this.props.path}</p>)
        }
        for (let key in this.props.config) {
            config.push(<p key={key}>{key + ": " + this.props.config[key]}</p>)
        }

        return (
        <div className="panel" style={divStyle}>
            {config}
        </div>
        );
    }
}

class ProjectNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        }

        this.expandNode = this.expandNode.bind(this);
    }

    render() {
        let node = null
        if (this.props.isData) {
            node = <DatasetEditor
                      id={this.props.id}
                      config={this.props.config}
                      isExpanded={this.state.isExpanded}
                    />
        } else {
            node = <Panel
                      config={this.props.config}
                      isExpanded={this.state.isExpanded}
                    />
        }
        return (
        <div>
            <button className="accordion" onClick={this.expandNode}>{this.props.name}</button>
            {node}
        </div>
    )};

    expandNode() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }
}

class Project extends React.Component {
    constructor(props) {
      super(props);
      this.setIpcFuncs = this.setIpcFuncs.bind(this);

      this.state = {
          info: null,
          author: null,
          created: null,
          saved: null,
          loaders: [],
          data: [],
          annotators: [],
          actions: [],
          pipelines: []
      };
      this.setIpcFuncs();
    }

    render() {
      let nodes = []
      for (let i = 0; i< 10; i++) {
          // nodes.push(<ProjectNode key={i} index={i} text={sampleText}/>)
      }

      return (
        <div>
          <TextForm />
          <div>
            <label>
                {this.state.author ? "Author: " + this.state.author : "" }
            </label>
          </div>
          <div>
            <label>
                {this.state.created ? "Created at: " + this.state.created : "" }
            </label>
          </div>
          <div>
            <label>
                {this.state.saved ? "Last Save: " + this.state.saved : "" }
            </label>
          </div>
          <div>
            <label>Dataset Loaders</label>
            <div>
            {this.state.loaders.map((loader) =>
                <ProjectNode
                   key={loader["id"]}
                   name={loader["name"]}
                   config={loader["config"]}
                   isData={false}
                />
            )}
            </div>
          </div>
          <div>
            <label>Datasets</label>
            <div>
            {this.state.data.map((dataset) =>
                <ProjectNode
                  key={dataset["id"]}
                  id={dataset["id"]}
                  name={dataset["path"]}
                  path={dataset["path"]}
                  config={dataset["config"]}
                  isData={true}
                />
            )}
            </div>
          </div>
          <div>
            <label>Annotators</label>
            <div>
            {this.state.annotators.map((annotator) =>
                <ProjectNode
                  key={annotator["id"]}
                  name={annotator["name"]}
                  path={annotator["path"]}
                  config={annotator["config"]}
                  isData={false}
                />
            )}
            </div>
          </div>
          <div>
            <label>Actions</label>
            <div>
            {this.state.actions.map((action) =>
                <ProjectNode
                  key={action["id"]}
                  name={action["name"]}
                  path={action["path"]}
                  config={action["config"]}
                  isData={false}
                />
            )}
            </div>
          </div>
          <div>
            <label>Pipelines</label>
            <div>
            {this.state.pipelines.map((pipe) =>
                <ProjectNode
                  key={pipe["id"]}
                  name={pipe["name"]}
                  isData={false}
                />
            )}
            </div>
          </div>
        </div>
      );
    };

    setIpcFuncs() {
        ipcRenderer.on(OPEN_PROJECT, (event, arg) => {
            let info = JSON.parse(arg)
            this.setState({
                author: info["metadata"]["author"],
                created: info["metadata"]["created"],
                saved: info["metadata"]["saved"],
                loaders: info["loaders"],
                data: info["data"],
                annotators: info["annotators"],
                actions: info["actions"],
                pipelines: info["pipelines"],
            });
        });
    }
}

export default Project;