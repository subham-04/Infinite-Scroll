const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const count =15;
const apiKey = 'Ogp4eCYWx6SZhcTPxn_6vq8mLaEidVVNLrthNJWTnhw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// 

// Helper function to set attributes

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create elements for photos & links, add to DOM

function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    // console.log('total images ', totalImages);
    // Running this function for each object in photosArray

    photosArray.forEach((photo) => {
        // Creating <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })
        // Creating <img> for photo
        const image = document.createElement('img');
        // image.setAttribute('src',photo.urls.regular);
        // image.setAttribute('alt',photo.alt_description);
        // image.setAttribute('title',photo.alt_description);
        setAttributes(image,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Event lisnter checks whether the loading is finished or not
        image.addEventListener('load',imageLoaded);

        // Put <img> inside <a> and <a> inside imageContainer
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}
// Get photos from unsplash
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}

function imageLoaded(){
    
    imagesLoaded++;
    // console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true;
        // console.log('ready = ',ready);
    }
}

// Check the page if it come to an end and scrolling
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){

        getPhotos();
        ready=false;
    }
});


// On load
getPhotos();




