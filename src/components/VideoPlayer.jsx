// React
import React from 'react'
// Material Ui
import {Select, Paper } from '@material-ui/core'
// External
import ReactPlayer from 'react-player'
// Internal
import netcfg from '../network/local-config.js'

class video_player extends React.Component{
    constructor(){
        super()
        this.checkError = this.checkError.bind(this)
        this.state = {
            open: true,
            video_id: ""
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        const episodeSelect = {
            maxWidth:  960,
            margin: 'auto',
            display: 'block',
            textAlign: 'left'
        }
        return(
            <div style={container}>
                <Card bodyStyle={{padding: '0'}} style={card}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <div style={{display: 'block', maxWidth: 960, maxHeight: 540, marginBottom: 10}}>
                            {this.checkError()}
                        </div>
                    </div>
                    <div style={{textAlign: 'center', width: '100%'}}>
                        <Select style={episodeSelect} defaultValue={this.props.location.state.episodeName} onChange={(value) => this.getEpisode(value)} >{this.menuItems()}</Select>
                    </div>
                </Card>
            </div>
        )
    }

    checkError(){
        if(this.state.error === true){
          return(<div style={{height: '100%', width: '100%'}}>Error loading video! :(</div>)
        } else{
            return(
                <ReactPlayer 
                    width={'100%'} 
                    height={'100%'} 
                    url={netcfg.aws_video_location+this.state.video_id+"/"+this.state.video_id+".mp4"} 
                    controls={true} 
                    pip={true} 
                    onError={() => this.setState({error: true})}
                />
            )
        }
    }

}

export default video_player