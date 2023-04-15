function getAPOD(date, apiKey) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.url;
      const title = data.title;
      const explanation = data.explanation;

      // update the HTML elements on the page to display the Picture of the Day
      document.getElementById('apod-image').src = imageUrl;
      document.getElementById('apod-image').alt = title;
      document.getElementById('apod-title').textContent = title;
      document.getElementById('apod-explanation').textContent = explanation;

      // add event listener to favorite button to save current image URL to a cookie
      const favoriteButton = document.getElementById('favorite-button');
      favoriteButton.addEventListener('click', () => {
        const favoriteImages = getFavoriteImages();
        favoriteImages.push(imageUrl);
        setFavoriteImages(favoriteImages);
      });
    })
    .catch(error => console.error(error));
}


const launchButton = document.getElementById('launch-button');
const apiKey = '8neWwEflI1jIW6pOV2tUxoUvEaFDShETxqZakc7R';

launchButton.addEventListener('click', () => {
  const date = document.getElementById('date-input').value;
  getAPOD(date, apiKey);
});

//FAVOURITE BUTTON//

let favoriteImages = [];


function addToFavorites() {
  // Get the current image's data
  const apodImage = document.getElementById('apod-image').src;
  const apodTitle = document.getElementById('apod-title').textContent;
  const apodExplanation = document.getElementById('apod-explanation').textContent;

  // Create an object to store the image data
  const favoriteImage = {
    image: apodImage,
    title: apodTitle,
    explanation: apodExplanation
  };

  // Check if the image is already in the favoriteImages array
  const existingImage = favoriteImages.find(img => img.title === favoriteImage.title);

  // If the image is not in the array, add it to the array and save to localStorage
  if (!existingImage) {
    favoriteImages.push(favoriteImage);
    localStorage.setItem('favoriteImages', JSON.stringify(favoriteImages));
    alert('Image added to favorites!');
  } else {
    alert('Image already in favorites!');
  }
}

const favoriteButton = document.getElementById('favorite-button');
favoriteButton.addEventListener('click', addToFavorites);

function showFavorites() {
  // Get the saved favorite images from localStorage
  const savedFavorites = localStorage.getItem('favoriteImages');

  // If there are saved favorite images, parse the JSON and display them
  if (savedFavorites) {
    favoriteImages = JSON.parse(savedFavorites);

    // Loop through the favoriteImages array and display each image
    favoriteImages.forEach(image => {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('favorite-image');

      const imageTitle = document.createElement('h3');
      imageTitle.textContent = image.title;

      const imageExplanation = document.createElement('p');
      imageExplanation.textContent = image.explanation;

      const imageElement = document.createElement('img');
      imageElement.src = image.image;

      imageContainer.appendChild(imageTitle);
      imageContainer.appendChild(imageElement);
      imageContainer.appendChild(imageExplanation);

      document.getElementById('favorites-container').appendChild(imageContainer);
    });
  }
}

window.onload = showFavorites;
