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

function checkAuth() {
    if (localStorage.accessToken) {
        document.getElementById('sign-in').remove()
        const acc_info = document.getElementById('acc-info')
        acc_info.className = ''
        acc_info.innerHTML = `<p>Welcome back!</p>`
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

    const response = await fetch('http://localhost:8000/api/auth/token/login/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })

    const responseJson = await response.json()


    console.log('response', responseJson)

    localStorage.accessToken = responseJson['auth_token']

    window.location.href = "homepage.html"
}


async function get_recipe_collections() {
    const url = `http://127.0.0.1:8000/api/lists/`

    let response = await fetch(url)

    if (response.status === 200) {
        return await response.json()
    }
    console.log("Had a problem, no such collection:")
    console.log(response)
}


async function create_category_markup(category_json) {
    const recipe_array = [];

    for (let recipe of category_json['recipes']) {
        const _ = await create_card_markup(recipe)
        recipe_array.push(_)
    }


    return `
    <div class="my-5 border-top">
        <h1>${category_json['header']}</h1>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 justify-content-center" id="forYou">
            ${recipe_array.join('\n')
    }
        </div>
    </div>
    `
}


async function create_card_markup(recipe_json) {
    if (recipe_json['strMealThumb'] === '') {
        recipe_json['strMealThumb'] = await get_rand_img_url()

    }
    return `<div class="col">
        <a href="recipe.html?id=${recipe_json['id']}"><div class="card h-100 data-card-id="${recipe_json['id']}"" style="max-height: 200px; overflow: hidden;">
                    <img src="${recipe_json['thumbnail_link']}" class="card-img-top" alt="Card image"
                         style="max-height: 100px; object-fit: cover;">
                        <div class="card-body">
                            <div class="h5 card-title fw-bold">${recipe_json['header']}</div>
                        </div>
                </div></a>
    </div>`
}



async function main() {
    const page_contents = await get_recipe_collections()
    const categories_div = document.getElementById('categories_div')

    for (let category of page_contents) {
        categories_div.innerHTML += await create_category_markup(category)
    }

    await substitute_src('carouselExample')
    await substitute_src('big_card')
    checkAuth()
}

main().then()