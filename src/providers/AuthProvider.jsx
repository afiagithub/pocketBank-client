import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const axiosPublic = useAxiosPublic();
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, image=null) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            // if (currentUser) {
            //     const userInfo = { email: currentUser.email }
            //     axiosPublic.post('/jwt', userInfo)
            //     .then(res => {
            //         if(res.data.token){
            //             localStorage.setItem('access-token', res.data.token)
            //         }
            //     })
            // }
            // else {
            //     localStorage.removeItem('access-token')
            // }
            setLoading(false)
        });

        return () => {
            unSubscribe();
        }

    }, [])

    const logOut = () => {
        setUser(null)
        return signOut(auth)
    }

    const AuthInfo = { user, setUser, loading, setLoading, createUser, signInUser, updateUserProfile, logOut }

    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;