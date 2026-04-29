document.addEventListener("DOMContentLoaded", () => {
  const visitorCountElement = document.getElementById("visitor-count-value");
  const namespace = "tomas-store-v1"; // Unique namespace for your store

  // Function to format numbers (e.g., 1000 -> 001,000)
  const formatCount = (num) => {
    return num.toString().padStart(6, '0');
  };

  // Try to get real count from CounterAPI
  // Using a more reliable endpoint or fallback
  const fetchCount = async () => {
    try {
      // Note: In a real environment, this increments the counter
      const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/visits/up`);
      const data = await response.json();

      if (data && data.count) {
        animateCount(data.count);
      } else {
        throw new Error("Invalid data");
      }
    } catch (error) {
      console.warn("Visitor counter API error, using fallback:", error);
      handleFallback();
    }
  };

  const handleFallback = () => {
    let localCount = localStorage.getItem("visitor_count_fallback");
    if (!localCount) {
      // Start with a base number for premium feel
      localCount = 12450;
    }
    localCount = parseInt(localCount) + 1;
    localStorage.setItem("visitor_count_fallback", localCount);
    animateCount(localCount);
  };

  const animateCount = (target) => {
    let start = target - 50 > 0 ? target - 50 : 0;
    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      if (visitorCountElement) {
        visitorCountElement.innerText = formatCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  fetchCount();
});
