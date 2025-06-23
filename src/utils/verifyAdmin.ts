import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function verifyAdmin() {
    const cookieStore = await cookies() // <-- await aici
    const token = cookieStore.get('token')?.value

    if (!token) {
        throw new Error('Lipsă token de autentificare')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    // verifică rol admin în decoded

    return decoded
}
