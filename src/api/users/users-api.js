import client from "@/api/api";

export default {
    signIn(email, password) {
        return client.post('users/sign-in', {
            data: {
                type: 'users',
                attributes: {
                    email,
                    password
                }
            }
        })
    },
    signUp(name, email, password) {
        return client.post('users', {
            data: {
                type: 'users',
                attributes: {
                    name,
                    email,
                    password
                }
            }
        })
    },
    me() {
        return client.get('users/me')
    },
    logout() {
        return client.post('users/logout')
    }
}
