let availableNames = [];
const checkboxes = document.querySelectorAll(
  '.inputGroup input[type="checkbox"]'
);

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
  const checkedNamesDiv = document.getElementById("checkedNames");
  checkedNamesDiv.textContent = availableNames.join(", ");
}

refreshList();
