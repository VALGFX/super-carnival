import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secretulTauSuperSecret'

export async function GET(req: Request) {
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response('Unauthorized', { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    try {
        jwt.verify(token, JWT_SECRET)

        return new Response(JSON.stringify({ message: 'Autentificat' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch {
        return new Response('Unauthorized', { status: 401 })
    }
}
