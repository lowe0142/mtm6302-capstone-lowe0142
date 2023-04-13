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
    })
    .catch(error => console.error(error));
}

const launchButton = document.getElementById('launch-button');
const apiKey = '8neWwEflI1jIW6pOV2tUxoUvEaFDShETxqZakc7R';

launchButton.addEventListener('click', () => {
  const date = document.getElementById('date-input').value;
  getAPOD(date, apiKey);
});