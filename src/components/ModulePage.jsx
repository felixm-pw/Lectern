// React
import React from 'react'
// Material Ui
import {Button, List, Grid, Typography, Paper, Divider, Accordion, AccordionSummary, AccordionDetails, ListItem, CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EventIcon from '@material-ui/icons/Event'
import MailIcon from '@material-ui/icons/Mail'
import PhoneIcon from '@material-ui/icons/Phone'
import FolderIcon from '@material-ui/icons/Folder'
// External
import axios from 'axios'
// Internal
import Bar from './Bar.jsx'
import netcfg from '../network/local-config.js'

class ModulePage extends React.Component{
  constructor(){
      super()
      this.list_render_lecture = this.list_render_lecture.bind(this)
      this.list_render_lab = this.list_render_lab.bind(this)
      this.staff_render = this.staff_render.bind(this)
      this.render_page = this.render_page.bind(this)

      this.state = {
        data: [],
        open: false,
        video_url: "",
        video_title: "",
      }
  }

  componentDidMount(){
    var data = { modName: this.props.location.state.modName }
    axios({
      method: 'post',
      url: 'http://'+netcfg.ip_address+':'+netcfg.port+'/api/callMod',
      responseType: 'json',
      data: data
    })
    .then((response) => {
      this.setState({
        data: response.data
      })
      console.log(this.state.data)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  render(){
    return(
      <div>
        <Bar />
        <div style={{margin: 10}}>
          {this.render_page()}
        </div>
      </div>  
    )
  }

  render_page(){
    if (this.state.data.length === 0) {
      return(
        <div style={{textAlign: 'center', marginTop: 100}}>
          <CircularProgress />
        </div>
      )
    } else {
      var semester1 = "Semester-1"
      var semester2 = "Semester-2"
      return(
        <Grid container spacing={2}>

          <Grid item xs={12} md={12} lg={12}>
              <Paper style={{padding: 10}}>
                <Typography variant="h6">{this.state.data.ModuleName}</Typography>
              </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
              <Paper style={{padding: 10, minHeight: 90}}>
                <AccountCircleIcon style={{float: "left", marginTop: 3, marginRight: 8, color: "#757575"}}/>
                <Typography variant="h6" style={{color: "#757575"}}>Staff</Typography>
                <Divider style={{marginBottom: 10}} />
                {this.staff_render()}
              </Paper>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
              <Paper style={{padding: 10, minHeight: 90}}>
                <EventIcon style={{float: "left", marginTop: 3, marginRight: 8, color: "#757575"}}/>
                <Typography variant="h6" style={{color: "#757575"}}>Meetings & Live Events</Typography>
                <Divider style={{marginBottom: 10}} />
                <a href={this.state.data.Zoom} target="_blank">
                  <Button variant="contained" fullWidth={true} style={{backgroundColor: "#2d96ff", color: "white"}}>
                    Join Zoom Room
                  </Button>
                </a>
              </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FolderIcon style={{float: "left", marginTop: 3, marginRight: 8, color: "#757575"}}/>
                <Typography variant="h6" style={{color: "#757575"}}>Semester 1</Typography>
              </AccordionSummary>
              <AccordionDetails>                   
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography>Lectures</Typography>
                    <Divider />
                    {this.list_render_lecture(semester1)}
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Typography>Labs</Typography>
                    <Divider />
                    {this.list_render_lab(semester1)}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FolderIcon style={{float: "left", marginTop: 3, marginRight: 8, color: "#757575"}}/>
                <Typography variant="h6" style={{color: "#757575"}}>Semester 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Typography>Lectures</Typography>
                  <Divider />
                    {this.list_render_lecture(semester2)}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Typography>Labs</Typography>
                  <Divider />
                  {this.list_render_lab(semester2)}
                </Grid>
              </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid> 

          {/* {this.video_render("Semester-1")} */}

        </Grid>
      )
    }
  }

  staff_render(){
    return(
      <>
        {this.state.data.Staff.map((staff) => (
          <div>
            <Typography style={{fontSize: 14}}>{staff.name}
            <a href={"mailto:"+staff.email} target="_blank" style={{textDecoration: "none"}}>
              <IconButton size="small" style={{float: "left", marginRight: 2}}>
                <MailIcon style={{fontSize: 15}} />
              </IconButton>
            </a>
              <IconButton size="small" style={{float: "left", marginRight: 2}}>
                <PhoneIcon style={{fontSize: 15}} />
              </IconButton>
            </Typography>
          </div>
        ))}
      </>
    )
  }

  list_render_lecture(semester_number){
    return(
      <List>
        {this.state.data.Content.[semester_number].Lectures.map((lectures) => (
          <ListItem button onClick={() => console.log("")}>
            <Typography style={{marginRight: 6}}>{lectures.Title}: </Typography>
            <Typography>{lectures.Subtitle}</Typography>
          </ListItem>
        ))}
      </List>
    )
  }

  list_render_lab(semester_number){
    return(
      <List>
        {this.state.data.Content.[semester_number].Labs.map((labs) => (
          <a href={labs.Links} target="_blank" style={{textDecoration: "none", color: "black"}}>
            <ListItem button>
              <Typography style={{marginRight: 6}}>{labs.Title}: </Typography>
              <Typography>{labs.Subtitle}</Typography>
            </ListItem>
          </a>
        ))}
      </List>
    )
  }

}
export default ModulePage