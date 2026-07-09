// Scroll to top functionality
document.addEventListener("DOMContentLoaded", () => {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.remove(
          "opacity-0",
          "translate-y-10",
          "invisible"
        );
        scrollToTopBtn.classList.add("opacity-100", "translate-y-0", "visible");
      } else {
        scrollToTopBtn.classList.add(
          "opacity-0",
          "translate-y-10",
          "invisible"
        );
        scrollToTopBtn.classList.remove(
          "opacity-100",
          "translate-y-0",
          "visible"
        );
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Countdown Timer Functionality
  const hoursEls = document.querySelectorAll("[data-timer='hours']");
  const minutesEls = document.querySelectorAll("[data-timer='minutes']");
  const secondsEls = document.querySelectorAll("[data-timer='seconds']");

  if (hoursEls.length > 0 && minutesEls.length > 0 && secondsEls.length > 0) {
    // Determine initial duration from the first timer element if not already saved
    let countdownEndTime = localStorage.getItem('atlantisCountdownEndTime');

    if (!countdownEndTime) {
      const initialHours = parseInt(hoursEls[0].innerText, 10) || 0;
      const initialMinutes = parseInt(minutesEls[0].innerText, 10) || 0;
      const initialSeconds = parseInt(secondsEls[0].innerText, 10) || 0;
      const totalInitialSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;

      countdownEndTime = Date.now() + totalInitialSeconds * 1000;
      localStorage.setItem('atlantisCountdownEndTime', countdownEndTime);
    } else {
      countdownEndTime = parseInt(countdownEndTime, 10);
    }

    const updateTimers = () => {
      const now = Date.now();
      let remainingSeconds = Math.floor((countdownEndTime - now) / 1000);

      if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        // Optional: clear localStorage if you want it to restart on next visit after expiring
        // localStorage.removeItem('atlantisCountdownEndTime');
      }

      const h = Math.floor(remainingSeconds / 3600);
      const m = Math.floor((remainingSeconds % 3600) / 60);
      const s = remainingSeconds % 60;

      const hStr = h.toString().padStart(2, "0");
      const mStr = m.toString().padStart(2, "0");
      const sStr = s.toString().padStart(2, "0");

      for (let i = 0; i < hoursEls.length; i++) {
        if (hoursEls[i]) hoursEls[i].innerText = hStr;
        if (minutesEls[i]) minutesEls[i].innerText = mStr;
        if (secondsEls[i]) secondsEls[i].innerText = sStr;
      }
    };

    updateTimers(); // Call immediately to avoid UI jump
    setInterval(updateTimers, 1000);
  }

  // Testimonial Carousel Functionality
  const testimonialTrack = document.getElementById("testimonialTrack");
  if (testimonialTrack) {
    let currentSlide = 0;
    const totalSlides = testimonialTrack.children.length;

    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 4000); // Change slide every 4 seconds
  }

  // Chat box functionality
  const chatToggleBtn = document.getElementById("chatToggleBtn");
  const chatBoxContainer = document.getElementById("chatBoxContainer");
  const closeChatBtn = document.getElementById("closeChatBtn");

  if (chatToggleBtn && chatBoxContainer && closeChatBtn) {
    function openChat() {
      chatBoxContainer.classList.remove(
        "opacity-0",
        "translate-y-10",
        "invisible"
      );
      chatBoxContainer.classList.add("opacity-100", "translate-y-0", "visible");
      chatToggleBtn.innerHTML = '<i class="ph-bold ph-x text-2xl"></i>';
      chatToggleBtn.classList.remove("bg-green-500", "hover:bg-green-600");
      chatToggleBtn.classList.add("bg-gray-600", "hover:bg-gray-700");
    }

    function closeChat() {
      chatBoxContainer.classList.add(
        "opacity-0",
        "translate-y-10",
        "invisible"
      );
      chatBoxContainer.classList.remove(
        "opacity-100",
        "translate-y-0",
        "visible"
      );
      chatToggleBtn.innerHTML =
        '<i class="ph-bold ph-chat-teardrop-dots text-2xl animate-pulse"></i>';
      chatToggleBtn.classList.remove("bg-gray-600", "hover:bg-gray-700");
      chatToggleBtn.classList.add("bg-green-500", "hover:bg-green-600");
    }

    // Toggle chat window
    chatToggleBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Cực kỳ quan trọng: Ngăn không cho sự kiện click lan ra document
      const isVisible = chatBoxContainer.classList.contains("visible");

      if (isVisible) {
        closeChat();
      } else {
        openChat();
      }
    });

    // Close chat window via close button inside chat header
    closeChatBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      closeChat();
    });

    // Close chat window when clicking outside
    document.addEventListener("click", (event) => {
      const isVisible = chatBoxContainer.classList.contains("visible");
      const isClickOutside = !chatBoxContainer.contains(event.target);

      if (isVisible && isClickOutside) {
        closeChat();
      }
    });

    // Chat Messaging Logic
    const chatInput = document.getElementById("chatInput");
    const sendChatBtn = document.getElementById("sendChatBtn");
    const chatMessages = document.getElementById("chatMessages");

    if (chatInput && sendChatBtn && chatMessages) {
      function sendMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;

        // Add user message to UI
        const userMessageHTML = `
                    <div class="flex gap-2 max-w-[85%] self-end flex-row-reverse">
                        <div class="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm border border-blue-600 leading-relaxed">
                            ${messageText}
                        </div>
                    </div>
                `;
        chatMessages.insertAdjacentHTML("beforeend", userMessageHTML);
        chatInput.value = "";
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate bot typing indicator
        setTimeout(() => {
          const botTypingId = "typing-" + Date.now();
          const botTypingHTML = `
                        <div id="${botTypingId}" class="flex gap-2 max-w-[85%]">
                            <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                <i class="ph-fill ph-robot text-white text-[10px]"></i>
                            </div>
                            <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100 flex items-center gap-1">
                                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                                <span class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></span>
                            </div>
                        </div>
                    `;
          chatMessages.insertAdjacentHTML("beforeend", botTypingHTML);
          chatMessages.scrollTop = chatMessages.scrollHeight;

          // Simulate bot response after typing
          setTimeout(() => {
            const typingIndicator = document.getElementById(botTypingId);
            if (typingIndicator) typingIndicator.remove();

            const botResponseHTML = `
                            <div class="flex gap-2 max-w-[85%]">
                                <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                                    <i class="ph-fill ph-robot text-white text-[10px]"></i>
                                </div>
                                <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 border border-gray-100 leading-relaxed">
                                    Dạ vâng, hệ thống đã ghi nhận. Tư vấn viên của Atlantis sẽ liên hệ hỗ trợ anh/chị ngay nhé! Anh/chị cần hỗ trợ gấp vui lòng gọi Hotline: 0329.585.872 ạ.
                                </div>
                            </div>
                        `;
            chatMessages.insertAdjacentHTML("beforeend", botResponseHTML);
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }, 1500);
        }, 500);
      }

      // Send when clicking the button
      sendChatBtn.addEventListener("click", sendMessage);

      // Send when pressing Enter key
      chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
        }
      });
    }
  }

  // Product Gallery & Lightbox
  const productImages = [
    "./img/trungbun2rovabat.png",
    "./img/z7345484422385_cc140105b9589e0f9cfadc51e8cb4d4c-Recovered.jpg",
    "https://trungbunatlantis.store/wp-content/uploads/2026/05/Untitled-1.jpg",
    "img/z8019800062555_272a80831c1cb3ac8737d5b38051fefe.jpg",
    "img/z8019800079076_b7ad02663c5dcf9b4966d7c15c79f87b.jpg",
    "img/z8019800079077_37071f7ae8bff0d7eef93b9d173b6395.jpg",
    "img/z8019800079079_32678d2b747ba83090caced61e348c46.jpg",
    "img/1021745523526750.mp4",
  ];
  let currentImageIndex = 0;

  // Render product thumbnails function
  window.renderThumbnailsUI = () => {
    const thumbnailsContainer = document.getElementById("productThumbnailsContainer");
    if (thumbnailsContainer) {
      thumbnailsContainer.innerHTML = productImages
        .map(
          (src, i) => `
              <button onclick="changeMainImage(${i})" class="w-14 h-14 rounded-lg border-2 overflow-hidden shrink-0 product-thumb transition-all ${i === 0
              ? "border-primary"
              : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-300"
            }">
          ${src.endsWith(".mp4")
              ? `<video muted playsinline preload="metadata" src="${src}" class="w-full h-full object-cover"><source src="${src}" type="video/mp4"></video>`
              : `<img src="${src}" class="w-full h-full object-cover" />`
            }
              </button>
          `
        )
        .join("");
    }
  };

  // Render on page load
  window.renderThumbnailsUI();
  window.changeMainImage = (index) => {
    currentImageIndex = index;
    const lb = document.getElementById("lightbox");
    const isLightboxOpen = lb && !lb.classList.contains("hidden");
    // Nếu lightbox đang mở, chỉ cập nhật src chứ không tự động phát video ngoài main view
    updateMediaElement(
      "mainProductImage",
      productImages[index],
      !isLightboxOpen
    );

    // Update thumbnails styles
    const thumbs = document.querySelectorAll(".product-thumb");
    thumbs.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add("border-primary");
        thumb.classList.remove("border-transparent", "opacity-70");
      } else {
        thumb.classList.remove("border-primary");
        thumb.classList.add("border-transparent", "opacity-70");
      }
    });
  };

  // Lightbox Functions
  const lightbox = document.getElementById("lightbox");
  const lightboxThumbnailsContainer =
    document.getElementById("lightboxThumbnails");

  function updateMediaElement(elementId, src, autoplay = true) {
    let mediaEl = document.getElementById(elementId);
    if (!mediaEl) return null;
    const isVideo = src.endsWith(".mp4");
    const isCurrentVideo = mediaEl.tagName.toLowerCase() === "video";

    if (isVideo && !isCurrentVideo) {
      const video = document.createElement("video");
      video.id = elementId;
      video.src = src;
      video.className = mediaEl.className;
      video.controls = true; // Always add controls so user can unmute or pause

      if (autoplay) {
        video.autoplay = true;
        video.loop = false;
        video.muted = false; // Phát có tiếng luôn theo yêu cầu
      }
      video.playsInline = true;
      mediaEl.parentNode.replaceChild(video, mediaEl);

      if (autoplay) {
        // Xử lý policy của trình duyệt chặn autoplay có tiếng
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Nếu bị chặn, tự động chuyển sang tắt tiếng để vẫn chạy được
            video.muted = true;
            video.play().catch(() => { });
          });
        }
      }

      return video;
    } else if (!isVideo && isCurrentVideo) {
      const img = document.createElement("img");
      img.id = elementId;
      img.src = src;
      img.className = mediaEl.className;
      mediaEl.parentNode.replaceChild(img, mediaEl);
      return img;
    } else {
      mediaEl.src = src;
      if (isVideo) {
        mediaEl.muted = false; // Phát có tiếng
        mediaEl.load();
        if (autoplay) {
          const playPromise = mediaEl.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              mediaEl.muted = true;
              mediaEl.play().catch(() => { });
            });
          }
        }
      }
      return mediaEl;
    }
  }

  window.openLightbox = () => {
    const currentLightboxImg = document.getElementById("lightboxImage");
    if (!lightbox || !currentLightboxImg) return;

    // Tạm dừng video ở màn hình chính (nếu đang phát) để không bị tiếng đè lên nhau khi mở lightbox
    const mainMedia = document.getElementById("mainProductImage");
    if (mainMedia && mainMedia.tagName.toLowerCase() === "video") {
      mainMedia.pause();
    }

    updateMediaElement("lightboxImage", productImages[currentImageIndex], true);
    const newLightboxImg = document.getElementById("lightboxImage");

    // Render thumbnails in lightbox
    if (lightboxThumbnailsContainer) {
      lightboxThumbnailsContainer.innerHTML = productImages
        .map(
          (src, i) => `
                <button onclick="updateLightboxImage(event, ${i})" class="w-14 h-14 md:w-20 md:h-20 shrink-0 border-2 rounded-lg overflow-hidden transition-all ${i === currentImageIndex
              ? "border-primary"
              : "border-transparent opacity-50 hover:opacity-100"
            }">
                   ${src.endsWith(".mp4")
              ? `<video muted playsinline preload="metadata" src="${src}" class="w-full h-full object-cover"><source src="${src}" type="video/mp4"></video>`
              : `<img src="${src}" class="w-full h-full object-cover" />`
            }
                </button>
            `
        )
        .join("");
    }

    // Show lightbox
    lightbox.classList.remove("hidden");
    // Trigger reflow
    void lightbox.offsetWidth;
    lightbox.classList.remove("opacity-0");
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      newLightboxImg.classList.remove("scale-95");
      newLightboxImg.classList.add("scale-100");
    }, 10);
  };

  window.closeLightbox = () => {
    const currentLightboxImg = document.getElementById("lightboxImage");
    if (!lightbox || !currentLightboxImg) return;

    lightbox.classList.add("opacity-0");
    currentLightboxImg.classList.remove("scale-100");
    currentLightboxImg.classList.add("scale-95");

    if (currentLightboxImg.tagName.toLowerCase() === "video") {
      currentLightboxImg.pause();
    }

    setTimeout(() => {
      lightbox.classList.add("hidden");
      document.body.style.overflow = "";
    }, 300);
  };

  window.updateLightboxImage = (event, index) => {
    if (event) event.stopPropagation();
    currentImageIndex = index;
    updateMediaElement("lightboxImage", productImages[currentImageIndex], true);
    changeMainImage(index); // Sync with main page

    // Update thumbnail borders in lightbox
    if (lightboxThumbnailsContainer) {
      const lbThumbs = lightboxThumbnailsContainer.querySelectorAll("button");
      lbThumbs.forEach((thumb, i) => {
        if (i === currentImageIndex) {
          thumb.classList.add("border-primary");
          thumb.classList.remove("border-transparent", "opacity-50");
        } else {
          thumb.classList.remove("border-primary");
          thumb.classList.add("border-transparent", "opacity-50");
        }
      });
    }
  };

  window.prevLightboxImage = (event) => {
    if (event) event.stopPropagation();
    currentImageIndex =
      (currentImageIndex - 1 + productImages.length) % productImages.length;
    updateLightboxImage(null, currentImageIndex);
  };

  window.nextLightboxImage = (event) => {
    if (event) event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    updateLightboxImage(null, currentImageIndex);
  };

  // Close lightbox on click outside
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (
        e.target === lightbox ||
        e.target.closest("#lightboxThumbnails") === null
      ) {
        closeLightbox();
      }
    });
  }

  // Comment Submission Logic
  const submitCommentBtn = document.getElementById("submitCommentBtn");
  const commentText = document.getElementById("commentText");
  const commentName = document.getElementById("commentName");
  const commentPhone = document.getElementById("commentPhone");
  const commentListContainer = document.getElementById("commentListContainer");

  if (submitCommentBtn) {
    submitCommentBtn.addEventListener("click", () => {
      const text = commentText.value.trim();
      const name = commentName.value.trim();
      const phone = commentPhone.value.trim();

      if (!text) {
        alert("Vui lòng nhập nội dung bình luận.");
        return;
      }
      if (!name) {
        alert("Vui lòng nhập họ tên.");
        return;
      }
      if (!phone) {
        alert("Vui lòng nhập số điện thoại.");
        return;
      }

      // Generate random avatar color and initial
      const initial = name.charAt(0).toUpperCase();
      const colors = [
        "bg-blue-100 text-blue-700",
        "bg-purple-100 text-purple-700",
        "bg-pink-100 text-pink-700",
        "bg-indigo-100 text-indigo-700",
        "bg-teal-100 text-teal-700"
      ];
      const colorClass = colors[Math.floor(Math.random() * colors.length)];

      const newCommentHTML = `
        <div class="flex gap-4 animate-[fadeIn_0.5s_ease-out]">
          <div class="w-10 h-10 ${colorClass} rounded-full flex items-center justify-center shrink-0 font-bold text-lg">
            ${initial}
          </div>
          <div class="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex-1">
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <h4 class="font-bold text-gray-900">${name}</h4>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center">
                <i class="ph-fill ph-check-circle mr-1"></i>Đã mua hàng
              </span>
              <span class="text-sm text-gray-500 ml-auto">Vừa xong</span>
            </div>
            <p class="text-gray-700 whitespace-pre-line">${text}</p>
            <div class="flex gap-4 mt-3 text-sm text-gray-500">
              <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors">
                <i class="ph ph-thumbs-up text-lg"></i> Hữu ích (0)
              </button>
              <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors">
                <i class="ph ph-chat-circle text-lg"></i> Trả lời
              </button>
            </div>
          </div>
        </div>
      `;

      // Prepend the new comment to the list
      if (commentListContainer) {
        commentListContainer.insertAdjacentHTML("afterbegin", newCommentHTML);
      }

      // Clear form and show success message
      commentText.value = "";
      commentName.value = "";
      commentPhone.value = "";
      alert("Cảm ơn bạn! Bình luận của bạn đã được gửi thành công.");
    });
  }

  // Load more comments and Lead Collection logic
  const loadMoreCommentsBtn = document.getElementById("loadMoreCommentsBtn");
  const loadMoreCommentsContainer = document.getElementById("loadMoreCommentsContainer");
  const leadCollectionModal = document.getElementById("leadCollectionModal");
  const closeLeadModalBtn = document.getElementById("closeLeadModalBtn");
  const leadCollectionForm = document.getElementById("leadCollectionForm");

  if (loadMoreCommentsBtn) {
    let isCommentsLoaded = false;

    loadMoreCommentsBtn.addEventListener("click", () => {
      if (!isCommentsLoaded) {
        // 3 bình luận giả lập
        const moreCommentsHTML = `
          <!-- Comment 3 -->
          <div class="flex gap-4 animate-[fadeIn_0.5s_ease-out]">
            <div class="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center shrink-0 font-bold text-lg">
              M
            </div>
            <div class="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex-1">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <h4 class="font-bold text-gray-900">Minh Tiến</h4>
                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center"><i class="ph-fill ph-check-circle mr-1"></i>Đã mua hàng</span>
                <span class="text-sm text-gray-500 ml-auto">2 ngày trước</span>
              </div>
              <p class="text-gray-700">
                Chất lượng inox khá tốt, dày dặn, không mỏng manh như mấy loại ngoài chợ. Đun sôi rất nhanh, giữ nhiệt lâu. Nói chung đáng tiền.
              </p>
              <div class="flex gap-4 mt-3 text-sm text-gray-500">
                <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors"><i class="ph ph-thumbs-up text-lg"></i> Hữu ích (5)</button>
                <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors"><i class="ph ph-chat-circle text-lg"></i> Trả lời</button>
              </div>
            </div>
          </div>

          <!-- Comment 4 -->
          <div class="flex gap-4 animate-[fadeIn_0.5s_ease-out]" style="animation-delay: 0.1s; animation-fill-mode: both;">
            <div class="w-10 h-10 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center shrink-0 font-bold text-lg">
              L
            </div>
            <div class="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex-1">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <h4 class="font-bold text-gray-900">Lê Quỳnh Anh</h4>
                <span class="text-sm text-gray-500 ml-auto">3 ngày trước</span>
              </div>
              <p class="text-gray-700">
                Shop ơi, mua nồi này có được tặng kèm rổ trụng không ạ? Mình thấy trên video có.
              </p>
              <div class="flex gap-4 mt-3 text-sm text-gray-500">
                <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors"><i class="ph ph-thumbs-up text-lg"></i> Hữu ích (1)</button>
                <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors"><i class="ph ph-chat-circle text-lg"></i> Trả lời</button>
              </div>
              <!-- Trả lời của shop -->
              <div class="mt-4 flex gap-3 border-t border-gray-100 pt-4">
                <div class="w-8 h-8 bg-blue-100 text-primary rounded-full flex items-center justify-center shrink-0">
                  <i class="ph-fill ph-storefront text-lg"></i>
                </div>
                <div class="flex-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-bold text-gray-900 text-sm">Atlantis Official <span class="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-sm ml-1 uppercase font-semibold">QTV</span></h4>
                    <span class="text-xs text-gray-500 ml-auto">3 ngày trước</span>
                  </div>
                  <p class="text-gray-700 text-sm">
                    Dạ chào chị Quỳnh Anh, bộ sản phẩm bếp trụng mặc định sẽ tặng kèm theo 2 giỏ trụng inox chị nhé. Chị yên tâm ạ!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Comment 5 -->
          <div class="flex gap-4 animate-[fadeIn_0.5s_ease-out]" style="animation-delay: 0.2s; animation-fill-mode: both;">
            <div class="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center shrink-0 font-bold text-lg">
              Đ
            </div>
            <div class="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex-1">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <h4 class="font-bold text-gray-900">Đức Tài</h4>
                <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center"><i class="ph-fill ph-check-circle mr-1"></i>Đã mua hàng</span>
                <span class="text-sm text-gray-500 ml-auto">4 ngày trước</span>
              </div>
              <p class="text-gray-700">
                Giao hàng nhanh, đóng gói cẩn thận. Bếp dùng khá mượt, bảng điều khiển dễ thao tác. Nên mua nha mọi người.
              </p>
              <div class="flex gap-4 mt-3 text-sm text-gray-500">
                <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors"><i class="ph ph-thumbs-up text-lg"></i> Hữu ích (8)</button>
                <button class="hover:text-primary flex items-center gap-1 font-medium transition-colors"><i class="ph ph-chat-circle text-lg"></i> Trả lời</button>
              </div>
            </div>
          </div>
        `;

        if (commentListContainer) {
          // Chèn vào cuối danh sách bình luận hiện tại
          commentListContainer.insertAdjacentHTML("beforeend", moreCommentsHTML);
        }

        isCommentsLoaded = true;
      } else {
        // Mở popup modal
        if (leadCollectionModal) {
          leadCollectionModal.classList.remove("hidden");
          leadCollectionModal.classList.add("flex");
          // trigger reflow
          void leadCollectionModal.offsetWidth;
          leadCollectionModal.classList.remove("opacity-0");
          document.body.style.overflow = "hidden";

          const modalContent = document.getElementById("leadCollectionModalContent");
          if (modalContent) {
            modalContent.classList.remove("scale-95");
            modalContent.classList.add("scale-100");
          }
        }
      }
    });
  }

  // Close Lead Modal logic
  const closeLeadModal = () => {
    if (leadCollectionModal) {
      leadCollectionModal.classList.add("opacity-0");
      const modalContent = document.getElementById("leadCollectionModalContent");
      if (modalContent) {
        modalContent.classList.remove("scale-100");
        modalContent.classList.add("scale-95");
      }

      setTimeout(() => {
        leadCollectionModal.classList.add("hidden");
        leadCollectionModal.classList.remove("flex");
        document.body.style.overflow = "";
      }, 300);
    }
  };

  if (closeLeadModalBtn) {
    closeLeadModalBtn.addEventListener("click", closeLeadModal);
  }

  if (leadCollectionModal) {
    leadCollectionModal.addEventListener("click", (e) => {
      if (e.target === leadCollectionModal) {
        closeLeadModal();
      }
    });
  }

  // Handle Form Submit
  if (leadCollectionForm) {
    leadCollectionForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Thu thập dữ liệu
      const name = document.getElementById("leadName").value;
      const phone = document.getElementById("leadPhone").value;
      const reason = document.getElementById("leadReason").value;
      const notes = document.getElementById("leadNotes").value;

      console.log("Lead Data:", { name, phone, reason, notes });

      alert("Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ sớm nhất.");
      closeLeadModal();

      // Ẩn nút xem thêm bình luận sau khi gửi form thành công
      if (loadMoreCommentsContainer) {
        loadMoreCommentsContainer.style.display = 'none';
      } else if (loadMoreCommentsBtn) {
        loadMoreCommentsBtn.style.display = 'none';
      }
    });
  }
});

