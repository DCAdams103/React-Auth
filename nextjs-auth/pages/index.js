import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, {Component, useState} from 'react'
import {
  signIn,
  signOut,
  useSession
} from 'next-auth/client'

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

    const [session, loading] = useSession()
    return (
      <div className={styles.page}>

        <form onSubmit={handleSubmit}>
          <input id="email" type="text" name="email" value={email} 
                  onChange={(e) => setEmail(e.target.value)} />

          <textarea id="pass" name="pass" value={pass} 
                  onChange={(e) => setPass(e.target.value)} />
        </form>

        {!session && <button onClick={handleSubmit}>Click me</button>}
        {session && <p>Signed in as {session.user.name} <br/> <a href='/api/auth/signout'>Sign Out</a> </p>}
        {!session && <p><a href="/api/auth/signin">Sign in</a></p>}
          
      </div>
    )
}