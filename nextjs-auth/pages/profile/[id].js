import React, { useEffect, useState } from 'react'
import { getEntry } from './../lib/swr-hooks'
import Cookies from 'universal-cookie'
import styles from '../../styles/Profile.module.css'
import { Grid, Box } from '@material-ui/core'

function signIn() 
{
    
    const cookies = new Cookies()
    const email = cookies.get('email')
    const { data } = getEntry(email)
    useEffect(() => {
        {/* If the data exists, store the data in hooks */}
        if(data !== undefined)
        {
            cookies.set('id', data.id)
            cookies.set('created_at', data.created_at)
            
        }

    }, [data]) // will run everytime the data variable changes in value.
    
    return ( 
        <div className={styles.page}>

            {/* Centers the components in the middle of the screen */}
            <Grid container
              spacing={0}
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}>
                
                <header className={styles.title}> Account Information </header>
                
                {/* Displays the users data */}
                <Box className={styles.data}>
                    <Grid 
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start" 
                    style={{padding:'3%'}}
                    >

                        <header className={styles.titles}> <b>User ID:</b> {cookies.get('id')} </header>
                        <br/>
                        <header className={styles.titles}> <b>Email:</b> {cookies.get('email')} </header>
                        <br/>
                        <header className={styles.titles}> <b>Created At:</b> {cookies.get('created_at')} </header>

                    </Grid>
                    
                </Box>

            </Grid>
        </div>
    )
}

export default signIn