import React, { Component } from 'react'
import './Components/stylesheet.css'
import Displayer from './Components/Displayer'
import Title from './Components/Title'
import AddVideo from './Components/AddVideo'
import EmotionAnalysis from './Components/EmotionAnalysis'

class App extends Component {
  constructor() {
    super()
    this.state = {
        posts: [{
            videoLink: ""
        }]
    }
}
  
  addVideo(postSubmitted) { //this will change the state of our app.js
    this.setState(state => ({
        posts: [postSubmitted]
    }))
}


  render() {
      return (<div>
          <Title title={'Simon says... '} />

        
          {/* <AddVideo onAddVideo={(addedPost) => {
              this.addVideo(addedPost)
          }}/> */}

          {/* <div className = "video-wrapper">
              <Displayer posts={this.state.posts} />
          </div> */}

          <h1><EmotionAnalysis /></h1>
      </div>
      )
  }
}

export default App;