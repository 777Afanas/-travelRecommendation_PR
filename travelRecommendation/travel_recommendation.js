const btnSearch = document.getElementById("btnSearch");

function searchRecommendation() {
  const input = document
    .getElementById("recommendationInput")
    .value.toLowerCase();
  const resultDiv = document.getElementById("resultRec");
  resultDiv.innerHTML = "";
  console.log(input);

  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let keywords = input;
      console.log(data[keywords]);
      console.log(data.beaches);

      data[keywords].forEach(function (keyword) {
        console.log(keywords);
        if (keywords === "beaches" || keywords === "temples") {
          // resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="hjh">`;
          resultDiv.innerHTML += `<h2>${keyword.name}</h2>`;

          resultDiv.innerHTML += `<p>${keyword.description}</p>`;
        } else if (keywords === "countries") {
          resultDiv.innerHTML += `<p>${keyword.name}</p>`;
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
btnSearch.addEventListener("click", searchRecommendation);
