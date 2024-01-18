const apiKey = "qoh04SJt6qUaCrMVqbZtDDBEEqEFmDLEOEDEf9AF";
const url = "https://api.nasa.gov/planetary/apod?";

let container = document.querySelector(".container");
let container2 = document.querySelector(".container2");
let button = document.getElementById("fetch-image");

button.addEventListener("click", () => {
  getImage("normal");
});

let hdButton = document.getElementById("fetch-hd");
hdButton.addEventListener("click", () => {
  getImage("hd");
});

function getImage(value) {
  let imageContainer = document.querySelector(".image-container");
  imageContainer.remove();

  let titleExplanationContainer = document.querySelector(".title-explanation-container");
  titleExplanationContainer.remove();

  let explanationContainer = document.querySelector(".explanation-container");
  explanationContainer.remove();

  let newImageContainer = document.createElement("div");
  newImageContainer.classList.add("image-container");
  container2.append(newImageContainer);
  
  let newTitleExplanationContainer = document.createElement("div");
  newTitleExplanationContainer.classList.add("title-explanation-container");
  container.append(newTitleExplanationContainer);

  let newExplanationContainer = document.createElement("div");
  newExplanationContainer.classList.add("explanation-container");
  container.append(newExplanationContainer);
  
  let dateInput = document.querySelector("#datepicker input");
  let date = dateInput.value;

  let request = new XMLHttpRequest();
  request.open("GET", url + "date=" + date + "&api_key=" + apiKey, true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      let imageUrl;
      if (value === "hd") {
        imageUrl = data.hdurl;
      } else {
        imageUrl = data.url;
      }
      let image = document.createElement("img");
      image.src = imageUrl;
      
      newImageContainer.append(image);
      newTitleExplanationContainer.append(data.title);
      newExplanationContainer.append(data.explanation);

    } else {
      window.alert("Please enter the date in correct format.");
    }
  };
}

$( function() {
    $('#datepicker').datepicker({
        format:"yyyy-mm-dd"
    });
} );
