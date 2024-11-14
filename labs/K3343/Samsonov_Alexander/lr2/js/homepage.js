async function get_rand_img_url() {

    const url = 'https://foodish-api.com/api/'

    const options = {
        method: "GET"
    }

    let response = await fetch(url, options)

    if (response.status === 200) {

        const imageJson = await response.json()
        return imageJson.image;
    } else {
        console.log("HTTP-Error: " + response.status)
        return 'https://placehold.co/300x400'
    }
}

async function substitute_src(div_id) {
    let target_img = document.getElementById(div_id).getElementsByTagName('img')
    for (let i = 0; i < target_img.length; i++) {
        target_img[i].src = await get_rand_img_url()
    }
}

async function get_recipe_description(id) {
    const api_url = `http://localhost:3000/recipes/${id}`
    const options = {
        method: "GET"
    }
    let response = await fetch(api_url, options)

    if (response.status === 200) {
        return await response.json()
    } else {
        console.log("HTTP-Error: " + response.status)
        return 'Lorem ipsum dolor sit amet.'
    }

}

function checkAuth() {
    if (localStorage.accessToken) {
        document.getElementById('sign-in').remove()
        const acc_info = document.getElementById('acc-info')
        acc_info.className = ''
        acc_info.innerHTML = `<p>Welcome back, ${JSON.parse(localStorage.user).name}!</p>`
    }
}

async function login(event) {
    event.preventDefault()

    const inputs = Array.from(event.target.querySelectorAll('input'))

    const loginData = {}

    for (const input of inputs) {
        loginData[input.name] = input.value
    }

    console.log('login data', loginData)

    const response = await fetch('http://localhost:3000/login', {
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

async function create_card_markup(recipe_id) {
    let meal_description = await get_recipe_description(recipe_id)
    if (meal_description['strMealThumb'] === '') {
        meal_description['strMealThumb'] = await get_rand_img_url()

    }
    return `<div class="col">
        <a href="recipe.html?id=${meal_description['id']}"><div class="card h-100 data-card-id="${meal_description['id']}"" style="max-height: 200px; overflow: hidden;">
                    <img src="${meal_description['strMealThumb']}" class="card-img-top" alt="Card image"
                         style="max-height: 100px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title fw-bold">${meal_description['strMeal']}</h5>
                            <p class="card-text">${meal_description['strInstructions']}</p>
                        </div>
                </div></a>
    </div>`
}

async function insert_card(div_id, n_cards = 1, range_start = 1) {
    div_element = document.getElementById(div_id)
    for (let i = 0; i < n_cards; i++) {
        let stringHtml = await create_card_markup(range_start + i)
        div_element.innerHTML += stringHtml.trim()
    }
}


async function main() {
    await insert_card('trending', 4, 5)
    await insert_card('forYou', 4)
    await insert_card('cheapneasy', 4, 9)
    substitute_src('carouselExample')
    substitute_src('big_card')
    checkAuth()
}

main()