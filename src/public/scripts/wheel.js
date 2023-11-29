let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let value = Math.ceil((Math.random() + 1) * 3600);

spinBtn.onclick = function () {
  // Remove any existing transition event listener
  wheel.removeEventListener("transitionend", handleTransitionEnd);

  // Set up a one-time event listener for the 'transitionend' event
  wheel.addEventListener("transitionend", handleTransitionEnd, { once: true });

  setTimeout(() => {
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil((Math.random() + 1) * 3600);
  }, 100);
};

function handleTransitionEnd() {
  // This function will be called when the 'transitionend' event occurs
  showPartyPopper();

  // get the label element with id winner and set it's inner text to the value returned by findElementBehindRedPixel()
  const resultContainer = document.querySelector(".result-container");
  resultContainer.style.display = "block";
  const winnerName = findElementBehindRedPixel();
  document.getElementById("winner").innerText = winnerName;
  disableItem(winnerName);

  // Reset the transition property and remove the event listener
  wheel.style.transition = "";
  wheel.removeEventListener("transitionend", handleTransitionEnd);
}

function findElementBehindRedPixel() {
  const redPixelElement = document.querySelector(".redPixel");
  const rect = redPixelElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const elementsAtPoint = document.elementsFromPoint(centerX, centerY);

  // Loop through the elements to find the one behind the redPixel
  let elementBehindRedPixel = null;
  for (let i = 1; i < elementsAtPoint.length; i++) {
    if (elementsAtPoint[i] !== redPixelElement) {
      elementBehindRedPixel = elementsAtPoint[i];
      break;
    }
  }

  // if the element is a span then return the inner text else search for the first span and then return the inner text
  if (elementBehindRedPixel.tagName === "SPAN") {
    return elementBehindRedPixel.innerText;
  } else if (elementBehindRedPixel.tagName === "DIV") {
    return elementBehindRedPixel.firstChild.innerText;
  } else {
    return "It's a tie! Spin again!";
  }
}

function disableItem(name) {
  fetch(`http://localhost:4000/disable/${name}`, {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the API if needed
      console.log("Item disabled:", data);
    })
    .catch((error) => {
      console.error("Error disabling item:", error);
    });
}
