// LAUNCHES TO IMAGE PAGE // 

document.getElementById("launch-button").addEventListener("click", function() {
    window.location.href = "image.html";
  });

//DATE BUTTON//
  document.getElementById("date-btn").innerHTML = dateSubmitted;


  const apiKey = '8neWwEflI1jIW6pOV2tUxoUvEaFDShETxqZakc7R';
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const apodImage = document.getElementById('apod-image');
      const apodTitle = document.getElementById('apod-title');
      const apodDate = document.getElementById('apod-date');
      const apodExplanation = document.getElementById('apod-explanation');
  
      apodImage.src = data.url;
      apodTitle.textContent = data.title;
      apodDate.textContent = data.date;
      apodExplanation.textContent = data.explanation;
    })
    .catch(error => {
      console.error('Error fetching APOD:', error);
    });
  