// ==========================================
// MÔ PHỎNG DỮ LIỆU TỪ API & RENDER ĐỘNG
// ==========================================
const mockApiProductData = {
  id: "SP_ATLANTIS_01",
  name: "Bếp Trụng Đa Năng",
  rating: 4.9,
  reviewsCount: 128,
  soldCount: "2.466",
  features: [
    "Công suất: 2500W",
    "Dung tích: Phù hợp quán ăn vừa và nhỏ",
    "Chất liệu: Inox cao cấp chống ăn mòn"
  ],
  materials: [
    {
      id: "204",
      name: "Inox 204",
      desc: "Tiêu chuẩn",
      price: 4800000,
      originalPrice: 6720000,
      discount: 40,
      isHot: false
    },
    {
      id: "304",
      name: "Inox 304",
      desc: "Cao cấp siêu bền",
      price: 5500000,
      originalPrice: 7150000,
      discount: 30,
      isHot: true
    }
  ]
};

// Cập nhật lại hàm updatePrice để lấy dữ liệu từ API thay vì hardcode
window.updatePrice = (materialId) => {
  const currentPrice = document.getElementById("currentPrice");
  const originalPrice = document.getElementById("originalPrice");
  const discountBadge = document.getElementById("discountBadge");
  const mainDiscountBadge = document.getElementById("mainDiscountBadge");

  const selectedMaterial = mockApiProductData.materials.find(m => m.id === materialId);
  if (selectedMaterial) {
    if (currentPrice) currentPrice.innerText = selectedMaterial.price.toLocaleString('vi-VN') + "₫";
    if (originalPrice) originalPrice.innerText = selectedMaterial.originalPrice.toLocaleString('vi-VN') + "₫";
    if (discountBadge) discountBadge.innerText = "-" + selectedMaterial.discount + "%";
    if (mainDiscountBadge) mainDiscountBadge.innerText = "-" + selectedMaterial.discount + "%";
  }
};

