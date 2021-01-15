import mysql from 'serverless-mysql'

export const db = mysql({
    config: {
        host: '127.0.0.1',
        database: 'db1',
        user: 'root',
        password: 'bella',
    },
})

export async function query(
    q: string,
    values: (string | number)[] | string | number = []
) {
    try {
        const results = await db.query(q, values)
        await db.end()
        return results
    } catch (e) {
        throw Error(e.message)
    }
}