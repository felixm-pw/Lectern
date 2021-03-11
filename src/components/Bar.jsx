// React
import React from 'react'
// Material Ui
import {IconButton, AppBar, Typography, Toolbar} from '@material-ui/core'
import SchoolIcon from '@material-ui/icons/School'
 
class Bar extends React.Component {
    constructor(){
        super()
        this.state = { 

        }
    }

    render(){
        return(
            <div style={{margin: 0}}>
              <AppBar position="static" style={{width: "100%", backgroundColor: "#ffffff"}}>
                    <Toolbar>
                    <IconButton edge="start" aria-label="menu">
                        <SchoolIcon/>
                    </IconButton>
                        <Typography variant="h6" style={{color: "#757575"}}>Lectern</Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default Bar