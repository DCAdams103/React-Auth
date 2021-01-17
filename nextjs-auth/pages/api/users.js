import { getEntry } from '../lib/swr-hooks'
import React from 'react'
var bcrypt = require('bcryptjs')
const saltRounds = 10;

export function findUser(email)
{
    test(email)
}

export default function test(email)
{
    const { data } = getEntry(email)
    if(data !== null)
    {
        return (
            <div> Test </div>
        )
    }

    return false;
}