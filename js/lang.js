'use strict';

/* ---------- Language Strings (ZH / EN) ---------- */
const LANG = {
  zh: {
    /* Navbar */
    'nav-news':'最新消息','nav-events':'展演活動','nav-discover':'文化探索',
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
    /* Concept */
    'concept-title':'臺灣<em>尚趴</em>',
    'concept-slogan':'Feel the Pop · 曼哈頓的臺灣日常',
    'concept-manifesto':'台灣文化不是博物館裡的展品，而是此刻正在發生的生活日常。2026 年，Taiwan Pop 以塗鴉為語言，以藝術為媒介，帶著七大展演橫跨曼哈頓——從大師講座到中央公園夏日舞台，讓紐約在這個夏天，看見最真實的台灣。',
    'concept-p1-title':'紐文中心<br>文化地標',
    'concept-p1-desc':'紐文中心作為黑潮計畫的實體品牌中心，透過塗鴉次文化元素融入公務大樓外觀，成為曼哈頓最具辨識度的台灣文化打卡地標。每一位走進這裡的訪客，都是台灣文化的第一手見證者。',
    'concept-p2-title':'線性串連<br>整個夏天',
    'concept-p2-desc':'從 5 月的林懷民大師講座，到 8 月中央公園的 Taiwanese Waves，七個活動成為每一個行銷波段的節點，以連續出現的主視覺建立視覺覆蓋，讓整個紐約的夏天都有台灣的聲音。',
    'concept-p3-title':'Taiwan Pop<br>視覺覆蓋',
    'concept-p3-desc':'一個以紐約塗鴉文化為靈魂的主視覺，持續出現在街頭廣告、在地商家、活動現場。每一杯貼著主視覺的手搖飲、每一個茄芷袋，都是行走在曼哈頓的台灣文化宣言。',
    /* Events */
    'sec-events-title':'展演活動',
    'sec-events-sub':'2026 年，十二場跨領域藝文展演，以三大主題在紐約呈現最真實的台灣',
    'cat-sound-label':'身體與聲音',
    'cat-sound-sub':'現場表演・音樂・舞蹈',
    'cat-image-label':'影像與敘事',
    'cat-image-sub':'電影・視覺藝術・文學',
    'cat-street-label':'街頭與生活',
    'cat-street-sub':'藝術節・遊行・城市現場',
    'event-cta':'了解更多・立即報名 →',
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
    'footer-news':'最新消息','footer-events':'展演活動','footer-discover':'文化探索',
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
    /* Concept */
    'concept-title':'Taiwan <em>Pops</em>',
    'concept-slogan':'Feel the Pop · Taiwanese Daily Life in Manhattan',
    'concept-manifesto':"Taiwan's culture isn't confined to museums — it's alive, unfolding in the streets right now. In 2026, Taiwan Pop speaks through graffiti, moves through art, and arrives in Manhattan with seven events stretching from masterclass to outdoor stage — letting New York feel the most authentic Taiwan.",
    'concept-p1-title':'Cultural Hub<br>in Manhattan',
    'concept-p1-desc':"The Taiwanese Cultural Center serves as the physical brand hub of the Black Current Project. Through graffiti-infused architecture, it becomes Manhattan's most recognizable Taiwan cultural landmark — a space where every visitor witnesses Taiwan's culture firsthand.",
    'concept-p2-title':'Seven Events<br>All Summer Long',
    'concept-p2-desc':"From Lin Hwai-min's masterclass in May to Taiwanese Waves at Central Park in August, seven events anchor each campaign wave — building sustained visual coverage that ensures Taiwan's voice is heard throughout New York's entire summer.",
    'concept-p3-title':'Taiwan Pop<br>Visual Identity',
    'concept-p3-desc':"A single visual identity rooted in New York's graffiti culture appears across billboards, local shops, and event venues. Every branded bubble tea cup, every tote bag on the subway, is a Taiwan cultural statement walking through Manhattan.",
    /* Events */
    'sec-events-title':'Performances',
    'sec-events-sub':'Twelve cross-disciplinary arts events in 2026, presenting the most authentic Taiwan in New York across three themes',
    'cat-sound-label':'Body & Sound',
    'cat-sound-sub':'Live Performance · Music · Dance',
    'cat-image-label':'Image & Narrative',
    'cat-image-sub':'Film · Visual Arts · Literature',
    'cat-street-label':'Street & Life',
    'cat-street-sub':'Festival · Parade · Urban Scene',
    'event-cta':'Learn More · Register →',
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
