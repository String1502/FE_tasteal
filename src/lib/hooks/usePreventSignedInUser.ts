import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

export default function usePreventSignedInUser() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            // Navigate user back if they've already signed in.
            navigate('/');
        });

        return () => unsubscribe();
    }, [navigate]);
}
