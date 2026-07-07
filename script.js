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
});
