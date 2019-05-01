import React from 'react'
import axios from 'axios'
import './App.css'

const API_KEY = '6e630f7b-a0bb-41a9-ac2a-5b195704e848'

const constructApiCallUrl = (line1, line2, imageId) =>
  `http://version1.api.memegenerator.net//Instance_Create?languageCode=en&generatorID=45&imageID=${imageId}&text0=${line1}&text1=${line2}&apiKey=${API_KEY}`

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

class App extends React.Component {
  state = {
    memeUrl: '',
    line1: 'fancy pant',
    line2: 'get lap dance',
    imageId: 30
  }

  componentDidMount() {
    this.fetchMemeImage()
  }

  handleSubmit = event => {
    event.preventDefault()
    this.fetchMemeImage()
  }
  fetchMemeImage = async () => {
    const {
      data: {
        result: { instanceImageUrl }
      }
    } = await axios.get(
      constructApiCallUrl(
        this.state.line1,
        this.state.line2,
        this.state.imageId
      )
    )
    this.setState({ memeUrl: instanceImageUrl })
  }
  handleClickNext = () => {
    this.setState({ imageId: this.state.imageId + Math.random() })
    this.fetchMemeImage()
  }
  handleClickPrevious = () => {
    this.setState({ imageId: this.state.imageId - 1 })
    this.fetchMemeImage()
  }

  handleSurpriseMe = () => {
    this.setState({ imageId: getRandomIntInclusive(1, 500) })
    this.fetchMemeImage()
  }

  render = () => (
    <div className="App">
      <header className="App-header">
        <button onClick={this.handleClickPrevious}>previous</button>
        <img src={this.state.memeUrl} className="App-logo" alt="logo" />
        <button onClick={this.handleClickNext}>next</button>
        <p>
          <button onClick={this.handleSurpriseMe}>surprise me</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          hi
        </a>
        <form>
          <label htmlFor="line1">
            whatever bitch
            <input
              name="line1"
              value={this.state.line1}
              placeholder="line 1"
              onChange={event => this.setState({ line1: event.target.value })}
            />
          </label>
          <br />
          <input
            value={this.state.line2}
            placeholder="line 2"
            onChange={event => this.setState({ line2: event.target.value })}
          />
          <button onClick={this.handleSubmit}>submit</button>
        </form>
      </header>
    </div>
  )
}

export default App
