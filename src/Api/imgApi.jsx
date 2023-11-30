export default async function getImages( inputValue, page = 1 ) {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '20024521-fb937c8208773011b51cef6d9'

    return await fetch(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json());
}