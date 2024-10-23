const params = new URLSearchParams(document.location.search);
let search = params.get('search')
console.log(search)
if (search) {
    document.getElementById('search-result').textContent = `results for ${search}`;
    document.getElementById('form-global-search').placeholder = search
} else {
    document.getElementById('search-result').textContent = "No search term provided.";
}