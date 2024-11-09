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

function get_table_entry(recipe_data, n_row) {
    if (n_row < 1 || n_row > 20) {
        return null
    }
    let product = recipe_data[`strIngredient${n_row}`]
    let quant = recipe_data[`strMeasure${n_row}`]

    if (!product || !quant) {
        return null
    }
    return `<tr><td>${product}</td><td>${quant}</td></tr>`
}

async function create_youtube_embed(youtube_link) {
    const api_url = `https://www.youtube.com/oembed?url=${youtube_link}&format=json`

    const options = {
        method: "GET"
    }
    let response = await fetch(api_url, options)

    if (response.status === 200) {
        let response_json = await response.json()

        return response_json['html']
    } else {
        console.log("HTTP-Error: " + response.status)
        return 'Lorem ipsum dolor sit amet.'
    }

}


async function main() {
    let contents = await get_recipe_description()
    contents = contents['meals'][0]

    document.getElementById('article_header').innerText = contents['strMeal']
    document.getElementById('article_image').src = contents['strMealThumb']
    document.getElementById('product_table_sm').src = contents['strMealThumb']

    for (let i = 1; i < 21; i++) {
        let table_entry = get_table_entry(contents, i)
        if (table_entry === null) {
            break
        }
        document.getElementById('product_table').tBodies[0].innerHTML += table_entry
        document.getElementById('product_table_sm').tBodies[0].innerHTML += table_entry
    }

    document.getElementById('article_text').innerText = contents['strInstructions']
    if (contents['strYoutube']) {
        document.getElementById('main_contents').innerHTML += await create_youtube_embed(contents['strYoutube'])
    }
}

main()