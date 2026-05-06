document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const cmdLine = document.querySelector(".cmd");
  const text = "/me membuka menu jual";
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
  const updateSalesCount = () => {
    const counts = JSON.parse(localStorage.getItem('tomas_sales_counts')) || {};
    const itemElements = document.querySelectorAll('.sold-count');

    itemElements.forEach(el => {
      const itemId = el.getAttribute('data-item-id');
      if (!counts[itemId]) {
        // Generate a random initial count between 50 and 500 if not exists
        counts[itemId] = Math.floor(Math.random() * 451) + 50;
      }
      el.textContent = counts[itemId];
    });

    localStorage.setItem('tomas_sales_counts', JSON.stringify(counts));
  };

  updateSalesCount();
});