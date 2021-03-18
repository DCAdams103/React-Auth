import { NextApiHandler } from 'next'
import { query } from '../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const {email, hashed} = req.body
    try {
        if (!email || !hashed){ 
            return res
                .status(400)
                .json({ message: '`email` and `pass` are both empty.'})
        }

        const results = await query(
            `
            INSERT INTO users (email, pass)
            VALUES (?, ?)
            `, 
            [email, hashed]
        )
        return res.json(results)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler