//Get elements from the DOM
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let counter = 0;
const maxCounter = 50;

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment counter
  counter++;
  console.log("Check ins:", counter);

  //update progress bar
  const percentage = Math.round((counter / maxCounter) * 100) + "%";
  console.log(`Percentage: ${percentage}`);
  
  //update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  //show welcome message
  const message = "Welcome " + name + " from " + teamName;
  console.log(message);

  form.reset();
});
