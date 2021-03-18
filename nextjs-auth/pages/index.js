import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from 'react'
import {
  useSession
} from 'next-auth/client'
import { getEntry } from './lib/swr-hooks'
import { Box, Grid, TextField, Button } from '@material-ui/core'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'

export default function Home()
{
  {/* React Hooks */}  
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  
  const router = useRouter()

  // Variables for bcrypt to encrypt password
  const bcrypt = require('bcryptjs')
  const saltRounds = 10

  useEffect( () => {
    setEmail('')
    setPass('')
  }, [])

  const cookies = new Cookies()
  const {data} = getEntry(email)

  // Compares the user inputted password to the database hash.
  async function comparePass(dbHash)
  {

    // Make sure that data is not undefined.
    if(!data) return false;
    
    // Use bcrypt to compare the user inputted password to the hash in the database.
    const match = await bcrypt.compare(pass, dbHash)

    // Return the promise
    return match

  }

  function submit()
  {
    {/* Stores the email in a cookie which will be accessed in the new page */}
    const cookies = new Cookies()
    
    // Set the 'email' cookie globally
    cookies.set('email', email, {path:'/'})

    // Once this promise is fulfilled, run the function to check if the password matched.
    comparePass(data.pass).then(function(results){

      if(email && pass && results)
      {
        // Global cookies
        cookies.set('id', data.id, {path:'/'})
        cookies.set('created_at', data.created_at, {path:'/'})
        cookies.set('desc', data.description, {path:'/'})
        
        // Go to the profile page
        router.push(`/profile/${data.id}`)

      } else if (!email || !pass)
      {
        setErr('Please enter your email and password.')
      }
      else if(!results)
      {
        setErr('Incorrect password.')
      }
    })
    
  }

    return (
      <div className={styles.page}>

        {/* Centers the components in the middle of the screen */}
        <Grid container
              spacing={0}
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}>

          <Box className={styles.inputs}>

            <p style={{paddingBottom:'1vh'}} />
            <header className={styles.signIn}> Sign in</header>
            <header className={styles.signIn} style={{fontSize:'30px'}}> or <a href="/create"> create an account</a> </header>
            
            {/* If err has a value, show the error message */}
            {err && <header className={styles.signIn} style={{fontSize:'20px', color:'red'}}> {err} </header>}
            
            {/* Text Field for user to input their email */}
            <p style={{paddingBottom:'1vh'}} />
            <TextField required id="email" label="Email" variant="filled" color="secondary" style={{width:'20rem'}}
                      onChange={(e) => setEmail(e.target.value)} // When the field changes, store the textfields value in the email hook.
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 40px rgb(42,0,65)'}, 
                        }} />

            {/* Text Field for user to input their password */}
            <p style={{paddingBottom:'1vh'}} />
            <TextField required id="password" label="Password" variant="filled" color="secondary" style={{width:'20rem'}}
                      onChange={(e) => setPass(e.target.value)} // When the field changes, store the textfields value in the pass hook.
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 30px rgb(42,0,65)'}, 
                        }} />

            {/* The Sign In button will lead the user to a new page and display their accounts data if their account is located in the db */}
            <p style={{paddingBottom:'1vh'}} />
            <Button variant="contained" color="primary" onClick={submit} > Sign In </Button>
            <p style={{paddingBottom:'1vh'}} />

          </Box>

        </Grid>
          
      </div>
    )
}