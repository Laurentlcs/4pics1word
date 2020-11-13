import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import "./index.css"

import './conf/axios-conf'
import * as axios from 'axios';

import Images from './components/Images'

let compteur = 0

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: null,
      response: ''
    };
  }

  getImages = async () => {

    const queryWord = [
      'nature',
      'felin',
      'montagne',
      'bebe',
      'cinema',
      'plage',
      'cuisiner',
      'football'
    ]

    const query = compteur === queryWord.length ? (compteur = 0, queryWord[compteur]) : queryWord[compteur]

    this.setState({query})

    const images = await axios
                  .get('/search/', { params: { query, per_page: 4 }})
                  .then( image => image.data.photos.map((img, index) => ({
                    id: index,
                    src: img.src.medium
                  })))

    compteur ++

    this.setState({ images })
  }

  setResponse = (response) => {
    this.setState({response})
  }

  checkImage = () => {
    const { query, response } = this.state
    if (query === response) {
      this.getImages()
      this.setState({response: ""})
    }
  }

  componentDidMount() {
    this.getImages()
  }

  render() {
    return (
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div style={{maxWidth: "40vh", minWidth: "40vh"}} className="d-flex flex-column border bg-light">

          <div className="d-flex justify-content-center align-items-center flex-row flex-wrap">
            <Images images={this.state.images} />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <input style={{textAlign: "center", fontWeight: "bolder"}} value={this.state.response} className="w-100 pl-5 pr-5 ml-3 mr-3" onChange={ e => this.setResponse(e.target.value)}/>
            <button className="btn btn-outline-success btn-sm w-50 m-3 p-1" onClick={this.checkImage}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>

        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
