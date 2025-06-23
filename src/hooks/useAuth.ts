import { useEffect, useState } from 'react';

interface User {
    name: string;
    email: string;
}

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            setUser(null);
            return;
        }

        fetch('/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else if (res.ok) {
                    return res.json();
                }
            })
            .then(data => {
                if (data) setUser(data);
            })
            .catch(() => {
                localStorage.removeItem('token');
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return { user, loading };
}
