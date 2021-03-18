import { NextApiHandler } from 'next'
import { query } from '../lib/db'

const handler: NextApiHandler = async (req, res) => {
    const {id, desc} = req.body
    try {
        if (!id || !desc){ 
            return res
                .status(400)
                .json({ message: '`id` or `desc` is empty.'})
        }

        const results = await query(
            `
            UPDATE users SET description = ? WHERE id = ?
            `, 
            [desc, id]
        )
        return res.json(results)
    } catch(e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler