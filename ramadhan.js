document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const cmdLine = document.querySelector(".cmd");
  const text = "/me membuka menu gratis";
  let i = 0;

  const type = () => {
    if (i < text.length) {
      if (cmdLine) {
        cmdLine.innerHTML =
          text.substring(0, i + 1) + '<span class="blink">_</span>';
      }
      i++;
      setTimeout(type, 100);
    }
  };
  setTimeout(type, 1000);

  // Sales Count Logic
  const itemId = 'ramadhan';
  const soldCountEl = document.getElementById('sold-count-value-item');
  
  const getCounts = () => JSON.parse(localStorage.getItem('tomas_sales_counts')) || {};
  
  const updateDisplay = () => {
    const counts = getCounts();
    if (!counts[itemId]) {
      counts[itemId] = Math.floor(Math.random() * 451) + 50;
      localStorage.setItem('tomas_sales_counts', JSON.stringify(counts));
    }
    if (soldCountEl) soldCountEl.textContent = counts[itemId];
  };

  updateDisplay();

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      // Increment sales count
      const counts = getCounts();
      counts[itemId] = (counts[itemId] || 0) + 1;
      localStorage.setItem('tomas_sales_counts', JSON.stringify(counts));
      updateDisplay();
    });
  });
});