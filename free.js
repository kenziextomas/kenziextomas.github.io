document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const cmdLine = document.querySelector(".cmd");
  const text = "/me membuka menu free";
  let i = 0;

  const type = () => {
    if (i < text.length) {
      cmdLine.innerHTML =
        text.substring(0, i + 1) + '<span class="blink">_</span>';
      i++;
      setTimeout(type, 100);
    }
  };
  setTimeout(type, 1000);
});