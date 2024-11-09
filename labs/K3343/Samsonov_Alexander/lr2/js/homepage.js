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

async function get_recipe_description() {
    const api_url = 'https://www.themealdb.com/api/json/v1/1/random.php'
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

async function create_card_markup() {
    let meal_description = await get_recipe_description()
    meal_description = meal_description['meals'][0]
    if (meal_description['strMealThumb'] === '') {
        meal_description['strMealThumb'] = await get_rand_img_url()
    }

    return [
        '<div class="col"><div class="card h-100" style="max-height: 200px; overflow: hidden;"><img src="',
        meal_description['strMealThumb'],
        '\"class="card-img-top\" alt=\"Card image\"\n' +
        '                         style="max-height: 100px; object-fit: cover;">\n' +
        '                    <div class="card-body">\n' +
        '                        <div class="h5 card-title fw-bold">',
        meal_description['strMeal'],
        '</div><p class="card-text">',
        meal_description['strInstructions'],
        '</p></div></div>'
    ].join(' ')
}

async function insert_card(div_id, n_cards = 1) {
    div_element = document.getElementById(div_id)
    for (let i = 0; i < n_cards; i++) {
        let stringHtml = await create_card_markup()
        div_element.innerHTML += stringHtml.trim()
    }
}


async function main() {
    await insert_card('trending', 4)
    await insert_card('forYou', 4)
    await insert_card('cheapneasy', 4)
    await substitute_src('carouselExample')
    await substitute_src('big_card')
}

main()