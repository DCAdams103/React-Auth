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
    const [session, loading] = useSession()
    return (
      <div className={styles.page}>
        

        {session && <p>Signed in as {session.user.email} <br/> <a href='/api/auth/signout'>Sign Out</a> </p>}
        {!session && <p><a href="/api/auth/signin">Sign in</a></p>}
          
      </div>
    )
}