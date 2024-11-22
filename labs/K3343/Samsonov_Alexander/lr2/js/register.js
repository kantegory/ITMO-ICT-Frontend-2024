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

    const response = await fetch('http://localhost:8000/api/auth/users/', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.status !== 200) {
        console.log('error: ', response)
        return

    }

    const token_request = await fetch(
            'http://localhost:8000/api/auth/token/login/', {
                method: "POST",
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    const token_json = await token_request.json()
    localStorage.accessToken = token_json['auth_token']

    window.location.href = "homepage.html"
}

document.addEventListener('DOMContentLoaded', () => checkAuth())