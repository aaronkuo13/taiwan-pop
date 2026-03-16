'use strict';

/* ---------- Language Strings (ZH / EN) ---------- */
const LANG = {
  zh: {
    /* Navbar */
    'nav-news':'最新消息','nav-events':'七大活動','nav-discover':'文化探索',
    'nav-calendar':'行事曆','nav-contact':'聯絡我們',
    /* Banner */
    'banner-sub':'台灣文化部 × 紐約文化局合作計畫<br>七大藝文展演，2026 紐約登場',
    'btn-explore':'探索活動','btn-news':'最新消息',
    /* Articles */
    'sec-news-title':'最新消息',
    'sec-news-sub':'掌握 Taiwan Pop 計畫最新動態，了解台灣與紐約的文化對話',
    'art-1-cat':'官方公告',
    'art-1-title':'Taiwan Pop 計畫正式啟動！台灣文化將在紐約發聲',
    'art-1-desc':'台灣文化部攜手紐約文化局，共同推出 Taiwan Pop 文化交流計畫，七大藝文展演於 2026 年在紐約各地精彩登場。',
    'art-2-cat':'活動預告',
    'art-2-title':'雲門舞集創辦人林懷民將赴紐約展開大師講座',
    'art-2-desc':'臺美藝文大師系列講座首場邀請林懷民現身紐約，暢談台灣當代藝術創作、身體美學與跨文化對話。',
    'art-3-cat':'活動預告',
    'art-3-title':'中央公園 SummerStage「Taiwanese Waves」盛夏登場',
    'art-3-desc':'Taiwan Pop 壓軸活動確認進駐紐約著名戶外演出場地 SummerStage，帶來融合台灣當代音樂與視覺的跨界演出。',
    'art-4-cat':'專題報導',
    'art-4-title':'什麼是 Taiwan Pop？一個讓台灣文化被看見的計畫',
    'art-4-desc':'從當代舞蹈、原住民古謠、街頭藝術到電影影展，Taiwan Pop 不只是音樂，而是多元台灣文化的全面展演。',
    'btn-more-news':'查看更多消息',
    /* Events */
    'sec-events-title':'七大主題活動',
    'sec-events-sub':'2026 年，七場跨領域藝文展演，在紐約呈現最真實的台灣',
    /* Discover */
    'sec-discover-title':'探索台灣 × 紐約',
    'sec-discover-sub':'滑動地圖，找到每場活動的地點，點擊開始你的台灣文化探索之旅',
    'map-hint':'← 滑動探索地圖 →',
    'map-prefix':'已探索','map-suffix':'個台灣文化主題',
    /* Calendar */
    'sec-cal-title':'活動行事曆',
    'sec-cal-sub':'掌握所有活動日期，提前規劃您的參與計畫',
    'cal-upcoming-h':'近期活動','cal-legend':'活動日期','cal-no-events':'暫無近期活動',
    /* Footer */
    'footer-desc':'Taiwan Pop 是台灣文化部與紐約文化局合作的年度文化交流計畫，透過七大藝文展演讓台灣被世界看見。',
    'footer-links-h':'快速連結','footer-contact-h':'聯絡資訊',
    'footer-news':'最新消息','footer-events':'七大活動','footer-discover':'文化探索',
    'footer-cal':'行事曆','footer-hours':'週一至週五 09:00–18:00 (TST)',
    /* Map Pins */
    'pin-1':'林懷民講座','pin-2':'NSO × 泰武古謠','pin-3':'布希維克街頭藝術節',
    'pin-4':'臺灣主題影展','pin-5':'紐約同志大遊行','pin-6':'翃舞製作','pin-7':'Taiwanese Waves',
    /* Modal */
    'modal-cta':'了解更多詳情 →',
    /* Quiz UI */
    'quiz-back':'← 返回地圖',
    'quiz-next-q':'下一題 →','quiz-see-result':'查看結果 →',
    'quiz-retry':'再試一次','quiz-back-map':'回到地圖 ↗',
    'quiz-res-perfect':'完美！你對台灣文化的了解讓我們驕傲！',
    'quiz-res-good':'答得不錯！你已經對台灣有相當的認識了。',
    'quiz-res-keep':'繼續加油！台灣的故事等著你慢慢探索。',
    /* Celebration */
    'cel-title':'台灣文化全制霸！',
    'cel-sub':'你以全滿分征服了所有七大主題！<br>對台灣文化的熱情與了解，令我們驕傲。',
    'cel-badge':'✨ 七大文化探索者 ✨',
    'cel-invite':'準備好親臨紐約，感受這些文化盛事了嗎？',
    'cel-to-events':'前往活動頁面 →','cel-close':'繼續探索',
    /* Calendar internals */
    months:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    shortMonths:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    weekdays:['日','一','二','三','四','五','六'],
    calTitle:(y,mn)=>`${y} 年 ${mn}`,
  },
  en: {
    /* Navbar */
    'nav-news':'News','nav-events':'Events','nav-discover':'Discover',
    'nav-calendar':'Calendar','nav-contact':'Contact',
    /* Banner */
    'banner-sub':'Taiwan Ministry of Culture × NYC Dept. of Cultural Affairs<br>Seven Cultural Events, New York 2026',
    'btn-explore':'Explore Events','btn-news':'Latest News',
    /* Articles */
    'sec-news-title':'Latest News',
    'sec-news-sub':'Stay up to date with Taiwan Pop and the cultural dialogue between Taiwan and New York',
    'art-1-cat':'Announcement',
    'art-1-title':'Taiwan Pop Officially Launched — Taiwan Culture Coming to New York',
    'art-1-desc':"Taiwan's Ministry of Culture and NYC's Dept. of Cultural Affairs jointly launch the Taiwan Pop cultural exchange, bringing seven spectacular arts events across New York in 2026.",
    'art-2-cat':'Preview',
    'art-2-title':'Cloud Gate Founder Lin Hwai-min to Give Masterclass in New York',
    'art-2-desc':"The first Taiwan-US Arts Master Series invites Lin Hwai-min to New York to share his five-decade creative journey and Taiwan's contemporary arts with the world.",
    'art-3-cat':'Preview',
    'art-3-title':'"Taiwanese Waves" at Central Park SummerStage This Summer',
    'art-3-desc':"Taiwan Pop's grand finale is confirmed at New York's iconic outdoor venue SummerStage, featuring a cross-disciplinary show blending Taiwan's contemporary music and visual arts.",
    'art-4-cat':'Feature',
    'art-4-title':"What Is Taiwan Pop? A Campaign to Put Taiwan's Culture on the World Stage",
    'art-4-desc':"From contemporary dance and indigenous chants to street art and film — Taiwan Pop is more than music. It's a full showcase of Taiwan's diverse cultural identity.",
    'btn-more-news':'More News',
    /* Events */
    'sec-events-title':'Seven Cultural Events',
    'sec-events-sub':'Seven cross-disciplinary arts events in 2026, presenting the most authentic Taiwan in New York',
    /* Discover */
    'sec-discover-title':'Discover Taiwan × New York',
    'sec-discover-sub':"Scroll the map to find each event's location. Click to begin your Taiwan cultural exploration",
    'map-hint':'← Scroll to Explore →',
    'map-prefix':'Explored','map-suffix':'Cultural Themes',
    /* Calendar */
    'sec-cal-title':'Event Calendar',
    'sec-cal-sub':'Mark your calendar and plan your visit in advance',
    'cal-upcoming-h':'Upcoming Events','cal-legend':'Event Date','cal-no-events':'No upcoming events',
    /* Footer */
    'footer-desc':'Taiwan Pop is an annual cultural exchange program by the Taiwan Ministry of Culture and NYC Dept. of Cultural Affairs, showcasing Taiwan to the world through seven arts events.',
    'footer-links-h':'Quick Links','footer-contact-h':'Contact',
    'footer-news':'News','footer-events':'Events','footer-discover':'Discover',
    'footer-cal':'Calendar','footer-hours':'Mon–Fri 09:00–18:00 (TST)',
    /* Map Pins */
    'pin-1':'Lin Hwai-min Lecture','pin-2':'NSO × Taiwu Ballads','pin-3':'Bushwick Street Art Festival',
    'pin-4':'Taiwan Film Festival','pin-5':'NYC Pride March','pin-6':'H·Art·Ch Dance','pin-7':'Taiwanese Waves',
    /* Modal */
    'modal-cta':'Learn More →',
    /* Quiz UI */
    'quiz-back':'← Back to Map',
    'quiz-next-q':'Next →','quiz-see-result':'See Results →',
    'quiz-retry':'Try Again','quiz-back-map':'Back to Map ↗',
    'quiz-res-perfect':'Perfect! Your knowledge of Taiwanese culture fills us with pride!',
    'quiz-res-good':'Well done! You already have a solid understanding of Taiwan.',
    'quiz-res-keep':"Keep going! The story of Taiwan is waiting to be explored.",
    /* Celebration */
    'cel-title':'Taiwan Cultural Grand Master!',
    'cel-sub':"You've aced all seven themes with a perfect score!<br>Your passion and knowledge of Taiwanese culture fills us with pride.",
    'cel-badge':'✨ Seven Cultural Explorer ✨',
    'cel-invite':'Ready to experience these cultural events in New York?',
    'cel-to-events':'Go to Events →','cel-close':'Keep Exploring',
    /* Calendar internals */
    months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    shortMonths:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    weekdays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    calTitle:(y,mn)=>`${mn} ${y}`,
  }
};
