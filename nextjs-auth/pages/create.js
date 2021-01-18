import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { Grid, Box, Button, TextField } from '@material-ui/core'

export default function CreateAccount()
{
    {/* React Hooks */}
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [hashed, setHash] = useState('')

    var bcrypt = require('bcryptjs')
    const saltRounds = 10

    {/* Runs everytime the pass object is changed */}
    useEffect( () => {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(pass, salt, function(err, hash) {
                setHash(hash)
            })
        }, [pass])
    })

    {/* Runs when the Create Account button is clicked. 
        Creates an entry in the database under the table 'users' */}
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
                    hashed,
                }),
            })
    
            const json = await res.json()
    
            if (!res.ok) throw Error(json.message)
            
        } catch(e) {
            throw Error(e.message)
        }

        router.push('/signin')

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

            <header className={styles.signIn}> Create an Account </header>

            {/* Text Field for user to input their email */}
            <p style={{paddingBottom:'1vh'}} />
            <TextField required id="email" label="Email" variant="filled" color="secondary" style={{width:'20rem'}}
                      onChange={(e) => setEmail(e.target.value)}
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 40px rgb(42,0,65)'}, 
                        }} />

            {/* Text Field for user to input their password */}
            <p style={{paddingBottom:'1vh'}} />
            <TextField required id="password" label="Password" variant="filled" color="secondary" style={{width:'20rem'}}
                      onChange={(e) => setPass(e.target.value)}
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 30px rgb(42,0,65)'}, 
                        }} />

            {/* Text Field for user to input their password again to confirm it. Logic will be added in the future */}
            <p style={{paddingBottom:'1vh'}} />
            <TextField required id="password" label="Confirm Password" variant="filled" color="secondary" style={{width:'20rem'}}
                      onChange={(e) => setPass(e.target.value)}
                      inputProps={{ 
                        style: {backgroundColor: 'rgba(255,255,255, .7)', 
                                borderRadius:'60px', 
                                boxShadow: '5px 5px 30px rgb(42,0,65)'}, 
                        }} />
            
            {/* When clicked, the handleSubmit function will access the database and create the users account. */}
            <p style={{paddingBottom:'1vh'}} />
            <Button variant="contained" color="primary"  onClick={handleSubmit}> Create Account </Button>
            
            <p style={{paddingBottom:'1vh'}} />
          </Box>

        </Grid>
        </div>
    )
}