<div id="promoPopupOverlay"
    class="fixed inset-0 z-[300] bg-black/50 hidden opacity-0 items-center justify-center p-4">
    <!-- Confetti particles container -->
    <div id="promoConfettiContainer" class="absolute inset-0 overflow-hidden pointer-events-none"></div>

    <!-- Popup Content -->
    <div id="promoPopupContent"
      class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden opacity-0">
      <!-- Top decorative gradient bar -->
      <div class="h-2 bg-gradient-to-r from-blue-500 via-primary to-blue-400"></div>

      <!-- Close button -->
      <button id="promoCloseBtn" type="button"
        class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors text-gray-500 hover:text-gray-800">
        <i class="ph-bold ph-x text-lg"></i>
      </button>

      <!-- Header Section with gradient -->
      <div
        class="relative bg-gradient-to-br from-blue-600 via-primary to-blue-800 px-6 pt-8 pb-10 text-white text-center overflow-hidden">
        <!-- Background glow -->
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

        <!-- Badge -->
        <div
          class="promo-badge-float inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full mb-4 shadow-lg">
          <i class="ph-fill ph-fire text-sm"></i> ƯU ĐÃI ĐẶC BIỆT
        </div>

        <!-- Discount text -->
        <h3 class="text-3xl md:text-4xl font-extrabold mb-2 leading-tight drop-shadow-md">
          NHẬN NGAY
          <span class="block text-yellow-300 text-4xl md:text-5xl mt-1"
            style="text-shadow: 0 2px 10px rgba(0,0,0,0.3);">Ưu đãi giảm 100k</span>
        </h3>
        <p class="text-blue-100 text-sm font-medium">
          Nếu đặt hàng ngay hôm nay
        </p>
      </div>

      <!-- Body -->
      <div class="px-6 pb-6 -mt-4">
        <!-- Default View -->
        <div id="promoDefaultView">
          <!-- Card features -->
          <div class="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-5 mb-5">
          <ul class="space-y-3">
            <li class="flex items-center gap-3 text-sm text-gray-700">
              <div class="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <i class="ph-fill ph-check-circle text-green-500 text-lg"></i>
              </div>
              <span>Miễn phí tư vấn lắp đặt toàn quốc </span>
            </li>
            <li class="flex items-center gap-3 text-sm text-gray-700">
              <div class="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <i class="ph-fill ph-check-circle text-green-500 text-lg"></i>
              </div>
              <span>Bảo hành chính hãng lên đến 18 tháng</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-gray-700">
              <div class="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <i class="ph-fill ph-check-circle text-green-500 text-lg"></i>
              </div>
              <span>Hỗ trợ trả góp 0% lãi suất</span>
            </li>
          </ul>
        </div>

        <!-- Urgency countdown -->
        <div class="flex items-center justify-center gap-2 mb-5">
          <i class="ph-fill ph-clock text-red-500 text-lg"></i>
          <span class="text-sm text-gray-600 font-medium">Ưu đãi kết thúc sau:</span>
          <div class="flex gap-1">
            <span data-timer="hours" class="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">02</span>
            <span class="text-red-500 font-bold">:</span>
            <span data-timer="minutes" class="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">15</span>
            <span class="text-red-500 font-bold">:</span>
            <span data-timer="seconds" class="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">45</span>
          </div>
        </div>

        <!-- CTA Button -->
        <button id="promoCTABtn" type="button"
          class="promo-cta-btn w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 text-lg flex items-center justify-center gap-2">
          <i class="ph-fill ph-gift text-xl"></i> NHẬN ƯU ĐÃI NGAY
        </button>

        <!-- Sub text -->
        <p id="promoSubText" class="text-center text-xs text-gray-400 mt-3">
          <i class="ph ph-shield-check"></i> Cam kết bảo mật thông tin 100%
        </p>
        </div>

        <!-- Form View -->
        <form id="promoLeadForm" class="hidden space-y-4">
          <div class="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-5 mb-5 space-y-4 relative z-10">
            <p class="text-gray-700 text-sm text-center font-medium">Vui lòng để lại thông tin để nhận mã giảm giá 100k cho đơn hàng của bạn.</p>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="promoName">Họ và tên *</label>
              <input type="text" id="promoName" name="entry.name" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Nhập họ và tên">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1" for="promoPhone">Số điện thoại *</label>
              <input type="tel" id="promoPhone" name="entry.phone" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Nhập số điện thoại">
            </div>
            <button type="submit" id="promoSubmitBtn" class="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 text-lg flex items-center justify-center gap-2 mt-4 relative">
               <span id="promoSubmitText">XÁC NHẬN NHẬN MÃ</span>
               <i id="promoSubmitLoading" class="ph-bold ph-spinner animate-spin text-xl hidden absolute right-4"></i>
            </button>
          </div>
        </form>

        <!-- Success View -->
        <div id="promoSuccessView" class="hidden">
          <div class="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-5 mb-5 flex flex-col items-center justify-center relative z-10">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <i class="ph-fill ph-check-circle text-green-500 text-4xl"></i>
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-2">Đăng ký thành công!</h4>
            <p class="text-gray-600 text-center mb-4 text-sm">Cảm ơn bạn. Đây là mã giảm giá 100k của bạn:</p>
            <div class="bg-yellow-50 border-2 border-yellow-400 border-dashed rounded-lg px-6 py-3 mb-4 inline-block">
              <span class="text-2xl font-black text-yellow-600 tracking-wider">VCH100K</span>
            </div>
            <p class="text-gray-500 text-xs text-center mb-4">Vui lòng cung cấp mã này cho nhân viên tư vấn khi đặt hàng.</p>
            <button id="promoContinueBtn" type="button" class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 text-base flex items-center justify-center gap-2">
              <i class="ph-fill ph-shopping-cart text-xl"></i> TIẾP TỤC MUA HÀNG
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>