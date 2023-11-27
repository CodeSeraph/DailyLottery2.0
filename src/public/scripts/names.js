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
  newElement.className = "number";
  newElement.style = `--i:${segment.id};--clr:${segment.color};--d:${segment.size}deg;${segment.clipPath}`;
  newElement.innerHTML = `<span>${segment.name}</span>`;

  wheelElement.appendChild(newElement);
}

refreshList();
