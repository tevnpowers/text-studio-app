import React from 'react';
import './index.css';

const { ipcRenderer } = require('electron');
const {
  SUBMIT_TEXT,
  TOKENIZE_TEXT
} = require('../../utils/constants.js')


function TokensList(props) {
    const tokens = []
    for (let i = 0; i < props.tokens.length; i++) {
      tokens.push(<li key={i}>{props.tokens[i]}</li>);
    }
    return (
      <ul className="tokens-list">
        {tokens}
      </ul>
    );
}

class TextForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          tokens: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        ipcRenderer.send(SUBMIT_TEXT, this.state.value);
        ipcRenderer.once(TOKENIZE_TEXT, (event, arg) => {
            this.setState({
                value: this.state.value,
                tokens: arg
            });
        });
    }
  
    render() {
      return (
        <div>
          <label>
            Text:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
          <TokensList tokens={this.state.tokens} />
        </div>
      );
    }
}

export default TextForm;