import React, {useState, useEffect} from "react"

import Task from "./task"

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
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
  },
}));

const TaskRunner = ({tasks}) => {
    
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    const handleTagClick = (value) => {
        // value is tag id passed from Task component
        console.log(value)
    }
    
    const taskList = tasks.map((task) => {
        return <Task task={task} handleToggle={handleToggle} handleTagClick={handleTagClick} checked={checked}/>
    })

    return (
        <List className={classes.root}>
            {taskList}
        </List>
    )
}

export default TaskRunner
