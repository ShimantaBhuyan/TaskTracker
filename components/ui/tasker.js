import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formDiv: {    
    display: "flex",
    flexDirection: "column",    
    alignItems: "center",
    width: '100%',
    maxWidth: 560,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        maxWidth: 300
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: 600
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: 720
    },
    [theme.breakpoints.down('xl')]: {
        maxWidth: 1000
    },
    '& > *': {
        marginBottom: "10px !important"
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  tagField: {
    display: "none",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),      
  },
  divider: {
      width: "100%"
  }
}));

const getTimeStamp = (date) => {
    const zone = date.toString().split(" ")[5].substring(4)
    return (date.getUTCFullYear() + "-" + (date.getUTCMonth()+1) + "-" + date.getUTCDate() + "T" + date.toTimeString().split(" ")[0] + date.getUTCMilliseconds() + "+" + (zone.substring(0, 2)+":"+zone.substring(2)))
}

const Tasker = ({createTask}) => {
    const classes = useStyles()

    const handleSubmit = (event) => {
        let taskValue = ""
        let tagValue = []
        const tagField = document.querySelector("#tagField").parentNode.parentNode
        let startDateValue = ""
        let endDateValue = ""

        if(Array.from(event.target.classList).includes("MuiButton-label")) {
            taskValue = document.querySelector("#taskField").value
            tagValue = tagField.childNodes[1].firstChild.value.split(',')    
            startDateValue = document.querySelector("#startTime").value
            startDateValue = getTimeStamp(new Date(startDateValue))
            console.log(startDateValue)
            endDateValue = document.querySelector("#endTime").value
            endDateValue = getTimeStamp(new Date(endDateValue))
            console.log(endDateValue)

            if(!taskValue) {
                alert("Please add some title for a task to be created")
            }
            else if(taskValue && !tagValue[0].length) {
                var result = window.confirm("Do you want to submit without adding any tags to your task?")
                if(result){
                    console.log("TASK: "+taskValue + " | STARTDATETIME: "+startDateValue+" | ENDDATETIME: "+endDateValue)
                    var taskData = 
                    {
                        title: taskValue,
                        //startTime: startDateValue,
                        //endTime: endDateValue,
                        //tags: {data: []}
                    }
                    createTask(taskData)
                }
                else{
                    tagField.style.display = "inline-flex"  
                }       
            }
            else if(taskValue && tagValue[0].length){
                console.log("TASK: "+taskValue+" | TAGS: "+tagValue + " | STARTDATETIME: "+startDateValue+" | ENDDATETIME: "+endDateValue)                
                var taskData = 
                {
                    title: taskValue,
                    //startTime: startDateValue,
                    //endTime: endDateValue,
                    //tags: {data : []}
                }
                // let tagData = (tagName) => {
                //     return (
                //         {
                //             tag: {
                //                 data: {
                //                     name: tagName
                //                 }
                //             }
                //         }
                //     )
                // }
                // if(tagValue.length) {         
                //     tagValue.map((tag) => {
                //         taskData.tags.data.push(tagData(tag))
                //     })
                // }
                // console.log(taskData)
                createTask(taskData)
            }
        }
        else if(event.target.getAttribute("id") == "taskField") {
            taskValue = event.target.value
            var charCode = event.key
            if(taskValue && ((event.nativeEvent.type === "keypress" && charCode === "Enter"))) {                
                tagField.style.display = "inline-flex"
            }
            else if(taskValue == "") {
                tagField.style.display = "none"                
            }
        }
        else if(event.target.getAttribute("id") == "tagField"){
            taskValue = document.querySelector("#taskField").value
            tagValue = event.target.value.split(',')            
            var charCode = event.key
            if(tagValue && ((event.nativeEvent.type === "keypress" && charCode === "Enter"))) {  
                console.log("TASK: "+taskValue+" | TAGS: "+tagValue)
            }
        }
    }

    return (
        <div className={classes.formDiv}>
            <TextField
                id="taskField"
                className={classes.textField}
                label="Task"
                style={{ margin: 8 }}
                placeholder="Enter your task here"
                //   helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined"
                onKeyPress={handleSubmit}
                onChange={handleSubmit}
            />
            <TextField
                id="tagField"
                className={classes.tagField}
                label="Tags"
                style={{ margin: 8 }}
                placeholder="Enter your tags here separated by commas"
                //   helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,
                }}
                variant="outlined"
                onKeyPress={handleSubmit}
                onChange={handleSubmit}
            />
            <TextField
                id="startTime"
                label="Start Time"
                type="datetime-local"
                defaultValue="2020-12-18T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="endTime"
                label="End Time"
                type="datetime-local"
                defaultValue="2020-12-19T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="outlined" color="secondary" onClick={handleSubmit}>Submit</Button>
            <Divider variant="middle" className={classes.divider}/>
        </div>
        
        
    )
}

export default Tasker