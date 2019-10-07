import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

const API_URL = 'http://localhost:4000';

class Score extends React.Component {

  handleDelete = (event) => {
    event.preventDefault();

    superagent.delete(`${API_URL}/scores/${this.props.score._id}`)
    .then(results => {
      this.props.loadStore(results.body);
    })
    .catch(console.log);
  };

  render() {
    return (
      <li key={this.props.score.id}>
        {this.props.score.name} - {this.props.score.score}
        <button onClick={this.handleDelete}> Delete </button>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadStore: (scores) => {
    dispatch({
      type: 'SCORES_LOAD',
      payload: scores,
    });
  },
});

export default connect(null, mapDispatchToProps)(Score);