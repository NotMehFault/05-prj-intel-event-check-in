//Get elements from the DOM
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

//Track attendance
let counter = 0;
const maxCounter = 50;

// Restore counts from localStorage
if (localStorage.getItem("attendanceCounter")) {
  counter = parseInt(localStorage.getItem("attendanceCounter"));
  document.addEventListener("DOMContentLoaded", function () {
    const attendeeCount = document.getElementById("attendeeCount");
    attendeeCount.textContent = counter;
    const progressBar = document.getElementById("progressBar");
    const percentage = Math.round((counter / maxCounter) * 100);
    progressBar.style.width = percentage + "%";
  });
}

const teamKeys = ["water", "zero", "power"];
teamKeys.forEach(function (team) {
  document.addEventListener("DOMContentLoaded", function () {
    // Restore team count
    if (localStorage.getItem(team + "Count")) {
      document.getElementById(team + "Count").textContent =
        localStorage.getItem(team + "Count");
    }
    // Restore team names
    const namesJSON = localStorage.getItem(team + "NamesList");
    if (namesJSON) {
      const namesArr = JSON.parse(namesJSON);
      const teamNamesDiv = document.getElementById(team + "Names");
      teamNamesDiv.innerHTML = "";
      namesArr.forEach(function (attendeeName) {
        const attendeeSpan = document.createElement("span");
        attendeeSpan.textContent = attendeeName;
        attendeeSpan.className = "attendee-name";
        teamNamesDiv.appendChild(attendeeSpan);
      });
    }
  });
});

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  if (counter >= maxCounter) {
    // Find the winning team
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent
    );
    let winningTeam = "";
    let winningLabel = "";
    if (waterCount >= zeroCount && waterCount >= powerCount) {
      winningTeam = "water";
      winningLabel = "Team Water Wise";
    } else if (zeroCount >= waterCount && zeroCount >= powerCount) {
      winningTeam = "zero";
      winningLabel = "Team Net Zero";
    } else {
      winningTeam = "power";
      winningLabel = "Team Renewables";
    }
    const greeting = document.getElementById("greeting");
    greeting.textContent = `🎉 Check-in goal reached! Congratulations to ${winningLabel}! 🎉`;
    greeting.classList.add("success-message");
    greeting.style.display = "block";
    return;
  }

  //Increment counter
  counter++;
  localStorage.setItem("attendanceCounter", counter);
  console.log("Check ins:", counter);

  //update progress bar and attendee count
  const percentage = Math.round((counter / maxCounter) * 100);
  console.log(`Percentage: ${percentage}%`);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage + "%";
  const attendeeCount = document.getElementById("attendeeCount");
  attendeeCount.textContent = counter;

  //update team counter
  const teamCounter = document.getElementById(team + "Count");
  const newTeamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = newTeamCount;
  localStorage.setItem(team + "Count", newTeamCount);

  //add attendee name under the correct team and save to localStorage
  const teamNames = document.getElementById(team + "Names");
  const attendeeSpan = document.createElement("span");
  attendeeSpan.textContent = name;
  attendeeSpan.className = "attendee-name";
  teamNames.appendChild(attendeeSpan);

  // Save names to localStorage
  let namesArr = [];
  const namesJSON = localStorage.getItem(team + "NamesList");
  if (namesJSON) {
    namesArr = JSON.parse(namesJSON);
  }
  namesArr.push(name);
  localStorage.setItem(team + "NamesList", JSON.stringify(namesArr));

  //show welcome message
  const message = `Welcome ${name} from ${teamName}!`;
  console.log(message);

  //display greeting message
  const greeting = document.getElementById("greeting");
  greeting.textContent = message;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  form.reset();
});

document.getElementById("resetBtn").addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
