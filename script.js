
const search = document.getElementById('search-input');
let data = [];
const form = document.getElementById('custom-form');
let modalForm = document.querySelector('.modal-form');
let modalClose = document.querySelector('.close-modal');
let updateBtn = document.querySelector('.save-btn');

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
    const title = document.getElementById('title').value;
    const imageUrl = document.getElementById('img-url').value;

    if (!validateForm(title, imageUrl)) {
        return;
    }

    const customPhoto = { title: title, thumbnailUrl: imageUrl };
    const photoNode = createPhotoNode(customPhoto);
    const photos = document.querySelector('.photos');
    photos.appendChild(photoNode);
}

function validateForm(title, imageUrl) {
    let isValid = true;
    const titleError = document.getElementById('text-error');
    if (title == '') {
        titleError.textContent = 'The field must be filled out!'
        isValid = false;
    } else {
        titleError.textContent = '';
    }
    const imageUrlError = document.getElementById('img-error');
    if (!imageUrl.match(/^https?:\/\/.+\/.+$/)) {
        imageUrlError.textContent = 'Type a valid url!';
        isValid = false;
    } else {
        imageUrlError.textContent = '';
    }

    return isValid;
}

form.addEventListener('submit', addCustomPhoto);


const createPhotoNode = (photo) => {
    const imgElement = document.createElement('div');
    imgElement.classList.add('photo');
    const imgTitle = document.createElement('h3');
    imgTitle.classList.add('title');
    const images = document.createElement('img');
    images.classList.add('images')
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    const modalBtn = document.createElement('button');
    modalBtn.innerHTML = 'Edit';
    modalBtn.classList.add('modal-btn');
    modalBtn.addEventListener('click', function () {
        modalForm.classList.add('modal-active');
        const title = document.querySelector('.edit-title');
        const imageUrl = document.querySelector('.edit-url');
        title.value = photo.title
        imageUrl.value = photo.thumbnailUrl;
        updateBtn.relatedBox = imgElement;
    });
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
    imgElement.appendChild(modalContainer);
    modalContainer.appendChild(modalBtn);

    return imgElement;
}

modalClose.addEventListener('click', function () {
    modalForm.classList.remove('modal-active');
})

updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('.edit-title').value;
    const imageUrl = document.querySelector('.edit-url').value;
    if (!editFormValidate(title, imageUrl)) {
        return;
    }
    const box = e.target.relatedBox;
    box.querySelector('.title').innerHTML = title;
    box.querySelector('.images').src = imageUrl;
    modalForm.classList.remove('modal-active');
});

function editFormValidate(title, imageUrl) {
    let isValid = true;
    const titleError = document.getElementById('edit-text-err');
    if (title == '') {
        titleError.textContent = 'The field must be filled out!'
        isValid = false;
    } else {
        titleError.textContent = '';
    }
    const imageUrlError = document.getElementById('edit-url-err');
    if (!imageUrl.match(/^https?:\/\/.+\/.+$/)) {
        imageUrlError.textContent = 'Type a valid url!';
        isValid = false;
    } else {
        imageUrlError.textContent = '';
    }

    return isValid;
}