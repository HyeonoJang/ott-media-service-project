import axios from "axios";

export async function signup(email, password) {
    console.log("signup", email, password);

    return await axios({
        method: 'put',
        url: 'http://localhost:8080/auth/signup',
        data: {
            email,
            password
        }
    })
}

export async function login(email, password) {
    console.log("login", email, password);
    return await axios({
        method: 'post',
        url: 'http://localhost:8080/auth/login',
        data: {
            email,
            password
        }
    })
}
