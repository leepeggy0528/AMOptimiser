import {createAuthProvider} from 'react-token-auth'

export const {useAuth, authFetch, login, logout} = createAuthProvider({
        accessTokenKey: 'access_token',
        storage:localStorage,
        onUpdateToken: (token) => fetch('http://127.0.0.1:5000/signIn/refresh', {
            method: 'POST',
            body: token.refresh_token,
            user: token.user,
        })
        .then(r => r.json())
    })