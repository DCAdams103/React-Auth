import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getEntry } from './../lib/swr-hooks'
import Cookies from 'universal-cookie'
import styles1 from '../../styles/Profile.module.css'
import { Grid, Box, TextField, withStyles, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = {
    input: {
        color:'white'
    },
    root: {
        color:'white'
    }
}

function signIn(props) 
{
    const cookies = new Cookies()
    const email = cookies.get('email')
    const { data } = getEntry(email)
    const [desc, setDesc] = useState('')

    const router = useRouter()
    const id = router.query.id

    const { classes }  = props;

    useEffect(() => {
        {/* If the data exists, store the data in hooks */}
        if(data !== undefined)
        {
            cookies.set('id', data.id)
            cookies.set('created_at', data.created_at)
            cookies.set('desc', data.description)
        }

    }, [data]) // will run everytime the data variable changes in value.
    
    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
            const res = await fetch('/api/create-desc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    desc,
                }),
            })
    
            const json = await res.json()
    
            if (!res.ok) throw Error(json.message)
            
        } catch(e) {
            throw Error(e.message)
        }
    }
    
    return ( 
        <div className={styles1.page}>

            {/* Centers the components in the middle of the screen */}
            <Grid container
              spacing={0}
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}>
                
                <header className={styles1.title}> Account Information </header>
                
                {/* Displays the users data */}
                <Box className={styles1.data}>
                    <Grid 
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start" 
                    style={{padding:'3%'}}
                    >

                        <header className={styles1.titles}> <b>User ID:</b> {cookies.get('id')} </header>
                        <br/>
                        <header className={styles1.titles}> <b>Email:</b> {cookies.get('email')} </header>
                        <br/>
                        <header className={styles1.titles}> <b>Created At:</b> {cookies.get('created_at')} </header>
                        <br/>
                        <header className={styles1.titles}> <b>Description:</b> </header>
                        <br/>

                        <TextField multiline rows={13} placeholder='    Enter some information!' 
                        style={{backgroundColor:'rgba(236, 236, 236, 0.1)', width:'50%', fontColor:'red'}}
                        defaultValue={cookies.get('desc')}
                        className={classes.root} InputProps={{className:classes.input}} onChange={(e) => setDesc(e.target.value)}>  
                        </TextField>

                        <br/>
                        <Button variant="contained" color="primary" onClick={handleSubmit}> Submit Changes </Button>

                    </Grid>
                    
                </Box>

            </Grid>
        </div>
    )
}

signIn.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signIn)