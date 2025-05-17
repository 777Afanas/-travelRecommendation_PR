const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const input = document.getElementById("recommendationInput");
const resultDiv = document.getElementById("resultRec");

btnSearch.addEventListener("click", searchRecommendation);
btnClear.addEventListener("click", clearRecommendation);

function searchRecommendation() {
  const keywords = input.value.toLowerCase();
  resultDiv.innerHTML = "";

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      if (!data[keywords]) {
        resultDiv.innerHTML = "Condition not found.";
        return;
      }

      data[keywords].forEach(function (keyword) {
        if (keywords === "beaches" || keywords === "temples") {
          // resultDiv.innerHTML += `<img src="${keyword.imageUrl}" alt="hjh">`;
          resultDiv.innerHTML += `<h2>${keyword.name}</h2>`;
          resultDiv.innerHTML += `<p>${keyword.description}</p>`;
        } else if (keywords === "countries") {
          resultDiv.innerHTML += `<p>${keyword.name}</p>`;

          keyword.cities.forEach(function (city) {
            // resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="hjh">`;
            resultDiv.innerHTML += `<h2>${city.name}</h2>`;
            resultDiv.innerHTML += `<p>${city.description}</p>`;
          });
        } else {
          resultDiv.innerHTML = "Condition not found.";
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

function clearRecommendation() {
  resultDiv.innerHTML = "";
  input.value = "";
}
