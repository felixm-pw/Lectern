// React
import React from 'react'
// Internal
import Bar from './Bar.jsx'
import Modules from './ModRender.jsx'

class Home extends React.Component{
  constructor(){
      super()
      this.state = {
          
      }
  }

  render(){
    return(
      <div>
        <div>
          <Bar />
        </div>
        <div style={{margin: 20}}>
          <Modules />
        </div>
        
      </div>    
    )
  }
}
export default Home