import React from "react"

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';

const TagButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      fontSize: "10px",
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
      marginTop: "10px !important",
      marginRight: "10px !important",
      padding: "1px 5px 1px 5px"
    }
  }))(Button);
  
const useStyles = makeStyles((theme) => ({
    margin: {
        marginRight: "20px !important",
    },
    timeSection: {
        
    }
}));

const Task = ({task, handleToggle, handleTagClick, checked}) => {
    const classes = useStyles()

    const onTagClick = (event) => {
        handleTagClick(event.target.parentNode.dataset.tagid)
    }

    const tags = task.tags.map(tag => {
        return (
            <TagButton key={tag.id} variant="contained" color="primary" onClick={onTagClick} data-tagid={tag.id}>
                {tag.name}
            </TagButton>
        )
    })

    return (
        <ListItem key={task.id} role={undefined} dense button>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(task.id) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': task.id }} 
              onClick={handleToggle(task.id)}
            />
          </ListItemIcon>
          <ListItemText id={task.id} primary={task.title} secondary={<>{tags}</>} className={classes.margin}/>
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <CommentIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
              <DeleteOutlineIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
}

export default Task