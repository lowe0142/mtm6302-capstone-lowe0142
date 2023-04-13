// LAUNCHES TO IMAGE PAGE // 

document.getElementById("launch-button").addEventListener("click", function() {
    window.location.href = "image.html";
  });

//DATE BUTTON//
  document.getElementById("date-btn").innerHTML = dateSubmitted;



// Replace YOUR_API_KEY with your actual API key
const API_KEY = '8neWwEflI1jIW6pOV2tUxoUvEaFDShETxqZakc7R';

function getAstronomyImageOfTheDay(date) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`;
  
  fetch(apiUrl)
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
}

const launchButton = document.getElementById('launch-button');
launchButton.addEventListener('click', () => {
  const dateInput = document.getElementById('date-input');
  const date = dateInput.value;
  getAstronomyImageOfTheDay(date);
});
