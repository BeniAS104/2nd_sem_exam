"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function
// Function to initialize the Web App
  async function initApp() {
  const projectData = await getData();
  displayProjects(projectData);
}

// This function fetches data from the specified URL
async function getData () {
  // Fetch data from the URL
  const response = await fetch ("https://headless.bendev.dk/wp-json/wp/v2/projects?acf_format=standard&orderby=date&order=asc");
  // Extract JSON data from the response
  const data = await response.json();
  // Return the extracted data
  return data;
}

// displays the fetched project data on the webpage
function displayProjects(projectData){
  // Selects the HTML element with the class "project__container"
  const projectGrid = document.querySelector(".project__container");

  // Loops through each project in the fetched data
  for (const project of projectData) {
    // Logs the number of filterableCards (not sure what this refers to, maybe a debugging statement?)
    console.log(projectData.length); // Checking the amount of items in the array of projectData
    // Inserts HTML for each project into the projectGrid element
    projectGrid.insertAdjacentHTML(
      "beforeend",
      `
      <div class="project__item" data-name="${project.acf.dataName}">
        <img src="${project.acf.image}" alt="${project.title.rendered}" />
        <h3>${project.acf.title}</h3>
        <p class="project__type">${project.acf.type}</p>
        <p class="project__description">${project.acf.description}</p>
        <a href="${project.acf.link}" class="project__link">See Solution</a>
      </div>
    `
    );
  }
}

// Selects all filter buttons and filterable cards (project_items)
const filterButtons = document.querySelectorAll(".filter__buttons button");
const filterableCards = document.querySelectorAll(".project__item");
 console.log( filterableCards.length); // Check if filterableCards is not empty (it is somehow)

// Create and define the function for filtering
async function filterCards(clickEvent) {
  // Remove active class from all buttons
  for (const button of filterButtons) {
    button.classList.remove("active");
  }
  // Add active class to the clicked button
  clickEvent.target.classList.add("active");
  
  // Iterate through every card
  for (const project of filterableCards) {
    // Add "hide" class to hide every card initially
    project.classList.add("hide");
    // If project matches the selected filter or "all", then remove the hide classes
    if (project.dataset.name === clickEvent.target.dataset.name || clickEvent.target.dataset.name === "all") {
      project.classList.remove("hide");
    }
  }
}

// Adds a click event listener to each of the filter buttons - if clicked then activate the function above
for (const button of filterButtons) {
  button.addEventListener("click", filterCards);
}