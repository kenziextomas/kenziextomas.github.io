document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const cmdLine = document.querySelector(".cmd");
  const text = "/me membuka menu sell";
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

document.querySelectorAll(".btn-buy").forEach((button) => {
  button.addEventListener("click", function () {
    // Ambil data dari tombol yang diklik
    const productName = this.getAttribute("data-name");
    const productPrice = this.getAttribute("data-price");

    // Pengaturan WhatsApp
    const phoneNumber = "6281515785838"; // GANTI DENGAN NOMOR WHATSAPP ANDA (Gunakan kode negara, misal 62)

    // Pesan otomatis yang akan dikirim
    const message = `Halo Tomas Store! %0A%0ASaya ingin membeli Produk:Home + Meka Harga:10.000 Mohon instruksi selanjutnya untuk pembayaran. Terimakasih!`;

    // Redirect ke WhatsApp
    const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(waUrl, "_blank");
  });
});