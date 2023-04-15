function getAPOD(date, apiKey) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.url;
      const title = data.title;
      const explanation = data.explanation;

    
      document.getElementById('apod-image').src = imageUrl;
      document.getElementById('apod-image').alt = title;
      document.getElementById('apod-title').textContent = title;
      document.getElementById('apod-explanation').textContent = explanation;

      document.getElementById('apod-image').style.display = 'block';

      const favoriteButton = document.getElementById('favorite-button');
      favoriteButton.addEventListener('click', () => {
        const favoriteImages = getFavoriteImages();
        favoriteImages.push(imageUrl);
        setFavoriteImages(favoriteImages);
      });
    })
    .catch(error => console.error(error));
}


const dateButton = document.getElementById('launch-button');
const apiKey = '8neWwEflI1jIW6pOV2tUxoUvEaFDShETxqZakc7R';

dateButton.addEventListener('click', () => {
  const date = document.getElementById('date-input').value;
  getAPOD(date, apiKey);
});

//FAVOURITE BUTTON//

let favoriteImages = [];


function addToFavorites() {
  // Get Image's data
  const apodImage = document.getElementById('apod-image').src;
  const apodTitle = document.getElementById('apod-title').textContent;
  const apodExplanation = document.getElementById('apod-explanation').textContent;


  const favoriteImage = {
    image: apodImage,
    title: apodTitle,
    explanation: apodExplanation
  };

  const existingImage = favoriteImages.find(img => img.title === favoriteImage.title);

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
  const savedFavorites = localStorage.getItem('favoriteImages');

  if (savedFavorites) {
    favoriteImages = JSON.parse(savedFavorites);

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

