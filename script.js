
const search = document.getElementById('search-input');
let data = [];
const form = document.getElementById('custom-form')

search.addEventListener('keyup', (e) => {
    const searchText = e.target.value;
    const filtered = data.filter(photo => {
        return (
            photo.title.toLowerCase().includes(searchText)
        );
    })
    console.log(filtered);

    displayPhotos(filtered);
})

const displayPhotos = (data = []) => {
    const photos = document.querySelector('.photos');

    while (photos.hasChildNodes()) {
        photos.removeChild(photos.firstChild);
    }

    data.map((photo) => {
        const photoNode = createPhotoNode(photo);
        photos.appendChild(photoNode);
    })
}

const getPhotos = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
        data = await res.json()
        displayPhotos(data)
    } catch (error) {
        console.error(error);
    }
}

getPhotos();

const addCustomPhoto = (e) => {
    e.preventDefault();
    const photos = document.querySelector('.photos');
    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('img-url').value;
    const customPhoto = { title: title, thumbnailUrl: imageUrl }
    const photoNode = createPhotoNode(customPhoto);
    photos.appendChild(photoNode);
}

form.addEventListener('submit', addCustomPhoto);

const createPhotoNode = (photo) => {
    const imgElement = document.createElement('div');
    imgElement.classList.add('photo');
    const imgTitle = document.createElement('h3');
    imgTitle.classList.add('title');
    const images = document.createElement('img');
    images.classList.add('images')
    const removeMark = document.createElement('span');
    removeMark.classList.add('remove-mark');
    removeMark.innerHTML = '❌'
    removeMark.addEventListener('click', () => {
        imgElement.remove()
    });
    imgTitle.innerHTML = photo.title;
    images.src = photo.thumbnailUrl;
    imgElement.appendChild(removeMark);
    imgElement.appendChild(imgTitle);
    imgElement.appendChild(images);

    return imgElement;
}