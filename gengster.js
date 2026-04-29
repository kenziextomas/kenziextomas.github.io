document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const cmdLine = document.querySelector(".cmd");
  const text = "/me membuka menu sell";
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
  const itemId = 'gengster';
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

  document.querySelectorAll(".btn-buy").forEach((button) => {
    button.addEventListener("click", function () {
      // Increment sales count
      const counts = getCounts();
      counts[itemId] = (counts[itemId] || 0) + 1;
      localStorage.setItem('tomas_sales_counts', JSON.stringify(counts));
      updateDisplay();

      // WhatsApp logic
      const phoneNumber = "6281515785838";
      const message = `Halo Tomas Store! %0A%0ASaya ingin membeli Produk:GTA r1 Gengster Harga:20.000 Mohon instruksi selanjutnya untuk pembayaran. Terimakasih!`;
      const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(waUrl, "_blank");
    });
  });
});