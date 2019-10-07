import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import Food from './Food'
import './App.css';

const API_URL = 'http://localhost:4000';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.state.nameToPost = '';
    this.state.scoreToPost = '';
    this.state.topScores = [];
  }

  componentDidMount() {
    superagent.get(`${API_URL}/foods`)
    .then(results => {
      this.props.loadStore(results.body);
      this.findTopScore(results.body)
    });
  }

  handleNameChange = (event) => {
    this.setState({nameToPost: event.target.value})
  }

  handleScoreChange = (event) => {
    this.setState({scoreToPost: event.target.value})
  }

  findTopScore(results) {
    if (results.length){
      let topScore = results[0].score;
      console.log(topScore)
      let topScores = results.filter(food => food.score >= topScore);
      this.setState({topScores: topScores});
      console.log(topScores);
    }
  }

  handlePost = (event) => {
    event.preventDefault();
    superagent.post(`${API_URL}/foods`)
    .send({name: this.state.nameToPost, score: this.state.scoreToPost})
    .set('Accept', 'application/json')
    .then(results => {
      console.log(results);
      this.props.loadStore(results.body);
      this.findTopScore(results.body);
    })
      .catch(console.log);
  };

  render() {
    return(
      <>
      <h1>Scores</h1>
      <ul> {
          this.props.foods.map(food => 
            // this.state.topScores.includes(food) ? 'High Score!' : ''
          <Food id={this.state.topScores.includes(food)} key={food.id} food={food}/>
          )
        }
      </ul>

      <form onSubmit={this.handlePost}>
            Food:
            <input name="food" onChange={this.handleNameChange}/> 
            Score:
            <input score="score" onChange={this.handleScoreChange}/>
          <button> Add Score </button>
      </form>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  foods: state.foods,
});

const mapDispatchToProps = (dispatch) => ({
  loadStore : (foods) => {
    dispatch({
      type: 'FOODS_LOAD',
      payload: foods,
    });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
