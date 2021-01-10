import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    innercomp: <textarea rows="4" cols="100" id="textinput" />,
    mode: 'text',
    sentimentOutput: [],
    sentiment: true,
  };

  renderTextArea = () => {
    document.getElementById('textinput').value = '';
    if (this.state.mode === 'url') {
      this.setState({
        innercomp: <textarea rows="6" cols="100" id="textinput" />,
        mode: 'text',
        sentimentOutput: [],
        sentiment: true,
      });
    } else if (this.state.mode === 'text') {
      this.setState({
        innercomp: <textarea rows="6" cols="100" id="textinput" />,
      });
    }
  };

  renderTextBox = () => {
    document.getElementById('textinput').value = '';
    if (this.state.mode === 'text') {
      this.setState({
        innercomp: <textarea rows="8" cols="100" id="textinput" />,
        mode: 'url',
        sentimentOutput: [],
        sentiment: true,
      });
    }
  };

  sendForSentimentAnalysis = () => {
    this.setState({ sentiment: true });
    let ret = '';
    let url = 'http://localhost:8080';

    if (this.state.mode === 'url') {
      url =
        url + '/url/sentiment/' + document.getElementById('textinput').value;
    } else {
      url =
        url +
        '/text/sentiment/?text=' +
        document.getElementById('textinput').value;
    }

    ret = axios.get(url);
    ret
      .then((response) => {
        let output;

        if (response.data.split('"')[5] === 'positive') {
          output = (
            <div style={{ color: 'green', fontSize: 20 }}>{response.data}</div>
          );
        } else if (response.data.split('"')[5] === 'negative') {
          output = (
            <div style={{ color: 'red', fontSize: 20 }}>{response.data}</div>
          );
        } else {
          output = (
            <div style={{ color: 'orange', fontSize: 20 }}>{response.data}</div>
          );
        }
        this.setState({ sentimentOutput: output });
      })
      .catch((err) => {
        console.error('There was an error in axios: ', err);
      });
  };

  sendForEmotionAnalysis = () => {
    this.setState({ sentiment: false });
    let ret = '';
    let url = 'http://localhost:8080';
    if (this.state.mode === 'url') {
      url = url + '/url/emotion/' + document.getElementById('textinput').value;
    } else {
      url =
        url +
        '/text/emotion/?text=' +
        document.getElementById('textinput').value;
    }

    ret = axios.get(url);
    ret
      .then((response) => {
        let trimdata = response.data
          .split('/emotion is')[1]
          .split('{')[1]
          .split('}')[0]
          .split(',');

        this.setState({
          sentimentOutput: <EmotionTable emotions={trimdata} />,
        });
      })
      .catch((err) => {
        console.error('There was an error in axios: ', err);
      });
  };

  render() {
    return (
      <div className="App">
        <button
          className="btn btn-info"
          id="text-btn"
          onClick={this.renderTextArea}
        >
          Text
        </button>
        <button className="btn btn-dark" onClick={this.renderTextBox}>
          URL
        </button>
        <br />
        <br />
        {this.state.innercomp}
        <br />
        <button
          className="btn-primary"
          id="sentiment-btn"
          onClick={this.sendForSentimentAnalysis}
        >
          Analyze Sentiment
        </button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>
          Analyze Emotion
        </button>
        <br />
        {this.state.sentimentOutput}
      </div>
    );
  }
}

export default App;
