/**
 * ======================================================
 * Promo Popup - JavaScript
 * Hiện popup ưu đãi sau 4 giây khi vào trang.
 * Chỉ hiện 1 lần / session (sessionStorage).
 * CTA: đóng popup → cuộn xuống mục Đặt Hàng (#dathang).
 * ======================================================
 */
(function () {
  "use strict";

  // --- DOM Elements ---
  const overlay = document.getElementById("promoPopupOverlay");
  const content = document.getElementById("promoPopupContent");
  const closeBtn = document.getElementById("promoCloseBtn");
  const ctaBtn = document.getElementById("promoCTABtn");
  const confettiContainer = document.getElementById("promoConfettiContainer");

  // Bail out if popup elements not found
  if (!overlay || !content) return;

  // Only show once per session
  if (sessionStorage.getItem("atlantisPromoShown")) return;

  // --- Confetti Effect ---
  function createConfetti() {
    const colors = [
      "#0078D4",
      "#FFC107",
      "#d60000",
      "#14b8a6",
      "#8b5cf6",
      "#f97316",
    ];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "promo-confetti-particle";
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = "-10px";
      particle.style.animationDelay = Math.random() * 1.5 + "s";
      particle.style.animationDuration = 2 + Math.random() * 2 + "s";

      // Random circle vs square shape
      if (Math.random() > 0.5) {
        particle.style.borderRadius = "50%";
        const size = 6 + Math.random() * 6 + "px";
        particle.style.width = size;
        particle.style.height = size;
      }

      confettiContainer.appendChild(particle);
    }

    // Clean up after animations complete
    setTimeout(function () {
      confettiContainer.innerHTML = "";
    }, 5000);
  }

  // --- Open Popup ---
  function openPromo() {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");

    // Force reflow to trigger CSS animation
    void overlay.offsetWidth;

    overlay.classList.add("promo-visible");
    content.classList.add("promo-visible");
    document.body.style.overflow = "hidden";

    createConfetti();
    sessionStorage.setItem("atlantisPromoShown", "1");
  }

  // --- Close Popup ---
  function closePromo() {
    overlay.classList.remove("promo-visible");
    content.classList.remove("promo-visible");
    overlay.style.opacity = "0";
    content.style.opacity = "0";
    content.style.transform = "translateY(40px) scale(0.95)";

    setTimeout(function () {
      overlay.classList.add("hidden");
      overlay.classList.remove("flex");
      // Reset inline styles
      overlay.style.opacity = "";
      content.style.opacity = "";
      content.style.transform = "";
      document.body.style.overflow = "";
    }, 300);
  }

  // --- Auto show after 4 seconds ---
  setTimeout(openPromo, 4000);

  // --- Event Listeners ---

  // Close button
  closeBtn.addEventListener("click", closePromo);

  // Click outside popup to close
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePromo();
  });

  // CTA: close popup → scroll to order form (#dathang)
  ctaBtn.addEventListener("click", function () {
    closePromo();

    // Wait for close animation to finish, then smooth scroll
    setTimeout(function () {
      const orderSection = document.getElementById("banggia");
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 350);
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
      closePromo();
    }
  });
})();
