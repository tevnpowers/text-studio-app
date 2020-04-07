import React from 'react';
import './index.css';
const { ipcRenderer } = require('electron');
const { LOAD_DATA, ACCEPT_DATA } = require('../../utils/constants.js')

let MAX_TEXT_CHARS = 75;

class DatasetEditor extends React.Component {
    constructor(props) {
        super(props)
        this.loadingData = false
        this.state = {
            maxHeight: null,
            isLoaded: false,
            data: []
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

        if (!this.state.isLoaded && !this.loadingData) {
            this.loadingData = true
            this.loadData()
        }

        let rows = []
        for (let index in this.state.data) {
            if (this.state.data[index]["story_content_content"]) {
                rows.push(<div key={index}>{this.state.data[index]["story_content_content"].slice(0, MAX_TEXT_CHARS)}</div>)
            }
        }

        return (
            <div className="panel" style={divStyle}>
                {rows}
            </div>
        );
    }

    loadData() {
        console.log("sending data!")
        ipcRenderer.send(LOAD_DATA, this.props.id);

        ipcRenderer.once(ACCEPT_DATA, (event, arg) => {
            console.log("got data back!", arg)
            console.log(arg)
            this.setState({
                data: arg
            });
        });
    }
}

export default DatasetEditor;