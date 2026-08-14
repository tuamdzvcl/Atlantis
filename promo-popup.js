/**
 * ======================================================
 * Promo Popup - JavaScript
 * Hiện popup ưu đãi khi khách hàng cuộn đến phần đặt hàng (#banggia).
 * Chỉ hiện 1 lần / session (sessionStorage).
 * CTA: đóng popup → cuộn xuống mục Đặt Hàng (#banggia).
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
  const continueBtn = document.getElementById("promoContinueBtn");

  // New Form Elements
  const defaultView = document.getElementById("promoDefaultView");
  const leadForm = document.getElementById("promoLeadForm");
  const successView = document.getElementById("promoSuccessView");
  const submitText = document.getElementById("promoSubmitText");
  const submitLoading = document.getElementById("promoSubmitLoading");

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

  // --- Show when scrolling to order section (#banggia) ---
  const orderSection = document.getElementById("banggia");
  if (orderSection) {
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        openPromo();
        observer.disconnect(); // Stop observing once shown
      }
    }, { threshold: 0.2 }); // Trigger when 20% of the section is visible
    observer.observe(orderSection);
  } else {
    // Fallback if section is missing
    setTimeout(openPromo, 2000);
  }

  // --- Event Listeners ---

  // Close button
  closeBtn.addEventListener("click", closePromo);

  // Click outside popup to close
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closePromo();
  });

  // CTA: Show the form instead of scrolling
  ctaBtn.addEventListener("click", function () {
    if (defaultView && leadForm) {
      defaultView.classList.add("hidden");
      leadForm.classList.remove("hidden");
      // Focus on the first input
      const firstInput = leadForm.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  });

  // Handle Continue Shopping Button (Scroll to order section)
  if (continueBtn) {
    continueBtn.addEventListener("click", function () {
      closePromo();

      // Wait for close animation to finish, then smooth scroll
      setTimeout(function () {
        const orderSection = document.getElementById("banggia");
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
    });
  }

  // Handle Form Submission
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Update UI to loading state
      if (submitText) submitText.classList.add("opacity-0");
      if (submitLoading) submitLoading.classList.remove("hidden");
      const submitBtn = document.getElementById("promoSubmitBtn");
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(leadForm);
      // Save data to sessionStorage for the order popup later
      sessionStorage.setItem("promoName", formData.get("entry.name"));
      sessionStorage.setItem("promoPhone", formData.get("entry.phone"));
      sessionStorage.setItem("promoVoucher", "VCH100K");

      // Replace with your deployed Google Apps Script Web App URL
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhwaoU3edRdu2rtGT-NbYgMeykMwZGWP46SdmvfKCJ1YiML4M-gFZRhKIBCwcgBrrg/exec";

      // Gửi request ngầm, không chờ kết quả
      fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      }).catch(error => console.error('Error!', error.message));

      // Bắt buộc hiển thị thành công sau 2s
      setTimeout(() => {
        leadForm.classList.add("hidden");
        if (successView) successView.classList.remove("hidden");
        createConfetti(); // Trigger confetti again for success!
        
        // Reset button state
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.classList.remove("opacity-0");
        if (submitLoading) submitLoading.classList.add("hidden");
      }, 2000);
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
      closePromo();
    }
  });
})();
