async function get_recipe_description(id) {
    const api_url = `http://127.0.0.1:8000/api/recipes/${id}/`
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

async function get_comments(id) {
    const api_url = `http://127.0.0.1:8000/api/comments/?recipe_id=${id}`
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

function get_table_entry(ingredient) {

    let product = ingredient[`ingredient_name`]
    let quant = `${ingredient['quantity_si']} ${ingredient['unit_si']}`

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

        return `<div class="container justify-content-center align-content-center">${response_json['html']}</div>
        `
    } else {
        console.log("HTTP-Error: " + response.status)
        return 'Lorem ipsum dolor sit amet.'
    }

}

function generate_stars(n_stars) {
    let buffer = ''
    for (let i = 0; i < 10; i++) {
        if (i < n_stars) {
            buffer += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n' +
                '  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n' +
                '</svg>'
        } else {
            buffer += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">\n' +
                '  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>\n' +
                '</svg>'
        }
    }
    return buffer
}

function get_comment_html({id, rating, header, content_text, author}) {
    return `<div class="row pt-3" style="border: 1px solid black;">
        <div class="col-2" data-card-id="${id}">
            <img alt="" class="img-fluid" src="https://thispersondoesnotexist.com/" style="border-radius: 50px;">
        </div>
        <div class="col">
            <div class="row"><strong>${header}</strong></div>
            <div class="row"><i>${author['username']}</i></div>
            <div class="row"><i>${content_text}</i></div>
            <div class="row float-end">
                <p>
                    ${generate_stars(rating)}
                </p>
            </div>
        </div>
    </div><hr>`
}

function checkAuth() {
    if (localStorage.accessToken) {
        document.getElementById('sign-in').remove()
        const acc_info = document.getElementById('acc-info')
        acc_info.className = ''
        acc_info.innerHTML = `<p>Welcome back!</p>`
        return
    }
    document.getElementById('comment-form').remove()

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

async function post_comment(event) {
    event.preventDefault()
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = parseInt(urlParams.get('id'))

    // determine who we are commenting

    const fields = Array.from(event.target.querySelectorAll('input'))
    console.log(fields)

    const comment_data = {
        "header": fields[0].value,
        "content_text": fields[1].value,
        'rating': fields[2].value
    }

    console.log('comment:', comment_data)

    const response = await fetch(`http://127.0.0.1:8000/api/comments/?recipe_id=${productId}`, {
        method: "POST",
        body: JSON.stringify(comment_data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.accessToken}`
        }
    })

    const responseJson = await response.json()


    console.log('response', responseJson)
    window.location.href = `recipe.html?id=${productId}`
}


async function main() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = parseInt(urlParams.get('id'))

    // detect what recipe we are looking at

    let contents = await get_recipe_description(productId)
    let comments = await get_comments(productId)


    // fetch all necessary info

    document.getElementById('article_header').innerText = contents['header']
    document.getElementById('article_image').src = contents['thumbnail_link']
    document.getElementById('article_author').innerText = contents['author']['username']


    for (let ingredient of contents['ingredients']) {
        let table_entry = get_table_entry(ingredient)

        document.getElementById('product_table').tBodies[0].innerHTML += table_entry
        document.getElementById('product_table_sm').tBodies[0].innerHTML += table_entry
    }

    document.getElementById('article_text').innerText = contents['content_json']['text']

    // finished building recipe

    for (let i of comments) {
        document.getElementById('comments').innerHTML += get_comment_html(i)
    }
}


document.addEventListener('DOMContentLoaded', () => checkAuth())
main()