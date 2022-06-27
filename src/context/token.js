import axios from "axios";

export default function logIn(token, email, password){
    console.log("Login", email, password);

    axios({
        method: 'post',
        url: 'http://localhost:8080/auth/login',
        data: {
            email,
            password,
        }
    })
}

