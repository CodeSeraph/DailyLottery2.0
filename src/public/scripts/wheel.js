let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let value = Math.ceil(Math.random() * 3600);

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

  // Reset the transition property and remove the event listener
  wheel.style.transition = "";
  wheel.removeEventListener("transitionend", handleTransitionEnd);
}
