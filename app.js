"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


// Initialize the initApp function when the window loads
window.addEventListener("load", initApp);

// Function initializing the Web App
async function initApp() {
  const projectData = await getData();
  displayProjects(projectData);
  //The next part is for a function further along - filterCards
  // Selects all filter buttons and filterable cards (project_items) after projects are displayed
  const filterButtons = document.querySelectorAll(".filter__buttons button");
  const filterableCards = document.querySelectorAll(".project__item");

  console.log(filterableCards.length); // Check if filterableCards is not empty (debugging)

  // Adds a click event listener to each of the filtering buttons
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function(clickEvent) {
      filterCards(clickEvent, filterableCards);
    });
  }
}
// Function to fetch data from the specified URL
async function getData() {
  // Fetch data from the URL
  const response = await fetch("https://headless.bendev.dk/wp-json/wp/v2/projects?acf_format=standard&orderby=date&order=asc");
  // Extract JSON data from the response
  const data = await response.json();
  //returns the data variable
  return data;
}

// Function to fetch and display project data on the webpage
async function displayProjects(projectData) {
  // Selects the HTML element with the class "project__container"
  const projectGrid = document.querySelector(".project__container");

  // Loops through each project in the fetched data
  for (const project of projectData) {
    // Logs the number of filterableCards (debugging)
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

// Function to filter cards based on the clicked button - with 2 parameters of clickEvent and filterableCards
async function filterCards(clickEvent, filterableCards) {
  const filterButtons = document.querySelectorAll(".filter__buttons button");

  // stripping 'active' class from all buttons
  for (const button of filterButtons) {
    button.classList.remove("active");
  }

  // Adding 'active' class to the clicked button
  clickEvent.target.classList.add("active");

  // Hiding all projects
  for (const project of filterableCards) {
    project.classList.add("hide");

    // Showing projects that match the clicked button's data-name or all projects if 'all' is clicked
    if (project.dataset.name === clickEvent.target.dataset.name || clickEvent.target.dataset.name === "all") {
      project.classList.remove("hide");
    }
  }
}

