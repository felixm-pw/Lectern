// React
import React from 'react'
// Material Ui
import {Select,  } from '@material-ui/core'
// External
import ReactPlayer from 'react-player'
// Internal

class video_player extends React.Component{
    constructor(){
        super()
        this.close_dialog = this.close_dialog.bind(this)
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

            //             <ReactPlayer width={'100%'} height={'100%'} url={"https://s3.amazonaws.com/subtitle.static.kieransmith.aws.com/files/"+this.state.video_id+"/"+this.state.video_id+".mp4"} controls={true} pip={true} />
        )
    }

    close_dialog(){
        
    }

}

export default video_player