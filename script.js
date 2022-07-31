
const search = document.getElementById('search-input');
let data = [];

search.addEventListener('keyup', (e) => {
    const searchText = e.target.value;
    const filtered = data.filter((photo) => {
        return (
            photo.title.toLowerCase().includes(searchText)
        );
    })
    console.log(filtered);

    displayPhotos(filtered);
})

const displayPhotos = (data = []) => {
    const photos = document.querySelector('.photos');

    data.map((photo) => {
        const imgElement = document.createElement('div');
        imgElement.classList.add('photo');
        const imgTitle = document.createElement('h3');
        imgTitle.classList.add('title');
        const images = document.createElement('img');
        images.classList.add('images')
        const removeMark = document.createElement('span');
        removeMark.classList.add('remove-mark');
        removeMark.innerHTML = 'X'
        removeMark.addEventListener('click', remove);
        imgTitle.innerHTML = photo.title;
        images.src = photo.thumbnailUrl;
        imgElement.appendChild(removeMark);
        imgElement.appendChild(imgTitle);
        imgElement.appendChild(images);
        photos.appendChild(imgElement);
    })
}


const getPhotos = async () => {

    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
        data = await res.json()
        displayPhotos(data)
    } catch (error) {
        console.error(err);
    }
}


function remove() {
    document.querySelector('.photo').remove();
}

getPhotos();




// const search = () => {
//     let input = document.getElementById('#search-input');
//     let filter = input.value.toUpperCase();
//     let div = document.querySelector('.photo');
//     let h3;
//     let textValue;
//     for (let i = 0; i < data.length; i++) {
//         h3 = div[i].getElementsByTagName('h3')[0];
//         textValue = h3.textContent || h3.innerText;
//         if (textValue.toUpperCase().indexOf(filter) > -1) {
//             h3[i].style.display = "";
//         } else {
//             h3[i].style.display = "none";
//         }
//     }
//     displayPhotos(textValue);
// }
