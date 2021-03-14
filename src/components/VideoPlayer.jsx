// React
import React from 'react'
// Material Ui
import {Select, Paper, MenuItem, Typography, Divider, Button } from '@material-ui/core'
// External
import ReactPlayer from 'react-player'
// Internal
import Bar from './Bar.jsx'
import netcfg from '../network/local-config.js'

class video_player extends React.Component{
    constructor(){
        super()
        this.checkError = this.checkError.bind(this)
        this.menu_render = this.menu_render.bind(this)

        this.state = {
            error: false,
            video_url: "",
            video_ids: [],
            slides: "",
            title: "",
            subtitle: ""
        }
    }

    componentDidMount(){
        if(this.props.location.state.data.length !== 0){
            this.setState({
                video_url: this.props.location.state.data.Links[0],
                video_ids: this.props.location.state.data.Links,
                slides: this.props.location.state.data.Slides,
                title: this.props.location.state.data.Title,
                subtitle: this.props.location.state.data.Subtitle
            })
        }
    }

    render(){
        const handleChange = (event) => {
            this.setState({
                video_url: event.target.value
            })
        }
        return(
            <div>
                <div>
                    <Bar />
                </div>
                <div style={{justifyContent: 'center', textAlign: 'center', display: 'flex'}}>
                   <Paper style={{margin: 10, padding: 10, maxWidth: 1280}}>
                       <div style={{width: "100%", textAlign: "left"}}>
                            <Typography variant="h6" style={{color: "#757575"}}>{this.state.title+": "+this.state.subtitle}</Typography>
                            <Divider style={{marginBottom: 10}} />
                       </div>
                        
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <div style={{display: 'block', maxWidth: 1280, maxHeight: 720}}>
                                {this.checkError()}
                            </div>
                        </div>
                        <div style={{textAlign: 'center', width: '100%'}}>
                            <Select variant="outlined" margin='dense' style={{marginTop: 10, width: "100%", textAlign: "left", color: "#757575"}} onChange={handleChange} defaultValue={this.props.location.state.data.Links[0]}>{this.menu_render()}</Select>
                        </div>
                        <div>
                            <a href={this.state.slides} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
                                <Button variant="outlined" style={{display: "block", marginTop: 10, color: "#757575"}}>Download Slides</Button>
                            </a>
                        </div>
                    </Paper> 
                </div>
            </div>
        )
    }

    checkError(){
        if(this.state.error === true){
            return(
                <div style={{height: '100%', width: '100%'}}>
                    <Typography variant="h6" style={{color: "#757575", marginLeft: 100, marginRight: 100, marginTop: 50, marginBottom: 50}}>Error loading video :(</Typography> 
                </div>
            )
        } else{
            return(
                <ReactPlayer 
                    width={'100%'} 
                    height={'100%'} 
                    url={netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".mp4"} 
                    controls={true} 
                    config={{ file: {
                        attributes: {
                            crossOrigin: 'true'
                        },
                        tracks: [
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".en.vtt", srcLang: 'en', label: 'English'},
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".ar.vtt", srcLang: 'ar', label: 'العربية'},
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".de.vtt", srcLang: 'de', label: 'Deutsch'},
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".es.vtt", srcLang: 'es', label: 'Español'},
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".fr.vtt", srcLang: 'fr', label: 'Français'},
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".pt.vtt", srcLang: 'pt', label: 'Português'},
                          {kind: 'subtitles', src: netcfg.aws_video_location + this.state.video_url + "/" + this.state.video_url + ".zh.vtt", srcLang: 'zh', label: '中国'}
                        ]
                      }}}
                    onError={() => this.setState({error: true})}
                />
            )
        }
    }

    menu_render(){
        return(
            this.state.video_ids.map((video_id, index) => (
                <MenuItem value={video_id} style={{color: "#757575"}}>{"Part " + (index + 1)}</MenuItem>
            ))
        )
    }

}

export default video_player

 