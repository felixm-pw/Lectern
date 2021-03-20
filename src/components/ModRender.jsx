// React
import React from 'react'
// Material Ui
import { Button, Grid, Typography, Paper, CircularProgress } from '@material-ui/core'
// External
import {Redirect} from 'react-router-dom'
import axios from 'axios'
// Internal 
import netcfg from '../network/local-config.js'

class modules extends React.Component{
    constructor(){
        super();
        this.subject_render = this.subject_render.bind(this)
        this.page_move = this.page_move.bind(this)
        this.state = {
            move: "",
            data: []
        }
    }

    componentDidMount(){
        axios({
          method: 'get',
          url: 'http://'+netcfg.ip_address+':'+netcfg.port+'/api/listMod',
          responseType: 'json'
        })
        .then((response) => {
            this.setState({
                data: response.data
            })
        })
        .catch((error) => {
            console.log(error)
        });
    }

    render(){
        return(
            <div>
                <Grid container spacing={2}>
                    {this.subject_render()}
                </Grid>
                {this.state.move}
            </div>
        )
    }
 
    subject_render(){
        if (this.state.data.length === 0) {
            return(
                <div style={{textAlign: 'center', marginTop: 100, width: "100%"}}>
                    <CircularProgress />
                </div>
            )
        } else {
            return (
                <>
                    {this.state.data.map((foundSubject, index) => (
                        <Grid item xs={12} md={6} lg={4}>
                            <Paper elevation={3} style={{padding: 10, height: 30, justifyContent: 'center'}}>
                                <Typography variant="h6" style={{fontSize: 16, color: "#757575"}}>
                                    {foundSubject.ModuleName}<Button variant="outlined" style={{height: 30, fontSize: 10, float: "right", color: "#757575"}} onClick={() => this.page_move(index)}>View</Button>
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </>
            )
        }
    }

    page_move(x){
        this.setState({
            move: <Redirect push to={{pathname: "/module", state: {modName: this.state.data[x].ModuleName}}} />
        })
    }
}

export default modules;