window.renderProductFromAPI = (data) => {
  const container = document.getElementById("apiProductContainer");
  if (!container) return;

  const defaultMaterial = data.materials[0];

  container.innerHTML = `
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100 flex flex-col md:flex-row">
      <div class="md:w-1/2 p-6 md:p-8 bg-secondary flex flex-col justify-center items-center relative">
        <div id="mainDiscountBadge" class="absolute top-4 left-4 bg-red-600 text-white font-bold px-4 py-1.5 rounded-full text-sm z-10 shadow-md">
          -${defaultMaterial.discount}%
        </div>

        <!-- Main Image -->
        <div class="relative w-full h-64 md:h-80 flex justify-center items-center group cursor-pointer" onclick="openLightbox()">
          <img id="mainProductImage" src="./img/trungbun2rovabat.png" alt="${data.name}" class="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
          <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
            <div class="bg-white/80 w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
              <i class="ph-bold ph-magnifying-glass-plus text-2xl text-primary"></i>
            </div>
          </div>
        </div>

        <!-- Thumbnails -->
        <div id="productThumbnailsContainer" class="flex gap-2 mt-6 w-full justify-center overflow-x-auto pb-2">
          <!-- Sẽ được render lại qua JS -->
        </div>
      </div>
      
      <div class="p-4 md:p-8 md:w-1/2 flex flex-col justify-center">
        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">${data.name}</h3>
        
        <div class="flex items-center gap-1.5 md:gap-3 mb-4 text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
          <div class="flex text-yellow-400">
            <i class="ph-fill ph-star"></i>
          </div>
          <div class="text-gray-500 border-l border-gray-300 pl-1.5 md:pl-3">
            <span class="font-medium text-gray-900">${data.rating}/5</span> (${data.reviewsCount} đánh giá)
          </div>
          <i class="ph-bold ph-shopping-cart text-sm md:text-xl ml-0.5 md:ml-0"></i>
          <div class="text-gray-500 border-l border-gray-300 pl-1.5 md:pl-3">
            Đã bán <span class="font-medium text-gray-900">${data.soldCount}</span>
          </div>
        </div>

        <div class="flex gap-1.5 md:gap-3 mb-6 items-end whitespace-nowrap">
          <span id="currentPrice" class="text-2xl md:text-3xl font-bold text-accent leading-none">${defaultMaterial.price.toLocaleString('vi-VN')}₫</span>
          <span id="originalPrice" class="text-gray-400 line-through text-sm md:text-lg mb-0.5 md:mb-1 leading-none">${defaultMaterial.originalPrice.toLocaleString('vi-VN')}₫</span>
          <span id="discountBadge" class="bg-red-100 text-red-600 text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded mb-0.5 md:mb-2 leading-none">-${defaultMaterial.discount}%</span>
        </div>

        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">Chọn chất liệu:</h4>
          <div class="flex gap-3">
            ${data.materials.map((mat, index) => `
              <label class="cursor-pointer relative flex-1">
                <input type="radio" name="material" value="${mat.id}" class="peer sr-only" ${index === 0 ? 'checked' : ''} onchange="updatePrice('${mat.id}')">
                <div class="px-3 py-2 border-2 border-gray-200 rounded-lg peer-checked:border-primary peer-checked:bg-blue-50 hover:border-primary/50 transition-all text-center h-full flex flex-col justify-center">
                  <div class="font-bold text-gray-900 peer-checked:text-primary">${mat.name}</div>
                  <div class="text-xs text-gray-500">${mat.desc}</div>
                </div>
                ${mat.isHot ? '<div class="absolute -top-3 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white">HOT</div>' : ''}
              </label>
            `).join('')}
          </div>
        </div>

        <div class="mb-8 space-y-3 text-base text-gray-600 flex-1">
          ${data.features.map(f => `
            <p class="flex items-center gap-2">
              <i class="ph-fill ph-check-circle text-green-500"></i> ${f}
            </p>
          `).join('')}
        </div>
        
        <div class="grid grid-cols-2 gap-4 mt-auto">
          <a href="#dathang" class="bg-accent text-white text-center py-4 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg">MUA NGAY</a>
          <a href="tel:0329585872" class="bg-white border-2 border-primary text-primary text-center py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors">GỌI TƯ VẤN</a>
        </div>
      </div>
    </div>
  `;

  // Gọi lại hàm render thumbnail
  if (window.renderThumbnailsUI) {
    window.renderThumbnailsUI();
  }
  // Đồng bộ ảnh chính với thumbnail đầu tiên
  if (window.changeMainImage) {
    window.changeMainImage(0);
  }
};

// Gọi giả lập data fetch
document.addEventListener("DOMContentLoaded", () => {
  // Giả lập API gọi mất 800ms
  setTimeout(() => {
    if (window.renderProductFromAPI) {
      window.renderProductFromAPI(mockApiProductData);
    }
  }, 800);
});
