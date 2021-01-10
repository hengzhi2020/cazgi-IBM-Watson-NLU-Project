import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    const output = this.props.emotions.map((item, i) => (
      <tr key={i}>
        <td>{item.split('"')[1]}</td>
        <td>{item.split('"')[2].substr(2, 10)}</td>
      </tr>
    ));

    return (
      <div style={{ width: 1000, margin: 'auto' }}>
        <table
          className="table table-bordered"
          style={{
            marginTop: 20,
            fontSize: 15,
          }}
        >
          <thead>
            <tr>
              <th> Emotion Name</th>
              <th> Emotion Value</th>
            </tr>
          </thead>
          <tbody>{output}</tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
