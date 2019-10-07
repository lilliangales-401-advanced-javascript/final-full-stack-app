import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

const API_URL = 'http://localhost:4000';

class Food extends React.Component {
  
  handleDelete = (event) => {
    event.preventDefault();

    superagent.delete(`${API_URL}/foods/${this.props.food._id}`)
    .then(results => {
      this.props.loadStore(results.body);
    })
    .catch(console.log);
  };

  render() {
    return (
      <li key={this.props.food.id}>
        {this.props.food.name} - {this.props.food.score}
        <button onClick={this.handleDelete}> Delete </button>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadStore: (foods) => {
    dispatch({
      type: 'FOODS_LOAD',
      payload: foods,
    });
  },
});

export default connect(null, mapDispatchToProps)(Food);