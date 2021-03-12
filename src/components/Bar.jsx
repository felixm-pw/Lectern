// React
import React from 'react'
// Material Ui
import {IconButton, AppBar, Typography, Toolbar} from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School'
// External
import { Redirect } from 'react-router-dom'

class Bar extends React.Component {
    constructor(){
        super()
        this.page_move = this.page_move.bind(this)
        this.state = { 
            move: ""
        }
    }

    render(){
        return(
            <div style={{margin: 0}}>
              <AppBar position="static" style={{width: "100%", backgroundColor: "#ffffff"}}>
                    <Toolbar>
                    <IconButton edge="start" aria-label="menu" onClick={() => this.page_move()}>
                        <SchoolIcon/>
                    </IconButton>
                        <Typography variant="h6" style={{color: "#757575"}}>Lectern</Typography>
                    </Toolbar>
                </AppBar>

                {this.state.move}

            </div>
        )
    }

    page_move(x){
        this.setState({
            move: <Redirect push to={{pathname: "/home"}} />
        })
    }

}
export default Bar