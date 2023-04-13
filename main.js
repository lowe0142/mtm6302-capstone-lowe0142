// Replace YOUR_API_KEY with your actual API key
const API_KEY = '8neWwEflI1jIW6pOV2tUxoUvEaFDShETxqZakc7R';

// Make a GET request to the API endpoint
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    // Extract the relevant information from the response
    const imageUrl = data.hdurl;
    const title = data.title;
    const description = data.explanation;

    // Display the information on the webpage
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    document.body.appendChild(imageElement);

    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    document.body.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    document.body.appendChild(descriptionElement);
  })
  .catch(error => {
    console.error(error);
  });
