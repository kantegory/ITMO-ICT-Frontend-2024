function checkAuth() {
    if (localStorage.accessToken) {
        window.location.href = "homepage.html"
    }
}

async function register(event) {
    event.preventDefault()

    const inputs = Array.from(event.target.querySelectorAll('input'))

    const loginData = {}

    for (const input of inputs) {
        loginData[input.name] = input.value
    }

    console.log('login data', loginData)

    const response = await fetch('http://localhost:3000/accounts/register', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const responseJson = await response.json()

    const { accessToken, user } = responseJson

    console.log('response', responseJson)

    localStorage.accessToken = accessToken
    localStorage.user = JSON.stringify(user)

    window.location.href = "homepage.html"
}

document.addEventListener('DOMContentLoaded', () => checkAuth())