import React, {useState, useEffect} from "react"
import { ApolloClient, InMemoryCache, createHttpLink, gql} from "@apollo/client"
import { setContext } from '@apollo/client/link/context'

import Tasker from "./components/ui/tasker"
import TaskRunner from "./components/ui/taskRunner"

import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const httpLink = createHttpLink({
    uri: 'https://test-323.herokuapp.com/v1/graphql',
});
  
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    //const token = localStorage.getItem('token');
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1xTFFXMDlNTUxRMUNNZGJpV3cwSyJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImdpdGh1YnwzMjU2NjY4MiJ9LCJuaWNrbmFtZSI6IlNoaW1hbnRhQmh1eWFuIiwibmFtZSI6IlNoaW1hbnRhIEtyaXNobmEgQmh1eWFuIiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFyczMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMzI1NjY2ODI_dj00IiwidXBkYXRlZF9hdCI6IjIwMjAtMTItMTlUMDY6MjU6NDcuMzIxWiIsImlzcyI6Imh0dHBzOi8vdGVzdC0zMjMudXMuYXV0aDAuY29tLyIsInN1YiI6ImdpdGh1YnwzMjU2NjY4MiIsImF1ZCI6Ik1yVVMzc1lMSlRTWlozMmlSM3g5SHBBYnczOVZVUlVoIiwiaWF0IjoxNjA4MzU5MTUyLCJleHAiOjE2MDgzOTUxNTIsImF0X2hhc2giOiJLYlRXR1pwM1Q2ZkxRZXhYM3RJQ05BIiwibm9uY2UiOiJMRmhQQm0tM0t-bzNINFBibnhDQTk5XzhvX2NRMHFGQSJ9.UcwNUoBuJ9ozptO-K-TtvBdglbjjnltw_BngGdSQAnpx6JPad3u9N8dX5OjW2G0244vFahjAqdsnXF7DCuxk90x7EgzZjQBHhr99C7WoFxfuBmkyc0eDMEKv6kFD4wRsY8t2J06ZmTgOlzpIYNNU7Jwh81JVWHz5eT07z0q0nRgClboz9bQ7u-EQJw6p8lQHbb0fEbp9aJcpuaIe5a7wUkxE3_rsLIbATc6Oury4Ofc8ZUWqFrPtFdSXj0COcOk9OukJYNRVDIhy3XwyyiXJK5q0UQzf-pNUJ3vlMCz9J8UeMB6TVT_bo1nac8E_dMK8n-WI2WIXTp6klFqt9mQGBg"
    // return the headers to the context so httpLink can read them
    return {
        headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '& h1': {
        marginTop: "0px !important",
        marginRight: "10px !important"
      }
    },
  }));

const Title = ({taskCount}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Badge color="secondary" badgeContent={taskCount}>
            <Typography variant="h3" gutterBottom>
                Task Tracker
            </Typography>
            </Badge>  
        </div>  
    );
  }

const App = () => {
    let [tasks, setTasks] = useState([])
    
    const _tasks = [
        {
            id: 1, 
            title: "1st Task",
            tags: [
                {id: 1, name: "Tag 1st task"}, 
                {id: 2, name: "Tag2 1st task"}, 
                {id: 3, name: "Tag2 1st task"}, 
                {id: 4, name: "Tag2 1st task"}, 
                {id: 5, name: "Tag2 1st task"}, 
                {id: 6, name: "Tag2 1st task"}, 
                {id: 7, name: "Tag2 1st task"}
            ]
        }, 
        {
            id: 2, 
            title: "2nd Task", 
            tags: [
                {id: 8, name: "Tag 2nd task"}
            ]
        }
    ]

    useEffect (() => {      
        //setTasks(_tasks)
        handleGetTasks()
    }, [])    

    /*        
            ${task.tags ? `
                task_tags: {
                    data: [
                        ${task.tags.map((tag) => {
                            `tag: {
                                data: {
                                    name: "${tag.name}"
                                }
                            },`
                        })}                            
                    ]
                }
            ` : ""}               
    */

    const GETTASKSQUERY = gql`
    query{
        tasks{
          created_at
          end_time
          id
          start_time
          tags {
            id
            name
          }
          task_tags {
            tag {
              id
              name
            }
          }
          title
          updated_at
          user {
            email
            id
            name
          }
        }
      }
    `

    const ADDTASKQUERY = gql`
    mutation ($title: String!) {
        insert_tasks(objects: {
            title: $title,  
        }){
            affected_rows
            returning {
                created_at
                id
                title
                start_time
                end_time
                tags {
                    id
                    name
                }
                task_tags {
                    tag {
                        id
                        name
                    }
                }
            }
        }
    }`
    
    const handleGetTasks = async () => {
        const _tasks  = await apolloClient.query({
            query: GETTASKSQUERY
        })

        const __tasks = []
        _tasks.data.tasks.map(task => {
            __tasks.push(task)
        })        
        console.log(__tasks)

        setTasks(__tasks)
    }

    const handleCreateTask = (task) => {
        console.log(task)  

        var title = task["title"]
        console.log(title)

        apolloClient.mutate({
            variables: {"title": task.title /*, startTime: task.startTime, endTime: task.endTime*/},
            mutation: ADDTASKQUERY
        })
        .then(result => {
            console.log(result)
            if(result.data["insert_tasks"]["affected_rows"]) {
                alert("Task added successfully")
                console.log(result.data["insert_tasks"]["returning"])                

                console.log(tasks)
                const __tasks = []
                tasks.map(task => {
                    __tasks.push(task)
                })   
                __tasks.push(result.data["insert_tasks"]["returning"][0])

                setTasks(__tasks)
            }
            else
                alert("Could not add task! Please try again!")
        })
    }

    return(       
        
        <div className="container">           
            {tasks != undefined && tasks.length ? 
            <>
                <Title taskCount={tasks.length}/>
                <Tasker createTask={handleCreateTask}/>
                <TaskRunner tasks={tasks} />
            </> : <p>...Loading</p>}            
        </div>      
        
    )
}

export default App