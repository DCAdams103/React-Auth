import { NextApiHandler } from 'next'
import { query } from '../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { email } = req.query
    try {
        if(!email) {
            return res.status(400).json({message: '`id` required'})
        }
        // if (typeof parseInt(id.toString()) !== 'number') {
        //     return res.status(400).json({ message: '`id` must be a number'})
        // }
        const results = await query(
            `
            SELECT id, created_at
            FROM users 
            WHERE email = ?
            `, email
        )
        
        return res.json(results[0])
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler