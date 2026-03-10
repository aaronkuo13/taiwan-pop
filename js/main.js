/* ============================================================
   Taiwan Pop — Main JavaScript
   ============================================================ */

'use strict';

/* ---------- Language Strings (ZH / EN) ---------- */
const LANG = {
  zh: {
    /* Navbar */
    'nav-news':'最新消息','nav-events':'七大活動','nav-discover':'文化探索',
    'nav-calendar':'行事曆','nav-gallery':'活動花絮','nav-contact':'聯絡我們',
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
    /* Gallery */
    'sec-gallery-title':'活動花絮',
    'sec-gallery-sub':'回顧精彩活動瞬間，感受 Taiwan Pop 的無限活力',
    /* Footer */
    'footer-desc':'Taiwan Pop 是台灣文化部與紐約文化局合作的年度文化交流計畫，透過七大藝文展演讓台灣被世界看見。',
    'footer-links-h':'快速連結','footer-contact-h':'聯絡資訊',
    'footer-news':'最新消息','footer-events':'七大活動','footer-discover':'文化探索',
    'footer-cal':'行事曆','footer-gallery':'活動花絮','footer-hours':'週一至週五 09:00–18:00 (TST)',
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
    'nav-calendar':'Calendar','nav-gallery':'Gallery','nav-contact':'Contact',
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
    /* Gallery */
    'sec-gallery-title':'Gallery',
    'sec-gallery-sub':'Relive the highlights and feel the energy of Taiwan Pop',
    /* Footer */
    'footer-desc':'Taiwan Pop is an annual cultural exchange program by the Taiwan Ministry of Culture and NYC Dept. of Cultural Affairs, showcasing Taiwan to the world through seven arts events.',
    'footer-links-h':'Quick Links','footer-contact-h':'Contact',
    'footer-news':'News','footer-events':'Events','footer-discover':'Discover',
    'footer-cal':'Calendar','footer-gallery':'Gallery','footer-hours':'Mon–Fri 09:00–18:00 (TST)',
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

/* ---------- Events Data ---------- */
const EVENTS = [
  {
    num:'01', icon:'🎭',
    date:'2026-05-01',
    title:'臺美藝文大師系列講座 ─ 林懷民',
    title_en:'Taiwan-US Arts Master Lecture — Lin Hwai-min',
    location:'Lincoln Center, New York, NY',
    desc:'雲門舞集創辦人林懷民將於 5 月 1 日在紐約親身登場，分享橫跨半世紀的創作歷程與台灣當代藝術的國際視野，是不可錯過的藝文饗宴。',
    desc_en:"Cloud Gate founder Lin Hwai-min takes the stage in New York on May 1st, sharing five decades of creative vision and Taiwan's contemporary arts with the world. Not to be missed."
  },
  {
    num:'02', icon:'🎼',
    date:'2026-05-19',
    title:'NSO × 泰武古謠',
    title_en:'NSO × Taiwu Ancient Ballads',
    location:'Carnegie Hall, New York, NY',
    desc:'5 月 19 日，國家交響樂團（NSO）攜手屏東泰武國小古謠傳唱隊，以當代管弦與排灣族千年古謠的相遇，呈現台灣最深層的音樂靈魂。',
    desc_en:"On May 19th, the National Symphony Orchestra joins the Taiwu Elementary Ancient Ballads Choir — a meeting of contemporary orchestral music and thousand-year-old Paiwan chants, revealing the deepest soul of Taiwan's music."
  },
  {
    num:'03', icon:'🎨',
    date:'2026-05-28', endDate:'2026-05-30',
    title:'布希維克街頭藝術節',
    title_en:'Bushwick Street Art Festival',
    location:'Bushwick Collective, Brooklyn, NY',
    desc:'5 月 28 日至 30 日，三天藝術盛典！台灣視覺藝術家進駐布魯克林藝術重鎮 Bushwick，以壁畫、裝置與現場創作，在紐約最具活力的街頭留下台灣的印記。',
    desc_en:"May 28–30, a three-day art extravaganza! Taiwanese visual artists take over Brooklyn's art hub Bushwick, leaving Taiwan's mark on the city's most vibrant streets through murals, installations, and live creation."
  },
  {
    num:'04', icon:'🎬',
    date:'2026-06-01', endDate:'2026-06-28',
    title:'臺灣主題影展',
    title_en:'Taiwan Film Festival NYC',
    location:'IFC Center, Greenwich Village, NY',
    desc:'6 月前四週，精選台灣當代電影與紀錄片，每週於紐約影展場地輪番放映，讓國際觀眾透過鏡頭認識台灣的土地、人文與當代生活故事。',
    desc_en:"Every week in June, curated Taiwanese films and documentaries screen in New York, inviting international audiences to discover Taiwan's landscapes, people, and contemporary life through film."
  },
  {
    num:'05', icon:'🌈',
    date:'2026-06-28',
    title:'紐約同志大遊行',
    title_en:'NYC Pride March',
    location:'5th Avenue, Manhattan, NY',
    desc:'6 月 28 日，Taiwan Pop 代表隊盛裝參與世界最大同志遊行，以台灣驕傲的多元包容價值向全球發聲，展現台灣在亞洲人權進步的先行姿態。',
    desc_en:"On June 28th, the Taiwan Pop delegation marches in the world's largest Pride parade, broadcasting Taiwan's values of diversity and inclusion and showcasing Taiwan's pioneering role in Asian human rights."
  },
  {
    num:'06', icon:'💃',
    date:'2026-07-17', endDate:'2026-07-18',
    title:'翃舞製作',
    title_en:'Horse Dance Productions',
    location:'The Joyce Theater, Chelsea, NY',
    desc:'7 月 17 日至 18 日，翃舞製作以當代舞蹈語彙回應台灣社會文化，在紐約舞台呈現融合東方美學與當代肢體語言的精彩舞作，展現台灣舞蹈的國際高度。',
    desc_en:'July 17–18, Horse Dance Productions responds to Taiwanese society and culture through contemporary dance vocabulary, presenting works that fuse Eastern aesthetics and contemporary movement on the New York stage.'
  },
  {
    num:'07', icon:'🎵',
    date:'2026-08-16',
    title:'"SummerStage" Taiwanese Waves',
    title_en:'"SummerStage" Taiwanese Waves',
    location:'Central Park SummerStage, New York, NY',
    desc:'Taiwan Pop 壓軸鉅獻！8 月 16 日在紐約中央公園 SummerStage 舉辦台灣音樂之夜，集結台灣當代音樂人，以最震撼的現場演出向紐約致敬。',
    desc_en:'The grand Taiwan Pop finale! On August 16th at Central Park SummerStage, a night of Taiwanese music brings together contemporary Taiwanese artists for an electrifying live show in tribute to New York.'
  },
];

/* ---------- Quiz Game Data ---------- */
const GAME_DATA = {
  'lin-hwai-min': {
    id:'lin-hwai-min', title:'臺美藝文大師講座', subtitle:'林懷民 Lin Hwai-min',
    emoji:'🎭', color:'#8B4513', colorLight:'#fdf3e7',
    venue:'Lincoln Center, Upper West Side',
    unlockMsg:'你已認識台灣最重要的舞蹈藝術家之一！',
    questions:[
      { q:'林懷民在 1973 年創立的舞團，以台灣哪個傳統意象命名？',
        opts:['雲門','竹影','墨荷','山嵐'], ans:0,
        fact:'「雲門」取自《呂氏春秋》，是中國最古老的舞蹈之一，象徵天地之氣。雲門舞集是台灣第一個現代舞職業舞團。' },
      { q:'林懷民除了是舞蹈家，他還有另一個重要身份是？',
        opts:['小說家','電影導演','音樂家','建築師'], ans:0,
        fact:'林懷民 22 歲就出版小說《蟬》，融合文學與肢體的思維深刻影響了雲門作品的敘事性。' },
      { q:'雲門舞集代表作《薪傳》，描述的是台灣哪段歷史？',
        opts:['先民渡海來台','日治時期抗爭','二二八事件','台灣經濟奇蹟'], ans:0,
        fact:'《薪傳》1978 年首演，描述漢人先民冒險橫越台灣海峽來台墾荒，在台美斷交當晚演出，感動無數台灣人。' },
      { q:'林懷民的舞作常融合哪些台灣在地元素？',
        opts:['書法、太極、傳統音樂','嘻哈、街舞','芭蕾、歌劇','說唱、相聲'], ans:0,
        fact:'雲門舞集深受東方美學影響，林懷民曾讓舞者練習書法、太極導引，將這些身體訓練融入現代舞語彙中。' },
      { q:'林懷民於 2019 年退休，他將雲門舞集交棒給哪位接班人？',
        opts:['鄭宗龍','布拉瑞揚','周書毅','黃翊'], ans:0,
        fact:'鄭宗龍來自台北萬華，作品融合台灣庶民生活與當代舞蹈美學，成為雲門第二代藝術總監。' }
    ]
  },
  'nso-paiwan': {
    id:'nso-paiwan', title:'NSO × 泰武古謠', subtitle:'原住民音樂 Indigenous Music',
    emoji:'🎵', color:'#1a6b3c', colorLight:'#e8f5ee',
    venue:'Carnegie Hall, Midtown',
    unlockMsg:'你已走入台灣原住民族的音樂靈魂！',
    questions:[
      { q:'泰武古謠傳唱所在的「泰武鄉」位於台灣哪個縣市？',
        opts:['屏東縣','台東縣','花蓮縣','南投縣'], ans:0,
        fact:'泰武鄉位於屏東縣，是排灣族重要的文化聚落。泰武國小的古謠合唱團曾登上國際舞台，將排灣族傳統吟唱帶給全世界。' },
      { q:'台灣官方認定的原住民族共有幾族？',
        opts:['16 族','9 族','12 族','20 族'], ans:0,
        fact:'台灣目前官方認定 16 個原住民族，各族擁有不同語言、音樂、祭儀與服飾。原住民族人口約 57 萬，佔全台人口約 2.4%。' },
      { q:'排灣族傳統音樂中，有一種重要的雙管樂器叫做？',
        opts:['鼻笛','口琴','月琴','陶笛'], ans:0,
        fact:'鼻笛（paringed）是排灣族男性以鼻子吹奏的傳統樂器，象徵愛情與思念，是極具代表性的原住民族樂器。' },
      { q:'布農族哪首歌曾因旋律特殊而被送往太空？',
        opts:['祈禱小米豐收歌','捕魚祭歌','年祭歡歌','打耳祭歌'], ans:0,
        fact:'布農族「祈禱小米豐收歌」是全球罕見的天然複音合唱，被聯合國教科文組織關注，並於 1970 年代被送上太空探測器。' },
      { q:'NSO 國家交響樂團成立於哪一年？',
        opts:['1986 年','1970 年','2000 年','1995 年'], ans:0,
        fact:'NSO 國家交響樂團成立於 1986 年，是台灣最重要的職業交響樂團，長期致力於跨文化合作與原創委託。' }
    ]
  },
  'bushwick': {
    id:'bushwick', title:'布希維克街頭藝術節', subtitle:'台灣視覺藝術 Taiwan Visual Art',
    emoji:'🎨', color:'#e8472a', colorLight:'#fdeee9',
    venue:'Bushwick Collective, Brooklyn',
    unlockMsg:'你已發現台灣視覺藝術的當代能量！',
    questions:[
      { q:'布希維克（Bushwick）位於紐約哪個行政區？',
        opts:['布魯克林','曼哈頓','皇后區','布朗克斯'], ans:0,
        fact:'Bushwick 位於布魯克林東北部，過去是工業區，近年成為全球最重要的街頭藝術聚落之一，每年吸引世界各地藝術家在此創作壁畫。' },
      { q:'台灣廟宇文化中，哪種視覺元素最常出現在當代台灣藝術中？',
        opts:['龍、虎、神明圖騰','梅花與竹子','101大樓剪影','台灣黑熊'], ans:0,
        fact:'台灣廟宇是當代設計師最重要的靈感來源之一。龍柱、交趾陶、剪黏工藝等廟宇美學，被大量轉化為現代插畫、街頭藝術與品牌設計。' },
      { q:'台灣哪個地方以「彩虹眷村」壁畫聞名，差點遭拆除卻因民眾連署保留？',
        opts:['台中','台北','高雄','嘉義'], ans:0,
        fact:'台中彩虹眷村由老兵黃永阜一人獨力彩繪，原本面臨拆除，後因民眾連署而保留，是台灣最具代表性的庶民藝術故事。' },
      { q:'台灣近年最受國際關注的當代藝術博覽會是？',
        opts:['Taipei Dangdai（台北當代）','故宮特展','總統府藝廊','ART TAIPEI'], ans:0,
        fact:'Taipei Dangdai 自 2019 年起每年舉辦，匯聚亞洲與全球頂尖畫廊，是台灣打入國際當代藝術市場的重要窗口。' },
      { q:'「眷村文化」孕育了大量台灣藝術家，眷村最初是為安置哪些人而建立？',
        opts:['1949年隨國民政府來台的軍人及家屬','日治時期留台日本人','原住民族遷移安置','越戰難民'], ans:0,
        fact:'眷村孕育了侯孝賢、朱天文等大批文藝人才。眷村美學融合中國各省習俗與台灣在地文化，形成獨特的混血風格。' }
    ]
  },
  'film': {
    id:'film', title:'臺灣主題影展', subtitle:'台灣電影 Taiwan Cinema',
    emoji:'🎬', color:'#1a3a6b', colorLight:'#e8edf5',
    venue:'IFC Center, Greenwich Village',
    unlockMsg:'你已進入台灣電影的黃金世界！',
    questions:[
      { q:'台灣導演李安以哪部電影首次獲得奧斯卡最佳導演獎？',
        opts:['斷背山','臥虎藏龍','少年Pi的奇幻漂流','色，戒'], ans:0,
        fact:'李安以《斷背山》（2005）獲得奧斯卡最佳導演獎，是首位獲此殊榮的亞裔導演，被視為全球最具影響力的華裔導演。' },
      { q:'台灣「新電影運動」約發生在哪個年代？',
        opts:['1980 年代','1960 年代','1970 年代','1990 年代'], ans:0,
        fact:'1980 年代，侯孝賢、楊德昌等導演發起台灣新電影運動，以寫實風格記錄台灣社會，讓台灣電影首度在坎城、柏林、威尼斯等影展發光。' },
      { q:'侯孝賢《悲情城市》獲得威尼斯金獅獎，描述的是台灣哪個歷史事件？',
        opts:['二二八事件','台灣光復','戒嚴解除','台美斷交'], ans:0,
        fact:'《悲情城市》（1989）以九份為背景，描述二二八事件後台灣人的創傷，是台灣第一部正面觸及此事件的電影。' },
      { q:'宮崎駿《神隱少女》的靈感場景，據說來自台灣哪個地方？',
        opts:['九份老街','阿里山','淡水','台南安平'], ans:0,
        fact:'九份的金礦小鎮風貌、山城燈籠與茶樓意象，常被認為是《神隱少女》油屋場景的靈感來源之一，讓九份成為全球觀光客必訪之地。' },
      { q:'台灣被稱為「台灣奧斯卡」的電影最高榮譽是？',
        opts:['金馬獎','金鐘獎','金曲獎','金穗獎'], ans:0,
        fact:'金馬獎創立於 1962 年，是華語電影圈歷史最悠久、最具公信力的電影獎項，與金鐘、金曲並稱台灣三金。' }
    ]
  },
  'pride': {
    id:'pride', title:'紐約同志大遊行', subtitle:'台灣 LGBTQ+ 文化',
    emoji:'🏳️‍🌈', color:'#9b30d9', colorLight:'#f3e8fd',
    venue:'5th Avenue, Manhattan',
    unlockMsg:'你已了解台灣在平權路上的驕傲！',
    questions:[
      { q:'台灣在哪一年成為亞洲第一個同性婚姻合法化的國家？',
        opts:['2019 年','2017 年','2021 年','2015 年'], ans:0,
        fact:'2019 年 5 月 24 日，台灣正式成為亞洲首個同性婚姻合法化的國家，全球排名第 27 個，引發全亞洲廣泛關注。' },
      { q:'台灣同志遊行每年在哪個城市舉行，是亞洲規模最大的？',
        opts:['台北','台中','高雄','台南'], ans:0,
        fact:'台北同志遊行自 2003 年起每年舉辦，近年參與人數突破 20 萬人，是亞洲規模最大的同志驕傲遊行。' },
      { q:'台灣同婚合法化的關鍵判決來自哪個機構？',
        opts:['司法院大法官','立法院','行政院','總統府'], ans:0,
        fact:'2017 年司法院大法官做出釋字第 748 號解釋，認定民法不允許同婚違憲，要求立法機關兩年內完成修法，開啟合法化歷程。' },
      { q:'台灣最具代表性的 LGBTQ+ 友善商圈位於台北哪裡？',
        opts:['西門町','信義區','天母','北投'], ans:0,
        fact:'西門町是台灣最具代表性的 LGBTQ+ 友善商圈，被稱為「台灣的 Chelsea」，彩虹旗飄揚的咖啡廳與友善商店密集。' },
      { q:'哪位台灣導演以電影三部曲記錄台灣 LGBTQ+ 故事享譽國際？',
        opts:['周美玲','李安','侯孝賢','魏德聖'], ans:0,
        fact:'周美玲導演的「同志三部曲」以細膩筆觸描繪台灣 LGBTQ+ 生命經驗，在國際影展廣受好評。' }
    ]
  },
  'horse': {
    id:'horse', title:'翃舞製作', subtitle:'台灣當代舞蹈 Contemporary Dance',
    emoji:'💃', color:'#c47a00', colorLight:'#fdf4e0',
    venue:'The Joyce Theater, Chelsea',
    unlockMsg:'你已感受台灣當代舞蹈的力與美！',
    questions:[
      { q:'台灣當代舞蹈最常從哪些台灣本土元素汲取靈感？',
        opts:['廟會儀式與原住民族肢體','古典芭蕾技巧','日本武道','韓國流行舞蹈'], ans:0,
        fact:'台灣當代舞蹈創作者常向廟會陣頭、牽亡魂儀式、原住民族歌舞尋找靈感，以當代技法重新詮釋，形成台灣獨特的舞蹈語彙。' },
      { q:'台灣哪位舞蹈家以「與機器人共舞」聞名全球？',
        opts:['黃翊','布拉瑞揚','鄭宗龍','林懷民'], ans:0,
        fact:'黃翊的代表作《黃翊與庫卡》讓舞者與工業機器人 KUKA 共舞，探討人與科技的關係，在全球 15+ 國家巡演。' },
      { q:'以原住民族身份融合當代舞蹈的布拉瑞揚，屬於哪個族群？',
        opts:['排灣族','阿美族','卑南族','泰雅族'], ans:0,
        fact:'布拉瑞揚·帕格勒法為排灣族人，曾為雲門舞集舞者，2015 年回故鄉台東成立舞團，作品融合排灣族文化與當代舞蹈。' },
      { q:'台灣最重要的表演藝術機構「兩廳院」的正式名稱是？',
        opts:['國立中正文化中心','國立台灣藝術大學','台北市文化局','文化部'], ans:0,
        fact:'兩廳院（國立中正文化中心）旗下的國家音樂廳與國家戲劇院，是台灣表演藝術的最高殿堂。' },
      { q:'「翃」這個字的意思最接近？',
        opts:['鳥振翅飛翔','大地寬廣','水波流動','光芒四射'], ans:0,
        fact:'「翃」意指鳥飛翔的樣子，象徵舞者以身體在空間中飛翔探索的意志。翃舞製作成立於 2011 年，以跨域創作見長。' }
    ]
  },
  'summerstage': {
    id:'summerstage', title:'SummerStage: Taiwanese Waves', subtitle:'台灣之夜 Taiwan Night',
    emoji:'🌙', color:'#0d6b8c', colorLight:'#e0f2f8',
    venue:'Central Park SummerStage, Rumsey Playfield',
    unlockMsg:'你已體驗一夜台灣的完整魅力！',
    questions:[
      { q:'台灣最具代表性的飲料「珍珠奶茶」發源於哪個城市？',
        opts:['台中','台北','台南','高雄'], ans:0,
        fact:'珍珠奶茶（Bubble Tea）1980 年代起源於台中，如今全球市場規模已超過 30 億美元，是台灣對世界飲食文化最大的貢獻之一。' },
      { q:'Central Park SummerStage 提供什麼樣的演出？',
        opts:['免費戶外音樂表演','付費室內音樂廳','電影首映','藝術拍賣'], ans:0,
        fact:'Central Park SummerStage 自 1986 年起每年夏季舉辦免費戶外演出，是紐約最重要的多元文化音樂平台。' },
      { q:'台灣「辦桌文化」是指什麼？',
        opts:['戶外大型宴席文化','便當盒飯文化','夜市攤販文化','早餐店文化'], ans:0,
        fact:'「辦桌」是台灣傳統的戶外宴席文化，在喜慶、廟會等場合，由總鋪師在路邊搭棚大宴賓客，是台灣最具凝聚力的庶民飲食儀式。' },
      { q:'以下哪位音樂人被稱為「華語流行音樂天王」，來自台灣？',
        opts:['周杰倫（Jay Chou）','BTS 防彈少年團','張學友','劉德華'], ans:0,
        fact:'周杰倫自 2000 年代起稱霸全球華語市場，以融合中西音樂元素的創作風格著稱，至今仍是全球最具影響力的華語藝人之一。' },
      { q:'台灣夜市文化中，「雞排」是哪種料理方式的代表？',
        opts:['炸雞胸肉排，比臉大','烤雞腿','滷雞翅','蒸雞肉'], ans:0,
        fact:'台灣大雞排以巨大尺寸（比臉還大）、酥脆外皮聞名，是夜市最具代表性的食物之一，也是外國旅客必嚐的小吃體驗。' }
    ]
  }
};

/* ---------- Render Events Cards (called by initLang on switch) ---------- */
function renderEvents() {
  const lang = window.currentLang || 'zh';
  const grid = document.querySelector('#events .events-grid');
  if (!grid) return;

  const svgCal = `<svg viewBox="0 0 16 16" width="14" height="14"><path d="M2 2h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm0 3v9h12V5H2zm3-4v3M11 1v3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`;

  grid.innerHTML = EVENTS.map(ev => {
    const t = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    const d = (lang === 'en' && ev.desc_en)  ? ev.desc_en  : ev.desc;
    const dateStr = ev.endDate
      ? `${ev.date.replace(/-/g,'.')} – ${ev.endDate.replace(/-/g,'.')}`
      : ev.date.replace(/-/g,'.');
    const learnMore = lang === 'en' ? 'Learn More →' : '了解更多 →';
    return `
      <div class="event-card">
        <div class="event-num">${ev.num}</div>
        <div class="event-icon">${ev.icon}</div>
        <h3>${t}</h3>
        <p class="event-date">${svgCal} ${dateStr}</p>
        <p class="event-desc">${d}</p>
        <a href="#" class="event-link">${learnMore}</a>
      </div>`;
  }).join('');
}

/* ---------- Navbar: transparent → solid on scroll ---------- */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-label', navLinks.classList.contains('open') ? '關閉選單' : '開啟選單');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ---------- Active nav link on scroll ---------- */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-60px 0px -60px 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ---------- Calendar ---------- */
(function initCalendar() {
  const grid     = document.getElementById('calGrid');
  const title    = document.getElementById('calTitle');
  const prevBtn  = document.getElementById('prevMonth');
  const nextBtn  = document.getElementById('nextMonth');
  const upcoming = document.getElementById('upcomingList');

  if (!grid) return;

  // Build eventMap: single-day → one key; multi-day → one key per day in range
  const eventMap = {};
  function addEventToMap(key, ev) {
    if (!eventMap[key]) eventMap[key] = [];
    if (!eventMap[key].find(e => e.num === ev.num)) eventMap[key].push(ev);
  }
  EVENTS.forEach(ev => {
    if (ev.endDate) {
      const start = new Date(ev.date + 'T12:00:00');
      const end   = new Date(ev.endDate + 'T12:00:00');
      for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        addEventToMap(`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`, ev);
      }
    } else {
      addEventToMap(ev.date, ev);
    }
  });

  const today = new Date();
  let current = new Date(today.getFullYear(), today.getMonth(), 1);

  const firstEvent = EVENTS.map(e => new Date(e.date)).sort((a, b) => a - b)[0];
  if (firstEvent && firstEvent > today) {
    current = new Date(firstEvent.getFullYear(), firstEvent.getMonth(), 1);
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function dateKey(y, m, d) { return `${y}-${pad(m+1)}-${pad(d)}`; }

  function renderCalendar() {
    const L     = LANG[window.currentLang || 'zh'];
    const year  = current.getFullYear();
    const month = current.getMonth();

    title.textContent = L.calTitle(year, L.months[month]);

    // Update weekday headers
    const wdSpans = document.querySelectorAll('.cal-weekdays span');
    wdSpans.forEach((span, i) => { if (L.weekdays[i]) span.textContent = L.weekdays[i]; });

    const firstDay    = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev  = new Date(year, month, 0).getDate();

    grid.innerHTML = '';

    for (let i = firstDay - 1; i >= 0; i--) {
      appendDay(daysInPrev - i, 'other-month', null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = dateKey(year, month, d);
      const isToday = (
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
      const evs = eventMap[key] || [];
      appendDay(d, isToday ? 'today' : '', evs.length ? evs : null, key);
    }

    const total     = firstDay + daysInMonth;
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remainder; d++) {
      appendDay(d, 'other-month', null);
    }

    renderUpcoming();
  }

  function appendDay(day, extraClass, events, key) {
    const el = document.createElement('div');
    el.classList.add('cal-day');
    if (extraClass) extraClass.split(' ').filter(Boolean).forEach(c => el.classList.add(c));

    const num = document.createElement('span');
    num.textContent = day;
    el.appendChild(num);

    if (events && events.length) {
      el.classList.add('has-event');
      el.title = events.map(e => {
        const lang = window.currentLang || 'zh';
        return (lang === 'en' && e.title_en) ? e.title_en : e.title;
      }).join(', ');

      const dots = document.createElement('div');
      dots.className = 'cal-dot-wrap';
      events.slice(0, 3).forEach(() => {
        const dot = document.createElement('span');
        dot.className = 'cal-dot';
        dots.appendChild(dot);
      });
      el.appendChild(dots);

      el.addEventListener('click', () => openModal(events[0]));
    }

    grid.appendChild(el);
  }

  function renderUpcoming() {
    const L    = LANG[window.currentLang || 'zh'];
    const lang = window.currentLang || 'zh';
    upcoming.innerHTML = '';

    const upcomingEvents = EVENTS
      .map(e => ({ ...e, dateObj: new Date(e.date) }))
      .filter(e => e.dateObj >= today)
      .sort((a, b) => a.dateObj - b.dateObj)
      .slice(0, 5);

    if (!upcomingEvents.length) {
      upcoming.innerHTML = `<li style="color:var(--text-muted);font-size:14px">${L['cal-no-events']}</li>`;
      return;
    }

    upcomingEvents.forEach(ev => {
      const [y, m, d] = ev.date.split('-').map(Number);
      const li = document.createElement('li');
      li.className = 'upcoming-item';
      li.style.cursor = 'pointer';

      const evTitle = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;

      let rangeHtml = '';
      if (ev.endDate) {
        const [ey, em, ed] = ev.endDate.split('-').map(Number);
        const rangeStr = (em === m)
          ? `${d}–${ed} ${L.shortMonths[m - 1]}`
          : `${L.shortMonths[m - 1]} ${d} – ${L.shortMonths[em - 1]} ${ed}`;
        rangeHtml = `<span class="upcoming-range">${rangeStr}</span>`;
      }

      li.innerHTML = `
        <div class="upcoming-date-badge">
          <span class="day">${d}</span>
          <span class="month">${L.shortMonths[m - 1]}</span>
        </div>
        <div class="upcoming-info">
          <h4>${evTitle}</h4>
          ${rangeHtml}
          <p>${ev.location}</p>
        </div>
      `;
      li.addEventListener('click', () => openModal(ev));
      upcoming.appendChild(li);
    });
  }

  prevBtn.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); renderCalendar(); });
  nextBtn.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); renderCalendar(); });

  renderCalendar();

  // Expose for language switch re-render
  window.reRenderCalendar = renderCalendar;
})();

/* ---------- Scroll-reveal animation ---------- */
(function initReveal() {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.article-card, .event-card, .gallery-item, .upcoming-item, .calendar-box, .upcoming-box'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ---------- Event Modal ---------- */
(function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  if (!backdrop) return;

  function openModal(ev) {
    const lang  = window.currentLang || 'zh';
    const t     = (lang === 'en' && ev.title_en) ? ev.title_en : ev.title;
    const desc  = (lang === 'en' && ev.desc_en)  ? ev.desc_en  : ev.desc;
    const cta   = LANG[lang]['modal-cta'];

    document.getElementById('modalNum').textContent   = `EVENT ${ev.num || ''}`;
    document.getElementById('modalIcon').textContent  = ev.icon || '';
    document.getElementById('modalTitle').textContent = t;
    const dateDisplay = ev.endDate
      ? `${ev.date.replace(/-/g, '.')} – ${ev.endDate.replace(/-/g, '.')}`
      : ev.date.replace(/-/g, '.');
    document.getElementById('modalDate').querySelector('span').textContent     = dateDisplay;
    document.getElementById('modalLocation').querySelector('span').textContent = ev.location;
    document.getElementById('modalDesc').textContent = desc || '';
    document.querySelector('.modal-cta').textContent = cta;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  window.openModal = openModal;
})();

/* ---------- Quiz / Map Interactive ---------- */
(function initQuiz() {
  const overlay    = document.getElementById('quizOverlay');
  const backBtn    = document.getElementById('quizBackBtn');
  const mapScroll  = document.getElementById('mapScroll');
  const mapStage   = document.getElementById('mapStage');
  const hintBadge  = document.getElementById('mapHintBadge');
  const footerDots = document.getElementById('mapFooterDots');
  const doneCount  = document.getElementById('mapDoneCount');

  if (!overlay || !mapScroll) return;

  const completed = JSON.parse(localStorage.getItem('twpop_quiz') || '{}');

  let curEvent = null, curQ = 0, score = 0, answered = false;
  let shuffledAns = 0, shuffledOpts = [];

  function buildFooterDots() {
    footerDots.innerHTML = '';
    Object.values(GAME_DATA).forEach(ev => {
      const d = document.createElement('div');
      const c = completed[ev.id];
      let cls = 'map-footer-dot';
      if (c) cls += (c.score === c.total) ? ' done-perfect' : ' done-partial';
      d.className = cls;
      d.id = 'fdot-' + ev.id;
      d.textContent = ev.emoji;
      footerDots.appendChild(d);
    });
    doneCount.textContent = Object.keys(completed).filter(k => k !== '__allDoneCelebrated').length;
  }

  function markPinDone(id, isPerfect) {
    const pin = mapStage.querySelector(`[data-qid="${id}"]`);
    if (pin) {
      pin.classList.remove('done-partial', 'done-perfect');
      pin.classList.add(isPerfect ? 'done-perfect' : 'done-partial');
    }
    const dot = document.getElementById('fdot-' + id);
    if (dot) {
      dot.classList.remove('done-partial', 'done-perfect');
      dot.classList.add(isPerfect ? 'done-perfect' : 'done-partial');
    }
    doneCount.textContent = Object.keys(completed).filter(k => k !== '__allDoneCelebrated').length;
  }

  function applyCompleted() {
    Object.entries(completed).forEach(([id, data]) => {
      if (id === '__allDoneCelebrated') return;
      markPinDone(id, data.score === data.total);
    });
  }

  function checkAllPerfect() {
    return Object.keys(GAME_DATA).every(id =>
      completed[id] && completed[id].score === completed[id].total
    );
  }

  function showAllDoneCelebration() {
    const ov = document.getElementById('allDoneOverlay');
    if (!ov) return;
    const pc = document.getElementById('celebrateParticles');
    pc.innerHTML = '';
    const emojis = ['🎊','🎉','✨','🎭','🎨','🎬','🎵','💃','🌈','🏆','🇹🇼','⭐','🎶','🎪','🎀'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'celebrate-particle';
      p.textContent = emojis[i % emojis.length];
      p.style.cssText = `left:${(i / 30 * 100 + (Math.random() - .5) * 8).toFixed(1)}%;` +
        `animation-delay:${(Math.random() * 4.5).toFixed(2)}s;` +
        `animation-duration:${(3.8 + Math.random() * 3.5).toFixed(2)}s;` +
        `font-size:${14 + Math.floor(Math.random() * 18)}px;`;
      pc.appendChild(p);
    }
    // Update celebration text for current language
    const lang = window.currentLang || 'zh';
    const L = LANG[lang];
    const titleEl = ov.querySelector('.celebrate-title');
    const subEl   = ov.querySelector('.celebrate-sub');
    const badgeEl = ov.querySelector('.celebrate-badge');
    const invEl   = ov.querySelector('.celebrate-invite');
    const toEvEl  = document.getElementById('celebrateToEvents');
    const closeEl = document.getElementById('celebrateClose');
    if (titleEl) titleEl.textContent = L['cel-title'];
    if (subEl)   subEl.innerHTML     = L['cel-sub'];
    if (badgeEl) badgeEl.textContent = L['cel-badge'];
    if (invEl)   invEl.textContent   = L['cel-invite'];
    if (toEvEl)  toEvEl.textContent  = L['cel-to-events'];
    if (closeEl) closeEl.textContent = L['cel-close'];

    closeQuiz();
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Drag-to-scroll
  let isDragging = false, dragStartX = 0, dragScrollLeft = 0;
  mapScroll.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.pageX - mapScroll.offsetLeft;
    dragScrollLeft = mapScroll.scrollLeft;
    mapScroll.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    mapScroll.style.cursor = '';
  });
  mapScroll.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - mapScroll.offsetLeft;
    mapScroll.scrollLeft = dragScrollLeft - (x - dragStartX) * 1.4;
  });

  // Scroll hint
  const quizSection = document.getElementById('quiz');
  if (quizSection && hintBadge) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        hintBadge.classList.add('show');
        setTimeout(() => hintBadge.classList.remove('show'), 3200);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(quizSection);
  }

  // Pin click handlers
  mapStage.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => startQuiz(pin.dataset.qid));
  });

  function startQuiz(id) {
    curEvent = GAME_DATA[id];
    curQ     = 0;
    score    = 0;
    answered = false;
    if (!curEvent) return;

    document.getElementById('quizEvLabel').textContent = curEvent.title;
    document.getElementById('quizEvLabel').style.color = curEvent.color;
    document.getElementById('quizEvTitle').textContent = curEvent.subtitle;
    document.getElementById('quizProgFill').style.background = curEvent.color;

    buildDots();
    renderQuestion();

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    overlay.scrollTop = 0;
  }

  function closeQuiz() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function buildDots() {
    const row = document.getElementById('quizDots');
    row.innerHTML = '';
    curEvent.questions.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'quiz-dot';
      d.id = 'qdot-' + i;
      d.style.borderColor = curEvent.color + '44';
      row.appendChild(d);
    });
  }

  function updateDot(i, correct) {
    const d = document.getElementById('qdot-' + i);
    if (!d) return;
    if (correct) {
      d.textContent = '✓';
      d.style.background = curEvent.color;
      d.style.borderColor = curEvent.color;
      d.style.color = 'white';
    } else {
      d.textContent = '✗';
      d.style.background = '#fdeee9';
      d.style.borderColor = '#e8472a';
      d.style.color = '#e8472a';
    }
  }

  function renderQuestion() {
    const total = curEvent.questions.length;
    const L     = LANG[window.currentLang || 'zh'];
    document.getElementById('quizProgText').textContent  = `Q${curQ + 1} / ${total}`;
    document.getElementById('quizProgScore').textContent = `${score} / ${total}`;
    document.getElementById('quizProgFill').style.width  = `${(curQ / total) * 100}%`;

    const q = curEvent.questions[curQ];

    // Fisher-Yates shuffle
    const idxs = [0, 1, 2, 3];
    for (let k = idxs.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [idxs[k], idxs[j]] = [idxs[j], idxs[k]];
    }
    shuffledOpts = idxs.map(k => q.opts[k]);
    shuffledAns  = idxs.indexOf(q.ans);

    const nextLabel = curQ < total - 1 ? L['quiz-next-q'] : L['quiz-see-result'];

    const area = document.getElementById('quizArea');
    area.innerHTML = `
      <div class="quiz-q-card">
        <p class="quiz-q-num">Q${curQ + 1} · ${curEvent.title}</p>
        <p class="quiz-q-text">${q.q}</p>
        <div class="quiz-opts" id="quizOpts">
          ${shuffledOpts.map((o, i) => `
            <button class="quiz-opt" onclick="quizChoose(${i})">
              <span style="margin-right:6px;opacity:.4;font-style:normal">${['Ａ','Ｂ','Ｃ','Ｄ'][i]}.</span>${o}
              <span class="quiz-opt-mark"></span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-fact" id="quizFact">
          <p class="quiz-fact-lbl">💡 Taiwan Fun Fact</p>
          <p>${q.fact}</p>
        </div>
        <button class="quiz-next" id="quizNext"
          style="background:${curEvent.color}"
          onclick="quizNext()">
          ${nextLabel}
        </button>
      </div>
    `;
    answered = false;
    overlay.scrollTop = 0;
  }

  window.quizChoose = function(i) {
    if (answered) return;
    answered = true;
    const btns = document.querySelectorAll('.quiz-opt');
    btns.forEach(b => b.disabled = true);
    const correct = (i === shuffledAns);
    btns[i].classList.add(correct ? 'correct' : 'wrong');
    btns[i].querySelector('.quiz-opt-mark').textContent = correct ? '✓' : '✗';
    if (!correct) {
      btns[shuffledAns].classList.add('correct');
      btns[shuffledAns].querySelector('.quiz-opt-mark').textContent = '✓';
    }
    if (correct) score++;
    updateDot(curQ, correct);
    document.getElementById('quizFact').classList.add('show');
    document.getElementById('quizNext').classList.add('show');
  };

  window.quizNext = function() {
    curQ++;
    if (curQ >= curEvent.questions.length) { showResult(); return; }
    renderQuestion();
  };

  function showResult() {
    const total = curEvent.questions.length;
    const L     = LANG[window.currentLang || 'zh'];
    document.getElementById('quizProgFill').style.width  = '100%';
    document.getElementById('quizProgScore').textContent = `${score} / ${total}`;

    const pct   = score / total;
    const emoji = pct === 1 ? '🏆' : pct >= 0.6 ? '🎉' : '💪';
    const msg   = pct === 1 ? L['quiz-res-perfect']
                : pct >= 0.6 ? L['quiz-res-good']
                : L['quiz-res-keep'];

    const isPerfect = (score === total);
    completed[curEvent.id] = { score, total, date: new Date().toISOString() };
    localStorage.setItem('twpop_quiz', JSON.stringify(completed));
    markPinDone(curEvent.id, isPerfect);

    if (isPerfect && checkAllPerfect() && !completed.__allDoneCelebrated) {
      completed.__allDoneCelebrated = true;
      localStorage.setItem('twpop_quiz', JSON.stringify(completed));
      setTimeout(() => showAllDoneCelebration(), 1900);
    }

    document.getElementById('quizArea').innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-emoji">${emoji}</div>
        <div class="quiz-result-score" style="color:${curEvent.color}">${score} / ${total}</div>
        <p class="quiz-result-msg">${msg}</p>
        <div class="quiz-result-unlock"
          style="background:${curEvent.colorLight};color:${curEvent.color}">
          🎉 ${curEvent.unlockMsg}
        </div>
        <div class="quiz-result-actions">
          <button class="quiz-result-btn" style="background:${curEvent.color};color:white"
            onclick="quizRetry()">${L['quiz-retry']}</button>
          <button class="quiz-result-btn sec" onclick="quizBackToMap()">${L['quiz-back-map']}</button>
        </div>
      </div>
    `;
  }

  window.quizRetry    = function() { startQuiz(curEvent.id); };
  window.quizBackToMap = function() { closeQuiz(); };

  backBtn.addEventListener('click', closeQuiz);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const celebOv = document.getElementById('allDoneOverlay');
      if (celebOv && celebOv.classList.contains('open')) {
        celebOv.classList.remove('open');
        document.body.style.overflow = '';
      } else if (overlay.classList.contains('open')) {
        closeQuiz();
      }
    }
  });

  const allDoneOv = document.getElementById('allDoneOverlay');
  if (allDoneOv) {
    function closeCelebration() {
      allDoneOv.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('celebrateClose').addEventListener('click', closeCelebration);
    document.getElementById('celebrateToEvents').addEventListener('click', closeCelebration);
  }

  buildFooterDots();
  applyCompleted();
})();

