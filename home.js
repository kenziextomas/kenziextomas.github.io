document.addEventListener("DOMContentLoaded", () => {
  const missionScreen = document.getElementById("mission-screen");
  const skipBtn = document.getElementById("skip-animation");
  const cmdLine = document.querySelector(".cmd");
  let typingTimeout;
  let isSkipped = false;

  const skipAnimation = () => {
    if (isSkipped) return;
    isSkipped = true;
    
    // Hide mission screen
    if (missionScreen) {
      missionScreen.classList.add("fade-out");
      setTimeout(() => missionScreen.style.display = 'none', 1500);
    }
    
    // Complete typing immediately
    if (cmdLine) {
      clearTimeout(typingTimeout);
      cmdLine.innerHTML = "/me membuka toko tomas" + '<span class="blink">_</span>';
    }

    // Initialize chart immediately if not already done
    if (typeof initSalesChart === 'function') {
      initSalesChart(true); // true means immediate
    }
  };

  if (skipBtn) {
    skipBtn.addEventListener("click", skipAnimation);
  }

  // Also skip on Space bar
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      skipAnimation();
    }
  });

  // Auto-hide mission screen after 4 seconds
  setTimeout(() => {
    if (!isSkipped && missionScreen) {
      missionScreen.classList.add("fade-out");
    }
  }, 4000);

  // Typing Effect
  if (cmdLine) {
    const text = "/me membuka toko tomas";
    let i = 0;

    const type = () => {
      if (isSkipped) return;
      if (i < text.length) {
        cmdLine.innerHTML =
          text.substring(0, i + 1) + '<span class="blink">_</span>';
        i++;
        typingTimeout = setTimeout(type, 100);
      }
    };
    setTimeout(type, 5000);
  }

  // Sales Statistics Diagram Logic
  const initSalesChart = (immediate = false) => {
    const chartContainer = document.getElementById('sales-chart');
    if (!chartContainer) return;
    if (chartContainer.dataset.initialized === 'true') return;
    chartContainer.dataset.initialized = 'true';

    const counts = JSON.parse(localStorage.getItem('tomas_sales_counts')) || {};
    const items = [
      { id: 'home-meka', name: 'Mapping Home + Mekanik' },
      { id: 'pink', name: 'GTA r1 Pink' },
      { id: 'gengster', name: 'GTA r1 Gengster' },
      { id: 'hood', name: 'Mapping Hood' },
      { id: 'blue', name: 'GTA r1 Blue' },
      { id: 'ramadhan', name: 'GTA r1 Ramadhan' }
    ];

    let maxVal = 0;
    let totalSales = 0;
    items.forEach(item => {
      if (!counts[item.id]) {
        counts[item.id] = Math.floor(Math.random() * 451) + 50;
      }
      totalSales += counts[item.id];
      if (counts[item.id] > maxVal) maxVal = counts[item.id];
    });
    localStorage.setItem('tomas_sales_counts', JSON.stringify(counts));

    // Conversion Rate Logic (Rumus: Jumlah Pembeli / Jumlah Pengunjung * 100)
    const visitorCount = parseInt(localStorage.getItem('visitor_count_fallback')) || 12450;
    const conversionRate = ((totalSales / visitorCount) * 100).toFixed(1);
    
    const conversionPercentEl = document.getElementById('conversion-percent');
    const totalSalesEl = document.getElementById('total-sales-value');
    const gaugeRing = document.querySelector('.gauge-ring');

    if (totalSalesEl) totalSalesEl.innerText = totalSales.toLocaleString();

    chartContainer.innerHTML = '';
    items.forEach(item => {
      const val = counts[item.id];
      const percentage = (val / maxVal) * 100;
      
      const itemEl = document.createElement('div');
      itemEl.className = 'chart-item';
      itemEl.innerHTML = `
        <div class="chart-label">
          <span>${item.name}</span>
          <span>${val} Unit</span>
        </div>
        <div class="chart-bar-bg">
          <div class="chart-bar-fill" style="width: 0%"></div>
        </div>
      `;
      chartContainer.appendChild(itemEl);

      setTimeout(() => {
        itemEl.querySelector('.chart-bar-fill').style.width = percentage + '%';
      }, immediate ? 100 : 5500);
    });

    // Animate Conversion Rate
    setTimeout(() => {
      if (gaugeRing) {
        const degrees = (conversionRate / 100) * 360;
        gaugeRing.style.background = `conic-gradient(deeppink ${degrees}deg, rgba(255, 20, 147, 0.1) 0deg)`;
      }

      if (conversionPercentEl) {
        let current = 0;
        const target = parseFloat(conversionRate);
        const duration = 1500;
        const startTime = performance.now();

        const updatePercent = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const val = (progress * target).toFixed(1);
          conversionPercentEl.innerText = val + '%';
          if (progress < 1) requestAnimationFrame(updatePercent);
        };
        requestAnimationFrame(updatePercent);
      }
    }, immediate ? 200 : 6000);
  };

  initSalesChart();
});