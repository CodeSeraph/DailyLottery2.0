let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let value = Math.ceil(Math.random() * 3600);

spinBtn.onclick = function () {
  setTimeout(() => {
    wheel.style.transform = "rotate(" + value + "deg)";
    value += Math.ceil((Math.random() + 1) * 3600);
  }, 100);
};
