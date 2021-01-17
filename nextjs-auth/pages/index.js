import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {useState} from 'react'
import {
  useSession
} from 'next-auth/client'
import { getEntry } from './lib/swr-hooks'
import { findUser } from './api/users'
import { Box, Grid, TextField, Button } from '@material-ui/core'

export default function Home()
{

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch('/api/create-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          pass,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      
    } catch(e) {
      throw Error(e.message)
    }
  }

  function testFunc()
  {
    const results = getEntry("dylancadams1@gmail.com");
    console.log(results)
  }


  const [session, loading] = useSession()
  

    return (
      <div className={styles.page}>

        <Grid container
              spacing={0}
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}>
        
          

          <Box className={styles.inputs}>

            <p style={{paddingBottom:'1vh'}} />
            <header className={styles.signIn}> Sign in</header>
            <header className={styles.signIn} style={{fontSize:'30px'}}> or <a href=""> create an account</a> </header>
            
            <p style={{paddingBottom:'1vh'}} />
            <TextField id="email" label="Email" variant="filled" color="secondary" style={{width:'20vw'}}
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 40px rgb(42,0,65)'}, 
                                }} />
            <p style={{paddingBottom:'1vh'}} />
            <TextField id="password" label="Password" variant="filled" color="secondary" style={{width:'20vw'}}
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 30px rgb(42,0,65)'}, 
                                }} />

            {/* <form onSubmit={handleSubmit}>
              <input id="email" type="text" name="email" placeholder="email" value={email} 
                      onChange={(e) => setEmail(e.target.value)} />
              <br/>
              <input id="pass" name="pass" placeholder="password" value={pass} 
                      onChange={(e) => setPass(e.target.value)} />
            </form> */}
            
            <p style={{paddingBottom:'1vh'}} />
            <Button variant="contained" color="primary"> Sign In </Button>
            {/* <button onClick={testFunc}>Click me</button> */}
            <p style={{paddingBottom:'1vh'}} />
          </Box>

        </Grid>
          
      </div>
    )
}