/* ---------- Language Init (runs last — sets lang after all IIFEs ready) ---------- */
(function initLang() {
  // Detect preference: saved → browser lang → default zh
  const saved      = localStorage.getItem('twpop_lang');
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  window.currentLang = saved || (browserLang.startsWith('zh') ? 'zh' : 'en');

  // Inject ZH | EN pill toggle into navLinks as the last <li>
  // → desktop: appears inline in nav row
  // → mobile: appears inside hamburger dropdown
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    const li = document.createElement('li');
    li.className = 'nav-lang-item';
    li.innerHTML =
      '<div class="lang-toggle" aria-label="Switch language">' +
      '<button class="lang-btn" data-lang="zh">ZH</button>' +
      '<button class="lang-btn" data-lang="en">EN</button>' +
      '</div>';
    navLinks.appendChild(li);
    li.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => window.setLang(btn.dataset.lang));
    });
  }

  window.setLang = function(lang) {
    window.currentLang = lang;
    localStorage.setItem('twpop_lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
    const L = LANG[lang];

    // Update all [data-i18n] text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (L[k] !== undefined) el.textContent = L[k];
    });

    // Update [data-i18n-html] nodes (allow <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.dataset.i18nHtml;
      if (L[k] !== undefined) el.innerHTML = L[k];
    });

    // Toggle active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Re-render dynamic sections
    renderEvents();
    if (window.reRenderCalendar) window.reRenderCalendar();
  };

  // Apply on load
  window.setLang(window.currentLang);
  // Render events on initial load (events grid is empty in HTML)
  renderEvents();
})();
