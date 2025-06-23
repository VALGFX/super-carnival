import './globals.css'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secretulTauSuperSecret'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    let user = null
    if (token) {
        try {
            user = jwt.verify(token, JWT_SECRET)
        } catch {
            // token invalid
        }
    }

    return (
        <html lang="en">
        <body>
        {/* Poți folosi aici context, provider, etc, pentru a transmite user în tot app-ul */}
        {children}
        </body>
        </html>
    )
}
