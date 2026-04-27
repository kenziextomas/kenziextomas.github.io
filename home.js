document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  const cmdLine = document.querySelector(".cmd");
  const text = "/me membuka toko tomas";
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

document.addEventListener("DOMContentLoaded", () => {
  const missionScreen = document.getElementById("mission-screen");

  // Tampilkan layar hitam MISSION PASSED selama 4 detik
  setTimeout(() => {
    if (missionScreen) {
      // Memberikan efek fade out ke tampilan awal
      missionScreen.classList.add("fade-out");
    }
  }, 4000);

  // Typing Effect Terminal (Dimulai setelah layar hitam hilang)
  const cmdLine = document.querySelector(".cmd");
  if (cmdLine) {
    const text = "/me membuka toko tomas";
    let i = 0;

    const type = () => {
      if (i < text.length) {
        cmdLine.innerHTML =
          text.substring(0, i + 1) + '<span class="blink">_</span>';
        i++;
        setTimeout(type, 100);
      }
    };

    // Delay mengetik agar tidak terlihat saat layar masih hitam
    setTimeout(type, 5000);
  }
});