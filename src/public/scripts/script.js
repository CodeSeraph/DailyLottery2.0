let availableNames = [];
const checkboxes = document.querySelectorAll(
  '.inputGroup input[type="checkbox"]'
);
const wheelElement = document.querySelector(".wheel");

document.addEventListener("DOMContentLoaded", () => {
  checkboxes.forEach((checkbox) => {
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        refreshList();
      });
    }
  });
});

function updateAvailableNames() {
  checkboxes.forEach((checkbox) => {
    if (checkbox) {
      const name = checkbox.nextSibling.textContent;
      if (checkbox.checked) {
        if (!availableNames.includes(name)) {
          availableNames.push(name);
        }
      } else {
        const index = availableNames.findIndex(
          (availableName) => availableName === name
        );

        if (index > -1) {
          availableNames.splice(index, 1);
        }
      }
    }
  });
}

function refreshList() {
  updateAvailableNames();
  clearWheel();

  const segments = createSegments();
  segments.forEach((segment) => {
    addElementToWheel(segment);
  });
}

function createSegments() {
  const size = calculateSize();
  return availableNames.map((name, index) => {
    return {
      id: index,
      name: name,
      color: getRandomColor(),
      size,
      clipPath: createPath(),
    };
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createPath() {
  const numberOfSegments = availableNames.length;

  const segmentSize = calculateSize();

  const ratio = 50 + segmentSize / 2;
  const inverstRatio = 50 - segmentSize / 2;

  if (numberOfSegments === 1) {
    return "";
  } else if (numberOfSegments === 2) {
    return "clip-path: polygon(0 0, 100% 0, 100% 50%, 50% 50%, 0 50%)";
  } else if (numberOfSegments === 3) {
    return "clip-path: polygon(0 0, 100% 0, 100% 21.5%, 50% 50%, 0 21.5%)";
  } else if (numberOfSegments === 4)
    return "clip-path: polygon(0 0, 100% 0, 100% 0, 50% 50%, 0 0)";
  else {
    return `clip-path: polygon(0 0, 100% 0, ${inverstRatio}% 0, 50% 50%, ${ratio}% 0)`;
  }
}

function calculateSize() {
  return 360 / availableNames.length;
}

function clearWheel() {
  while (wheelElement.firstChild) {
    wheelElement.removeChild(wheelElement.firstChild);
  }
}

function addElementToWheel(segment) {
  let newElement = document.createElement("div");
  newElement.className = "segment";
  newElement.style = `--i:${segment.id};--clr:${segment.color};--d:${segment.size}deg;${segment.clipPath}`;
  newElement.innerHTML = `<span>${segment.name}</span>`;

  wheelElement.appendChild(newElement);
}

function addContestant() {
  const name = document.getElementById("newContestant").value;

  fetch(`http://localhost:4000/add/${name}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API if needed
      console.log("Item added:", data);
    })
    .catch((error) => {
      console.error("Error adding item:", error);
    });
}

function deleteContestant(name) {
  fetch(`http://localhost:4000/delete/${name}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API if needed
      console.log("Item deleted:", data);
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}

function showPartyPopper() {
  const confettiCount = 1000; // Increase the number of confetti particles
  const particleSize = 3; // Decrease the size of each particle

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw"; // Random horizontal position
    confetti.style.animationDelay = Math.random() * 4 + "s"; // Random animation delay
    confetti.style.backgroundColor = getRandomColor(); // Random background color
    confetti.style.width = particleSize + "px"; // Set particle width
    confetti.style.height = particleSize + "px"; // Set particle height
    document.body.appendChild(confetti);
  }

  // Remove the confetti elements after the animation is complete
  setTimeout(() => {
    const confettiElements = document.querySelectorAll(".confetti");
    confettiElements.forEach((confetti) => {
      confetti.remove();
    });
    resultContainer.style.display = "block"; // Show the winner result
  }, 5000); // Adjust the duration to match your confetti animation
}

refreshList();
