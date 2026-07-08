// Scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove("opacity-0", "translate-y-10", "invisible");
                scrollToTopBtn.classList.add("opacity-100", "translate-y-0", "visible");
            } else {
                scrollToTopBtn.classList.add("opacity-0", "translate-y-10", "invisible");
                scrollToTopBtn.classList.remove("opacity-100", "translate-y-0", "visible");
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Countdown Timer Functionality
    const hoursEls = document.querySelectorAll("[data-timer='hours']");
    const minutesEls = document.querySelectorAll("[data-timer='minutes']");
    const secondsEls = document.querySelectorAll("[data-timer='seconds']");

    // Loop through all timers on the page
    for (let i = 0; i < hoursEls.length; i++) {
        const hoursEl = hoursEls[i];
        const minutesEl = minutesEls[i];
        const secondsEl = secondsEls[i];

        if (hoursEl && minutesEl && secondsEl) {
            let hours = parseInt(hoursEl.innerText, 10) || 0;
            let minutes = parseInt(minutesEl.innerText, 10) || 0;
            let seconds = parseInt(secondsEl.innerText, 10) || 0;

            let totalSeconds = hours * 3600 + minutes * 60 + seconds;

            const updateTimer = () => {
                if (totalSeconds <= 0) return; // Stop at 0
                totalSeconds--;

                const h = Math.floor(totalSeconds / 3600);
                const m = Math.floor((totalSeconds % 3600) / 60);
                const s = totalSeconds % 60;

                hoursEl.innerText = h.toString().padStart(2, '0');
                minutesEl.innerText = m.toString().padStart(2, '0');
                secondsEl.innerText = s.toString().padStart(2, '0');
            };

            setInterval(updateTimer, 1000);
        }
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
            chatBoxContainer.classList.remove("opacity-0", "translate-y-10", "invisible");
            chatBoxContainer.classList.add("opacity-100", "translate-y-0", "visible");
            chatToggleBtn.innerHTML = '<i class="ph-bold ph-x text-2xl"></i>';
            chatToggleBtn.classList.remove("bg-green-500", "hover:bg-green-600");
            chatToggleBtn.classList.add("bg-gray-600", "hover:bg-gray-700");
        }

        function closeChat() {
            chatBoxContainer.classList.add("opacity-0", "translate-y-10", "invisible");
            chatBoxContainer.classList.remove("opacity-100", "translate-y-0", "visible");
            chatToggleBtn.innerHTML = '<i class="ph-bold ph-chat-teardrop-dots text-2xl animate-pulse"></i>';
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
                    const botTypingId = 'typing-' + Date.now();
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
        "./img/ChatGPT Image Jul 7, 2026, 11_46_47 AM.png",
        "./img/z7345484422385_cc140105b9589e0f9cfadc51e8cb4d4c-Recovered.jpg",
        "https://trungbunatlantis.store/wp-content/uploads/2026/05/Untitled-1.jpg",
        "img/z8019800062555_272a80831c1cb3ac8737d5b38051fefe.jpg",
        "img/z8019800079076_b7ad02663c5dcf9b4966d7c15c79f87b.jpg",
        "img/z8019800079077_37071f7ae8bff0d7eef93b9d173b6395.jpg",
        "img/z8019800079079_32678d2b747ba83090caced61e348c46.jpg"
    ];
    let currentImageIndex = 0;

    // Render product thumbnails on page load
    const thumbnailsContainer = document.getElementById('productThumbnailsContainer');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = productImages.map((src, i) => `
            <button onclick="changeMainImage(${i})" class="w-16 h-16 rounded-lg border-2 overflow-hidden shrink-0 product-thumb transition-all ${i === 0 ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-300'}">
                <img src="${src}" class="w-full h-full object-cover" />
            </button>
        `).join('');
    }
    window.changeMainImage = (index) => {
        currentImageIndex = index;
        const mainImg = document.getElementById('mainProductImage');
        if (mainImg) mainImg.src = productImages[index];

        // Update thumbnails styles
        const thumbs = document.querySelectorAll('.product-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('border-primary');
                thumb.classList.remove('border-transparent', 'opacity-70');
            } else {
                thumb.classList.remove('border-primary');
                thumb.classList.add('border-transparent', 'opacity-70');
            }
        });
    };

    // Lightbox Functions
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxThumbnailsContainer = document.getElementById('lightboxThumbnails');

    window.openLightbox = () => {
        if (!lightbox || !lightboxImg) return;

        lightboxImg.src = productImages[currentImageIndex];

        // Render thumbnails in lightbox
        if (lightboxThumbnailsContainer) {
            lightboxThumbnailsContainer.innerHTML = productImages.map((src, i) => `
                <button onclick="updateLightboxImage(event, ${i})" class="w-16 h-16 md:w-20 md:h-20 shrink-0 border-2 rounded-lg overflow-hidden transition-all ${i === currentImageIndex ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-100'}">
                    <img src="${src}" class="w-full h-full object-cover" />
                </button>
            `).join('');
        }

        // Show lightbox
        lightbox.classList.remove('hidden');
        // Trigger reflow
        void lightbox.offsetWidth;
        lightbox.classList.remove('opacity-0');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            lightboxImg.classList.remove('scale-95');
            lightboxImg.classList.add('scale-100');
        }, 10);
    };

    window.closeLightbox = () => {
        if (!lightbox || !lightboxImg) return;

        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');

        setTimeout(() => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    };

    window.updateLightboxImage = (event, index) => {
        if (event) event.stopPropagation();
        currentImageIndex = index;
        lightboxImg.src = productImages[currentImageIndex];
        changeMainImage(index); // Sync with main page

        // Update thumbnail borders in lightbox
        if (lightboxThumbnailsContainer) {
            const lbThumbs = lightboxThumbnailsContainer.querySelectorAll('button');
            lbThumbs.forEach((thumb, i) => {
                if (i === currentImageIndex) {
                    thumb.classList.add('border-primary');
                    thumb.classList.remove('border-transparent', 'opacity-50');
                } else {
                    thumb.classList.remove('border-primary');
                    thumb.classList.add('border-transparent', 'opacity-50');
                }
            });
        }
    };

    window.prevLightboxImage = (event) => {
        if (event) event.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
        updateLightboxImage(null, currentImageIndex);
    };

    window.nextLightboxImage = (event) => {
        if (event) event.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % productImages.length;
        updateLightboxImage(null, currentImageIndex);
    };

    // Close lightbox on click outside
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.closest('#lightboxThumbnails') === null) {
                closeLightbox();
            }
        });
    }
});
