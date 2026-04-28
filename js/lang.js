'use strict';

/* ---------- Language Strings (ZH / EN) ---------- */
const LANG = {
  zh: {
    /* Navbar */
    'nav-concept':'策劃理念',
    'nav-news':'最新消息','nav-events':'展演活動',
    'nav-calendar':'行事曆',
    /* a-we NYC Run */
    'game-awe-title':'a-we <span>紐約</span>跑酷',
    'game-awe-sub':'跑過紐約，跳越展演場館，探索 Taiwan Pop 文化活動',
    'sec-awe-sub':'跟著 a-We 跑過紐約，跳越展演場館，解鎖台灣文化活動資訊，登上排行榜！',
    'home-awe-cta':'來去跑酷！',
    /* Banner */
    'banner-sub':'文化部 × 駐紐約臺北文化中心<br>七大藝文展演，2026 紐約登場',
    'btn-explore':'探索活動','btn-news':'最新消息',
    /* News */
    'sec-themes-title':'展演主題',
    'sec-news-title':'掌握動態',
    'btn-more-news':'查看全部',
    /* Event categories */
    'cat-sound-label':'身體與聲音',
    'cat-sound-sub':'現場表演・音樂・舞蹈',
    'cat-image-label':'影像與敘事',
    'cat-image-sub':'電影・藝文對談',
    'cat-street-label':'街頭與生活',
    'cat-street-sub':'藝術節・城市遊行',
    /* Concept page — theme event list items */
    'cp-ev-sound-1':'林懷民 × 美國舞蹈節 對談',
    'cp-ev-sound-2':'NSO《來自臺灣》',
    'cp-ev-sound-3':'翃舞製作《羽人》',
    'cp-ev-sound-4':'2026臺灣之夜 @ SummerStage',
    'cp-ev-sound-5':'嚴俊傑鋼琴講座暨示範演出',
    'cp-ev-image-1':'世界之間：臺灣電影',
    'cp-ev-street-1':'布希維克街頭藝術計畫',
    'cp-ev-street-2':'紐約同志遊行',
    /* Index showcase stats */
    'stat-1-desc':'7項精彩展演節目',
    'stat-2-desc':'3種臺灣藝文維度',
    'stat-3-desc':'1場曼哈頓的臺灣文化共振',
    'tc-link':'<span class="arr">→</span>',
    'bc-tag':'CONCEPT · 策劃理念',
    'bc-title':'臺灣上奅',
    'bc-sub':'曼哈頓的台灣日常 · Feel the POP',
    'bc-ev-org':'台灣文化部 × Taipei Cultural Center in NY',
    'bc-ev-city':'MAY — SEP 2026 · 曼哈頓',
    /* News page */
    'news-page-title':'掌握<br>動態',
    'news-cat-all':'全部',
    'news-cat-announce':'官方公告',
    'news-cat-preview':'活動預告',
    'news-cat-feature':'專題報導',
    'news-cat-media':'媒體報導',
    'news-load-more':'載入更多',
    'news-loading':'載入中',
    /* Calendar */
    'cal-upcoming-h':'近期活動',
    /* Footer */
    'footer-desc':'2026年5月至9月，紐約曼哈頓',
    'footer-news':'最新消息','footer-events':'展演活動',
    'footer-cal':'行事曆',
    /* Calendar internals */
    months:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    shortMonths:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    weekdays:['日','一','二','三','四','五','六'],
    calTitle:(y,mn)=>`${y} 年 ${mn}`,
  },
  en: {
    /* Navbar */
    'nav-concept':'TAIWAN POP',
    'nav-news':'News','nav-events':'Events',
    'nav-calendar':'Schedule',
    /* a-we NYC Run */
    'game-awe-title':'a-we <span>NYC</span> Run',
    'game-awe-sub':'Run through NYC, jump over venues, discover Taiwan Pop events',
    'sec-awe-sub':'Run through New York with a-We, leap over event venues, unlock cultural event info, and claim your spot on the leaderboard!',
    'home-awe-cta':'Let\'s Run!',
    /* Banner */
    'banner-sub':'Taiwan Ministry of Culture × Taipei Cultural Center in NY<br>Seven Cultural Events, New York 2026',
    'btn-explore':'Explore Events','btn-news':'Latest News',
    /* News */
    'sec-themes-title':'Event Themes',
    'sec-news-title':'Latest News',
    'btn-more-news':'View All',
    /* Event categories */
    'cat-sound-label':'Body & Sound',
    'cat-sound-sub':'Live Performance · Music · Dance',
    'cat-image-label':'Image & Narrative',
    'cat-image-sub':'Film · Art Dialogue',
    'cat-street-label':'Street & Life',
    'cat-street-sub':'Festival · Pride Parade',
    /* Concept page — theme event list items */
    'cp-ev-sound-1':'Lin Hwai-min × ADF in Conversation',
    'cp-ev-sound-2':'From Formosa: NSO US Tour',
    'cp-ev-sound-3':'HUNG DANCE — BIRDY',
    'cp-ev-sound-4':'Taiwanese Waves 2026 @ SummerStage',
    'cp-ev-sound-5':'Chun-Chieh Yen: Piano Lecture & Demonstration',
    'cp-ev-image-1':'Between Worlds: Taiwanese Cinema',
    'cp-ev-street-1':'Taiwanese Artists @ 2026 Bushwick Collective Block Party',
    'cp-ev-street-2':'NYC Pride March',
    /* Index showcase stats */
    'stat-1-desc':'7 Programs',
    'stat-2-desc':'3 Cultural Dimensions',
    'stat-3-desc':'One Shared Experience in Manhattan',
    'tc-link':'<span class="arr">→</span>',
    'bc-tag':'CONCEPT · TAIWAN POP',
    'bc-title':'SIŌNG PHĀNN',
    'bc-sub':'Taiwan\'s Daily Life in Manhattan · Feel the POP',
    'bc-ev-org':'Taiwan Ministry of Culture × Taipei Cultural Center in NY',
    'bc-ev-city':'MAY — SEP 2026 · Manhattan',
    /* News page */
    'news-page-title':'Latest<br>News',
    'news-cat-all':'All',
    'news-cat-announce':'Announcement',
    'news-cat-preview':'Preview',
    'news-cat-feature':'Feature',
    'news-cat-media':'Media',
    'news-load-more':'Load More',
    'news-loading':'Loading',
    /* Calendar */
    'cal-upcoming-h':'Upcoming Events',
    /* Footer */
    'footer-desc':'May–September 2026, Manhattan, New York',
    'footer-news':'News','footer-events':'Events',
    'footer-cal':'Calendar',
    /* Calendar internals */
    months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    shortMonths:['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    weekdays:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    calTitle:(y,mn)=>`${mn} ${y}`,
  }
};
