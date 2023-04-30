import { getEnv } from "./env";

export const login = async (loginFields) => {
    // const response = await fetch(`${getEnv()}/api/login`, {
    const response = await fetch(`http://localhost:65095/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            UserEmail: loginFields.email,
            UserPassword: loginFields.password
        })
    })
    if (!response.ok) {
        console.log("response not ok");
        throw new Error('Data could not be fetched!')
    } else {
        console.log("response is ok");
        return response.text()
    }
}

export const signup = async (loginFields) => {
    debugger;
    const response = await fetch(`${getEnv()}/api/signup`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            Email: loginFields.email,
            Password: loginFields.password1,
            SurName: loginFields.last_name,
            FirstName: loginFields.first_name
        })
    })
    if (!response.ok) {
        throw new Error('Data could not be fetched!')
    } else {
        return response.text()
    }
}
