/* ============================================================
   Taiwan Pop — Main JavaScript
   ============================================================ */

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
    id:'lin-hwai-min', title:'臺美藝文大師講座', title_en:'Taiwan–US Arts Master Lecture',
    subtitle:'林懷民 Lin Hwai-min', subtitle_en:'Lin Hwai-min',
    emoji:'🎭', color:'#8B4513', colorLight:'#fdf3e7',
    venue:'Lincoln Center, Upper West Side',
    unlockMsg:'你已認識台灣最重要的舞蹈藝術家之一！',
    unlockMsg_en:'You\'ve met one of Taiwan\'s most important dance artists!',
    questions:[
      { q:'林懷民在 1973 年創立的舞團，以台灣哪個傳統意象命名？',
        q_en:'The dance company Lin Hwai-min founded in 1973 is named after which traditional image?',
        opts:['雲門','竹影','墨荷','山嵐'], ans:0,
        opts_en:['Cloud Gate','Bamboo Shadow','Ink Lotus','Mountain Mist'],
        fact:'「雲門」取自《呂氏春秋》，是中國最古老的舞蹈之一，象徵天地之氣。雲門舞集是台灣第一個現代舞職業舞團。',
        fact_en:'"Cloud Gate" comes from the ancient text Lüshi Chunqiu and is one of China\'s oldest dances, symbolizing the energy of heaven and earth. Cloud Gate Dance Theatre was Taiwan\'s first professional modern dance company.' },
      { q:'林懷民除了是舞蹈家，他還有另一個重要身份是？',
        q_en:'Besides being a choreographer, Lin Hwai-min is also known as a?',
        opts:['小說家','電影導演','音樂家','建築師'], ans:0,
        opts_en:['Novelist','Film Director','Musician','Architect'],
        fact:'林懷民 22 歲就出版小說《蟬》，融合文學與肢體的思維深刻影響了雲門作品的敘事性。',
        fact_en:'Lin Hwai-min published his novel "Cicada" at age 22. His literary sensibility deeply shaped the narrative quality of Cloud Gate\'s works.' },
      { q:'雲門舞集代表作《薪傳》，描述的是台灣哪段歷史？',
        q_en:'Cloud Gate\'s landmark piece Legacy depicts which chapter of Taiwanese history?',
        opts:['先民渡海來台','日治時期抗爭','二二八事件','台灣經濟奇蹟'], ans:0,
        opts_en:['Early settlers crossing the strait','Resistance during Japanese rule','The 228 Incident','Taiwan\'s economic miracle'],
        fact:'《薪傳》1978 年首演，描述漢人先民冒險橫越台灣海峽來台墾荒，在台美斷交當晚演出，感動無數台灣人。',
        fact_en:'Legacy premiered in 1978, depicting Han settlers crossing the Taiwan Strait. It was performed the night Taiwan–US diplomatic relations were severed, deeply moving audiences across the island.' },
      { q:'林懷民的舞作常融合哪些台灣在地元素？',
        q_en:'Which local Taiwanese elements does Lin Hwai-min frequently weave into his choreography?',
        opts:['書法、太極、傳統音樂','嘻哈、街舞','芭蕾、歌劇','說唱、相聲'], ans:0,
        opts_en:['Calligraphy, Tai Chi & folk music','Hip-hop & street dance','Ballet & opera','Rap & stand-up comedy'],
        fact:'雲門舞集深受東方美學影響，林懷民曾讓舞者練習書法、太極導引，將這些身體訓練融入現代舞語彙中。',
        fact_en:'Cloud Gate is deeply rooted in Eastern aesthetics. Lin had dancers practice calligraphy and Tai Chi, integrating these disciplines into a modern dance vocabulary.' },
      { q:'林懷民於 2019 年退休，他將雲門舞集交棒給哪位接班人？',
        q_en:'When Lin Hwai-min retired in 2019, who did he hand Cloud Gate over to?',
        opts:['鄭宗龍','布拉瑞揚','周書毅','黃翊'], ans:0,
        opts_en:['Cheng Tsung-lung','Bulareyaung','Chou Shu-yi','Huang Yi'],
        fact:'鄭宗龍來自台北萬華，作品融合台灣庶民生活與當代舞蹈美學，成為雲門第二代藝術總監。',
        fact_en:'Cheng Tsung-lung grew up in Taipei\'s Wanhua district. His work blends everyday Taiwanese life with contemporary dance aesthetics, making him Cloud Gate\'s second artistic director.' }
    ]
  },
  'nso-paiwan': {
    id:'nso-paiwan', title:'NSO × 泰武古謠', title_en:'NSO × Taimu Ancient Ballads',
    subtitle:'原住民音樂 Indigenous Music', subtitle_en:'Indigenous Music of Taiwan',
    emoji:'🎵', color:'#1a6b3c', colorLight:'#e8f5ee',
    venue:'Carnegie Hall, Midtown',
    unlockMsg:'你已走入台灣原住民族的音樂靈魂！',
    unlockMsg_en:'You\'ve entered the musical soul of Taiwan\'s indigenous peoples!',
    questions:[
      { q:'泰武古謠傳唱所在的「泰武鄉」位於台灣哪個縣市？',
        q_en:'Taimu Ancient Ballads originate from Taimu Township, which is located in which Taiwanese county?',
        opts:['屏東縣','台東縣','花蓮縣','南投縣'], ans:0,
        opts_en:['Pingtung County','Taitung County','Hualien County','Nantou County'],
        fact:'泰武鄉位於屏東縣，是排灣族重要的文化聚落。泰武國小的古謠合唱團曾登上國際舞台，將排灣族傳統吟唱帶給全世界。',
        fact_en:'Taimu Township is in Pingtung County, an important Paiwan cultural community. The Taimu Elementary School choir has performed internationally, bringing traditional Paiwan chanting to the world.' },
      { q:'台灣官方認定的原住民族共有幾族？',
        q_en:'How many officially recognized indigenous peoples are there in Taiwan?',
        opts:['16 族','9 族','12 族','20 族'], ans:0,
        opts_en:['16 peoples','9 peoples','12 peoples','20 peoples'],
        fact:'台灣目前官方認定 16 個原住民族，各族擁有不同語言、音樂、祭儀與服飾。原住民族人口約 57 萬，佔全台人口約 2.4%。',
        fact_en:'Taiwan officially recognizes 16 indigenous peoples, each with distinct languages, music, ceremonies, and dress. The indigenous population is around 570,000, roughly 2.4% of Taiwan\'s total.' },
      { q:'排灣族傳統音樂中，有一種重要的雙管樂器叫做？',
        q_en:'What is the important double-pipe traditional instrument in Paiwan music?',
        opts:['鼻笛','口琴','月琴','陶笛'], ans:0,
        opts_en:['Nose flute','Harmonica','Moon lute','Ocarina'],
        fact:'鼻笛（paringed）是排灣族男性以鼻子吹奏的傳統樂器，象徵愛情與思念，是極具代表性的原住民族樂器。',
        fact_en:'The nose flute (paringed) is played by Paiwan men through the nose, symbolizing love and longing. It is one of the most iconic traditional instruments among Taiwan\'s indigenous peoples.' },
      { q:'布農族哪首歌曾因旋律特殊而被送往太空？',
        q_en:'Which Bunun song was sent into space on a probe due to its unique melodic structure?',
        opts:['祈禱小米豐收歌','捕魚祭歌','年祭歡歌','打耳祭歌'], ans:0,
        opts_en:['Pasibutbut (Millet Harvest Prayer)','Fishing Festival Song','New Year Celebration Song','Ear-shooting Festival Song'],
        fact:'布農族「祈禱小米豐收歌」是全球罕見的天然複音合唱，被聯合國教科文組織關注，並於 1970 年代被送上太空探測器。',
        fact_en:'The Bunun Pasibutbut is a rare natural polyphonic chant recognized by UNESCO. In the 1970s it was placed aboard a space probe to represent humanity\'s musical heritage.' },
      { q:'NSO 國家交響樂團成立於哪一年？',
        q_en:'In which year was Taiwan\'s National Symphony Orchestra (NSO) founded?',
        opts:['1986 年','1970 年','2000 年','1995 年'], ans:0,
        opts_en:['1986','1970','2000','1995'],
        fact:'NSO 國家交響樂團成立於 1986 年，是台灣最重要的職業交響樂團，長期致力於跨文化合作與原創委託。',
        fact_en:'Founded in 1986, the NSO is Taiwan\'s most important professional symphony orchestra, dedicated to cross-cultural collaboration and original commissioned works.' }
    ]
  },
  'bushwick': {
    id:'bushwick', title:'布希維克街頭藝術節', title_en:'Bushwick Street Art Festival',
    subtitle:'台灣視覺藝術 Taiwan Visual Art', subtitle_en:'Taiwanese Visual Art',
    emoji:'🎨', color:'#e8472a', colorLight:'#fdeee9',
    venue:'Bushwick Collective, Brooklyn',
    unlockMsg:'你已發現台灣視覺藝術的當代能量！',
    unlockMsg_en:'You\'ve discovered the contemporary energy of Taiwanese visual art!',
    questions:[
      { q:'布希維克（Bushwick）位於紐約哪個行政區？',
        q_en:'Bushwick is located in which New York City borough?',
        opts:['布魯克林','曼哈頓','皇后區','布朗克斯'], ans:0,
        opts_en:['Brooklyn','Manhattan','Queens','The Bronx'],
        fact:'Bushwick 位於布魯克林東北部，過去是工業區，近年成為全球最重要的街頭藝術聚落之一，每年吸引世界各地藝術家在此創作壁畫。',
        fact_en:'Bushwick is in northeast Brooklyn. Once an industrial district, it is now one of the world\'s most important street art communities, drawing artists from around the globe to paint murals each year.' },
      { q:'台灣廟宇文化中，哪種視覺元素最常出現在當代台灣藝術中？',
        q_en:'Which visual elements from Taiwan\'s temple culture most frequently appear in contemporary Taiwanese art?',
        opts:['龍、虎、神明圖騰','梅花與竹子','101大樓剪影','台灣黑熊'], ans:0,
        opts_en:['Dragon, tiger & deity iconography','Plum blossoms & bamboo','Taipei 101 silhouette','Formosan black bear'],
        fact:'台灣廟宇是當代設計師最重要的靈感來源之一。龍柱、交趾陶、剪黏工藝等廟宇美學，被大量轉化為現代插畫、街頭藝術與品牌設計。',
        fact_en:'Taiwan\'s temples are a key inspiration for contemporary designers. Dragon pillars, jiaozhi ceramics, and traditional craftwork have been widely transformed into modern illustration, street art, and brand design.' },
      { q:'台灣哪個地方以「彩虹眷村」壁畫聞名，差點遭拆除卻因民眾連署保留？',
        q_en:'Which Taiwanese city is home to the Rainbow Village murals, nearly demolished but saved by a public petition?',
        opts:['台中','台北','高雄','嘉義'], ans:0,
        opts_en:['Taichung','Taipei','Kaohsiung','Chiayi'],
        fact:'台中彩虹眷村由老兵黃永阜一人獨力彩繪，原本面臨拆除，後因民眾連署而保留，是台灣最具代表性的庶民藝術故事。',
        fact_en:'Taichung\'s Rainbow Village was painted single-handedly by veteran Huang Yung-fu. Originally slated for demolition, it was preserved after a public petition—one of Taiwan\'s most beloved folk art stories.' },
      { q:'台灣近年最受國際關注的當代藝術博覽會是？',
        q_en:'Which contemporary art fair in Taiwan has attracted the most international attention in recent years?',
        opts:['Taipei Dangdai（台北當代）','故宮特展','總統府藝廊','ART TAIPEI'], ans:0,
        opts_en:['Taipei Dangdai','National Palace Museum Special Exhibition','Presidential Office Gallery','ART TAIPEI'],
        fact:'Taipei Dangdai 自 2019 年起每年舉辦，匯聚亞洲與全球頂尖畫廊，是台灣打入國際當代藝術市場的重要窗口。',
        fact_en:'Taipei Dangdai, held annually since 2019, brings together leading galleries from Asia and around the world, and is Taiwan\'s key gateway into the international contemporary art market.' },
      { q:'「眷村文化」孕育了大量台灣藝術家，眷村最初是為安置哪些人而建立？',
        q_en:'Juancun (military dependents\' villages) produced many Taiwanese artists. Who were they originally built to house?',
        opts:['1949年隨國民政府來台的軍人及家屬','日治時期留台日本人','原住民族遷移安置','越戰難民'], ans:0,
        opts_en:['Soldiers & families who came with the KMT government in 1949','Japanese residents remaining after WWII','Relocated indigenous peoples','Vietnam War refugees'],
        fact:'眷村孕育了侯孝賢、朱天文等大批文藝人才。眷村美學融合中國各省習俗與台灣在地文化，形成獨特的混血風格。',
        fact_en:'Juancun produced a wealth of artistic talent including Hou Hsiao-hsien and Chu T\'ien-wen. Juancun aesthetics blend customs from various Chinese provinces with Taiwanese local culture, creating a unique hybrid style.' }
    ]
  },
  'film': {
    id:'film', title:'臺灣主題影展', title_en:'Taiwan Film Festival',
    subtitle:'台灣電影 Taiwan Cinema', subtitle_en:'Taiwan Cinema',
    emoji:'🎬', color:'#1a3a6b', colorLight:'#e8edf5',
    venue:'IFC Center, Greenwich Village',
    unlockMsg:'你已進入台灣電影的黃金世界！',
    unlockMsg_en:'You\'ve entered the golden world of Taiwanese cinema!',
    questions:[
      { q:'台灣導演李安以哪部電影首次獲得奧斯卡最佳導演獎？',
        q_en:'With which film did Taiwanese director Ang Lee win his first Academy Award for Best Director?',
        opts:['斷背山','臥虎藏龍','少年Pi的奇幻漂流','色，戒'], ans:0,
        opts_en:['Brokeback Mountain','Crouching Tiger, Hidden Dragon','Life of Pi','Lust, Caution'],
        fact:'李安以《斷背山》（2005）獲得奧斯卡最佳導演獎，是首位獲此殊榮的亞裔導演，被視為全球最具影響力的華裔導演。',
        fact_en:'Ang Lee won the Oscar for Best Director with Brokeback Mountain (2005), becoming the first Asian director to receive this honor. He is widely regarded as the most influential Chinese-language filmmaker in the world.' },
      { q:'台灣「新電影運動」約發生在哪個年代？',
        q_en:'The Taiwan New Cinema movement took place in approximately which decade?',
        opts:['1980 年代','1960 年代','1970 年代','1990 年代'], ans:0,
        opts_en:['1980s','1960s','1970s','1990s'],
        fact:'1980 年代，侯孝賢、楊德昌等導演發起台灣新電影運動，以寫實風格記錄台灣社會，讓台灣電影首度在坎城、柏林、威尼斯等影展發光。',
        fact_en:'In the 1980s, directors Hou Hsiao-hsien and Edward Yang launched the Taiwan New Cinema movement, using realist storytelling to document Taiwanese society and win acclaim at Cannes, Berlin, and Venice.' },
      { q:'侯孝賢《悲情城市》獲得威尼斯金獅獎，描述的是台灣哪個歷史事件？',
        q_en:'Hou Hsiao-hsien\'s City of Sadness won the Venice Golden Lion. Which historical event does the film depict?',
        opts:['二二八事件','台灣光復','戒嚴解除','台美斷交'], ans:0,
        opts_en:['The 228 Incident','Retrocession of Taiwan','Lifting of Martial Law','Severance of Taiwan–US ties'],
        fact:'《悲情城市》（1989）以九份為背景，描述二二八事件後台灣人的創傷，是台灣第一部正面觸及此事件的電影。',
        fact_en:'City of Sadness (1989), set in Jiufen, portrays the trauma following the 228 Incident. It was the first Taiwanese film to directly confront this event and won the Golden Lion at Venice.' },
      { q:'宮崎駿《神隱少女》的靈感場景，據說來自台灣哪個地方？',
        q_en:'Which Taiwanese location is said to have inspired the setting of Hayao Miyazaki\'s Spirited Away?',
        opts:['九份老街','阿里山','淡水','台南安平'], ans:0,
        opts_en:['Jiufen Old Street','Alishan','Tamsui','Anping, Tainan'],
        fact:'九份的金礦小鎮風貌、山城燈籠與茶樓意象，常被認為是《神隱少女》油屋場景的靈感來源之一，讓九份成為全球觀光客必訪之地。',
        fact_en:'Jiufen\'s mountain town atmosphere, glowing lanterns, and teahouses are widely believed to have inspired the bathhouse scenes in Spirited Away, making it a must-visit destination for global tourists.' },
      { q:'台灣被稱為「台灣奧斯卡」的電影最高榮譽是？',
        q_en:'Which film award is known as the "Taiwanese Oscars"?',
        opts:['金馬獎','金鐘獎','金曲獎','金穗獎'], ans:0,
        opts_en:['Golden Horse Awards','Golden Bell Awards','Golden Melody Awards','Golden Harvest Awards'],
        fact:'金馬獎創立於 1962 年，是華語電影圈歷史最悠久、最具公信力的電影獎項，與金鐘、金曲並稱台灣三金。',
        fact_en:'The Golden Horse Awards, founded in 1962, are the oldest and most prestigious film awards in the Chinese-language world, known alongside the Golden Bell and Golden Melody as Taiwan\'s "Three Golds."' }
    ]
  },
  'pride': {
    id:'pride', title:'紐約同志大遊行', title_en:'NYC Pride March',
    subtitle:'台灣 LGBTQ+ 文化', subtitle_en:'Taiwan LGBTQ+ Culture',
    emoji:'🏳️‍🌈', color:'#9b30d9', colorLight:'#f3e8fd',
    venue:'5th Avenue, Manhattan',
    unlockMsg:'你已了解台灣在平權路上的驕傲！',
    unlockMsg_en:'You\'ve learned about Taiwan\'s proud journey toward equality!',
    questions:[
      { q:'台灣在哪一年成為亞洲第一個同性婚姻合法化的國家？',
        q_en:'In which year did Taiwan become the first country in Asia to legalize same-sex marriage?',
        opts:['2019 年','2017 年','2021 年','2015 年'], ans:0,
        opts_en:['2019','2017','2021','2015'],
        fact:'2019 年 5 月 24 日，台灣正式成為亞洲首個同性婚姻合法化的國家，全球排名第 27 個，引發全亞洲廣泛關注。',
        fact_en:'On May 24, 2019, Taiwan officially became the first country in Asia—and the 27th worldwide—to legalize same-sex marriage, drawing widespread attention across the continent.' },
      { q:'台灣同志遊行每年在哪個城市舉行，是亞洲規模最大的？',
        q_en:'In which city is Taiwan\'s annual Pride Parade held, the largest in Asia?',
        opts:['台北','台中','高雄','台南'], ans:0,
        opts_en:['Taipei','Taichung','Kaohsiung','Tainan'],
        fact:'台北同志遊行自 2003 年起每年舉辦，近年參與人數突破 20 萬人，是亞洲規模最大的同志驕傲遊行。',
        fact_en:'The Taipei Pride Parade has been held annually since 2003. In recent years, attendance has surpassed 200,000 people, making it the largest Pride event in Asia.' },
      { q:'台灣同婚合法化的關鍵判決來自哪個機構？',
        q_en:'Which body issued the pivotal ruling that led to the legalization of same-sex marriage in Taiwan?',
        opts:['司法院大法官','立法院','行政院','總統府'], ans:0,
        opts_en:['Council of Grand Justices','Legislative Yuan','Executive Yuan','Presidential Office'],
        fact:'2017 年司法院大法官做出釋字第 748 號解釋，認定民法不允許同婚違憲，要求立法機關兩年內完成修法，開啟合法化歷程。',
        fact_en:'In 2017, the Council of Grand Justices issued Interpretation No. 748, ruling that the Civil Code\'s prohibition of same-sex marriage was unconstitutional and requiring the legislature to amend the law within two years.' },
      { q:'台灣最具代表性的 LGBTQ+ 友善商圈位於台北哪裡？',
        q_en:'Where in Taipei is Taiwan\'s most iconic LGBTQ+-friendly neighborhood?',
        opts:['西門町','信義區','天母','北投'], ans:0,
        opts_en:['Ximending','Xinyi District','Tianmu','Beitou'],
        fact:'西門町是台灣最具代表性的 LGBTQ+ 友善商圈，被稱為「台灣的 Chelsea」，彩虹旗飄揚的咖啡廳與友善商店密集。',
        fact_en:'Ximending is Taiwan\'s most iconic LGBTQ+-friendly district, often called "Taiwan\'s Chelsea," with rainbow flags flying from cafés and welcoming shops throughout.' },
      { q:'哪位台灣導演以電影三部曲記錄台灣 LGBTQ+ 故事享譽國際？',
        q_en:'Which Taiwanese director gained international acclaim for a film trilogy documenting LGBTQ+ stories in Taiwan?',
        opts:['周美玲','李安','侯孝賢','魏德聖'], ans:0,
        opts_en:['Zero Chou','Ang Lee','Hou Hsiao-hsien','Wei Te-sheng'],
        fact:'周美玲導演的「同志三部曲」以細膩筆觸描繪台灣 LGBTQ+ 生命經驗，在國際影展廣受好評。',
        fact_en:'Director Zero Chou\'s "Queer Trilogy" portrays LGBTQ+ life in Taiwan with sensitivity and depth, winning broad acclaim at international film festivals.' }
    ]
  },
  'horse': {
    id:'horse', title:'翃舞製作', title_en:'H·Art·Ch Dance Company',
    subtitle:'台灣當代舞蹈 Contemporary Dance', subtitle_en:'Taiwanese Contemporary Dance',
    emoji:'💃', color:'#c47a00', colorLight:'#fdf4e0',
    venue:'The Joyce Theater, Chelsea',
    unlockMsg:'你已感受台灣當代舞蹈的力與美！',
    unlockMsg_en:'You\'ve felt the power and beauty of Taiwanese contemporary dance!',
    questions:[
      { q:'台灣當代舞蹈最常從哪些台灣本土元素汲取靈感？',
        q_en:'Which local Taiwanese elements most frequently inspire contemporary Taiwanese dance?',
        opts:['廟會儀式與原住民族肢體','古典芭蕾技巧','日本武道','韓國流行舞蹈'], ans:0,
        opts_en:['Temple rituals & indigenous movement','Classical ballet technique','Japanese martial arts','Korean pop dance'],
        fact:'台灣當代舞蹈創作者常向廟會陣頭、牽亡魂儀式、原住民族歌舞尋找靈感，以當代技法重新詮釋，形成台灣獨特的舞蹈語彙。',
        fact_en:'Taiwanese contemporary dance choreographers draw inspiration from temple processions, spirit-guiding ceremonies, and indigenous songs and dances, reinterpreting them through contemporary techniques to form a uniquely Taiwanese movement language.' },
      { q:'台灣哪位舞蹈家以「與機器人共舞」聞名全球？',
        q_en:'Which Taiwanese dancer became world-famous for "dancing with a robot"?',
        opts:['黃翊','布拉瑞揚','鄭宗龍','林懷民'], ans:0,
        opts_en:['Huang Yi','Bulareyaung','Cheng Tsung-lung','Lin Hwai-min'],
        fact:'黃翊的代表作《黃翊與庫卡》讓舞者與工業機器人 KUKA 共舞，探討人與科技的關係，在全球 15+ 國家巡演。',
        fact_en:'Huang Yi\'s signature work HUANG YI & KUKA features a dancer performing alongside industrial robot KUKA, exploring the relationship between humans and technology. It has toured in over 15 countries.' },
      { q:'以原住民族身份融合當代舞蹈的布拉瑞揚，屬於哪個族群？',
        q_en:'Bulareyaung, who integrates his indigenous heritage into contemporary dance, belongs to which ethnic group?',
        opts:['排灣族','阿美族','卑南族','泰雅族'], ans:0,
        opts_en:['Paiwan','Amis','Puyuma','Atayal'],
        fact:'布拉瑞揚·帕格勒法為排灣族人，曾為雲門舞集舞者，2015 年回故鄉台東成立舞團，作品融合排灣族文化與當代舞蹈。',
        fact_en:'Bulareyaung Pagarlava is Paiwan. A former Cloud Gate dancer, he returned to his hometown in Taitung in 2015 to found his own company, blending Paiwan culture with contemporary dance.' },
      { q:'台灣最重要的表演藝術機構「兩廳院」的正式名稱是？',
        q_en:'What is the official name of Taiwan\'s most important performing arts institution, known as "Liangting Yuan"?',
        opts:['國立中正文化中心','國立台灣藝術大學','台北市文化局','文化部'], ans:0,
        opts_en:['National Chiang Kai-shek Cultural Center','National Taiwan University of Arts','Taipei City Cultural Affairs Bureau','Ministry of Culture'],
        fact:'兩廳院（國立中正文化中心）旗下的國家音樂廳與國家戲劇院，是台灣表演藝術的最高殿堂。',
        fact_en:'The National Chiang Kai-shek Cultural Center—home to the National Concert Hall and National Theater—is the pinnacle of performing arts in Taiwan.' },
      { q:'「翃」這個字的意思最接近？',
        q_en:'The character 「翃」 most closely means?',
        opts:['鳥振翅飛翔','大地寬廣','水波流動','光芒四射'], ans:0,
        opts_en:['A bird spreading its wings in flight','Vast and wide-open land','Water flowing in ripples','Light radiating in all directions'],
        fact:'「翃」意指鳥飛翔的樣子，象徵舞者以身體在空間中飛翔探索的意志。翃舞製作成立於 2011 年，以跨域創作見長。',
        fact_en:'「翃」 depicts a bird in full flight, symbolizing a dancer\'s will to soar and explore space with their body. H·Art·Ch was founded in 2011 and is known for interdisciplinary creation.' }
    ]
  },
  'summerstage': {
    id:'summerstage', title:'SummerStage: Taiwanese Waves', title_en:'SummerStage: Taiwanese Waves',
    subtitle:'台灣之夜 Taiwan Night', subtitle_en:'A Night of Taiwan',
    emoji:'🌙', color:'#0d6b8c', colorLight:'#e0f2f8',
    venue:'Central Park SummerStage, Rumsey Playfield',
    unlockMsg:'你已體驗一夜台灣的完整魅力！',
    unlockMsg_en:'You\'ve experienced the full magic of a Taiwanese night!',
    questions:[
      { q:'台灣最具代表性的飲料「珍珠奶茶」發源於哪個城市？',
        q_en:'Which city is the birthplace of bubble tea (boba), Taiwan\'s most iconic drink?',
        opts:['台中','台北','台南','高雄'], ans:0,
        opts_en:['Taichung','Taipei','Tainan','Kaohsiung'],
        fact:'珍珠奶茶（Bubble Tea）1980 年代起源於台中，如今全球市場規模已超過 30 億美元，是台灣對世界飲食文化最大的貢獻之一。',
        fact_en:'Bubble tea originated in Taichung in the 1980s. Today it is a global industry worth over $3 billion, representing Taiwan\'s biggest contribution to world food culture.' },
      { q:'Central Park SummerStage 提供什麼樣的演出？',
        q_en:'What kind of performances does Central Park SummerStage offer?',
        opts:['免費戶外音樂表演','付費室內音樂廳','電影首映','藝術拍賣'], ans:0,
        opts_en:['Free outdoor music performances','Ticketed indoor concert hall','Film premieres','Art auctions'],
        fact:'Central Park SummerStage 自 1986 年起每年夏季舉辦免費戶外演出，是紐約最重要的多元文化音樂平台。',
        fact_en:'Central Park SummerStage has hosted free outdoor performances every summer since 1986, making it New York\'s most important multicultural music platform.' },
      { q:'台灣「辦桌文化」是指什麼？',
        q_en:'What does the Taiwanese tradition of "ban-do" (辦桌) refer to?',
        opts:['戶外大型宴席文化','便當盒飯文化','夜市攤販文化','早餐店文化'], ans:0,
        opts_en:['Outdoor communal banquet culture','Bento box lunch culture','Night market stall culture','Breakfast shop culture'],
        fact:'「辦桌」是台灣傳統的戶外宴席文化，在喜慶、廟會等場合，由總鋪師在路邊搭棚大宴賓客，是台灣最具凝聚力的庶民飲食儀式。',
        fact_en:'"Ban-do" is Taiwan\'s traditional outdoor banquet culture. For celebrations and temple festivals, a master chef sets up a large street banquet—one of Taiwan\'s most community-bonding culinary rituals.' },
      { q:'以下哪位音樂人被稱為「華語流行音樂天王」，來自台灣？',
        q_en:'Which Taiwanese musician is known as the "King of Mandopop"?',
        opts:['周杰倫（Jay Chou）','BTS 防彈少年團','張學友','劉德華'], ans:0,
        opts_en:['Jay Chou (周杰倫)','BTS','Jacky Cheung (張學友)','Andy Lau (劉德華)'],
        fact:'周杰倫自 2000 年代起稱霸全球華語市場，以融合中西音樂元素的創作風格著稱，至今仍是全球最具影響力的華語藝人之一。',
        fact_en:'Jay Chou has dominated the global Mandopop market since the 2000s, celebrated for blending Eastern and Western musical styles. He remains one of the most influential Chinese-language artists in the world.' },
      { q:'台灣夜市文化中，「雞排」是哪種料理方式的代表？',
        q_en:'In Taiwan\'s night market culture, what is "ji pai" (chicken steak) famous for?',
        opts:['炸雞胸肉排，比臉大','烤雞腿','滷雞翅','蒸雞肉'], ans:0,
        opts_en:['A fried chicken breast bigger than your face','Grilled chicken leg','Braised chicken wings','Steamed chicken'],
        fact:'台灣大雞排以巨大尺寸（比臉還大）、酥脆外皮聞名，是夜市最具代表性的食物之一，也是外國旅客必嚐的小吃體驗。',
        fact_en:'Taiwan\'s giant fried chicken steak is famous for its enormous size—bigger than your face—and its crispy coating. It is one of the most iconic night market foods and a must-try for foreign visitors.' }
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
    '.article-card, .event-card, .upcoming-item, .calendar-box, .upcoming-box'
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

  // Expose startQuiz for a-we system
  window._startQuiz = startQuiz;

  function startQuiz(id) {
    curEvent = GAME_DATA[id];
    curQ     = 0;
    score    = 0;
    answered = false;
    if (!curEvent) return;

    const lang = window.currentLang || 'zh';
    document.getElementById('quizEvLabel').textContent = (lang === 'en' && curEvent.title_en) ? curEvent.title_en : curEvent.title;
    document.getElementById('quizEvLabel').style.color = curEvent.color;
    document.getElementById('quizEvTitle').textContent = (lang === 'en' && curEvent.subtitle_en) ? curEvent.subtitle_en : curEvent.subtitle;
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

    const q    = curEvent.questions[curQ];
    const lang = window.currentLang || 'zh';
    const evTitle = (lang === 'en' && curEvent.title_en) ? curEvent.title_en : curEvent.title;
    const qText   = (lang === 'en' && q.q_en)    ? q.q_en    : q.q;
    const srcOpts = (lang === 'en' && q.opts_en) ? q.opts_en : q.opts;
    const factText= (lang === 'en' && q.fact_en) ? q.fact_en : q.fact;

    // Fisher-Yates shuffle
    const idxs = [0, 1, 2, 3];
    for (let k = idxs.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [idxs[k], idxs[j]] = [idxs[j], idxs[k]];
    }
    shuffledOpts = idxs.map(k => srcOpts[k]);
    shuffledAns  = idxs.indexOf(q.ans);

    const nextLabel = curQ < total - 1 ? L['quiz-next-q'] : L['quiz-see-result'];

    const area = document.getElementById('quizArea');
    area.innerHTML = `
      <div class="quiz-q-card">
        <p class="quiz-q-num">Q${curQ + 1} · ${evTitle}</p>
        <p class="quiz-q-text">${qText}</p>
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
          <p>${factText}</p>
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
          🎉 ${((window.currentLang || 'zh') === 'en' && curEvent.unlockMsg_en) ? curEvent.unlockMsg_en : curEvent.unlockMsg}
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

/* ---------- Board Game 文化大富翁 ---------- */
(function initBoardGame() {

  /* ── 常數 ── */
  const TOTAL_LAPS  = 3;
  const CPU_HIT_RATE = 0.6; // 電腦答對率

  /* ── 36格棋盤定義 ── */
  const SPACES = [
    { type:'start',     label:'出發點',   icon:'🏁' },
    { type:'zone',      zone:'lin-hwai-min', qIdx:0, label:'林懷民①', icon:'🎭' },
    { type:'zone',      zone:'lin-hwai-min', qIdx:1, label:'林懷民②', icon:'🎭' },
    { type:'zone',      zone:'lin-hwai-min', qIdx:2, label:'林懷民③', icon:'🎭' },
    { type:'chance',    label:'機會',     icon:'🎴' },
    { type:'zone',      zone:'nso-paiwan', qIdx:0, label:'NSO①',   icon:'🎵' },
    { type:'zone',      zone:'nso-paiwan', qIdx:1, label:'NSO②',   icon:'🎵' },
    { type:'zone',      zone:'nso-paiwan', qIdx:2, label:'NSO③',   icon:'🎵' },
    { type:'fate',      label:'命運',     icon:'💀' },
    { type:'zone',      zone:'bushwick', qIdx:0, label:'布希維克①', icon:'🎨' },
    { type:'zone',      zone:'bushwick', qIdx:1, label:'布希維克②', icon:'🎨' },
    { type:'zone',      zone:'bushwick', qIdx:2, label:'布希維克③', icon:'🎨' },
    { type:'rest',      label:'休息',     icon:'😴' },
    { type:'zone',      zone:'film', qIdx:0, label:'影展①',   icon:'🎬' },
    { type:'zone',      zone:'film', qIdx:1, label:'影展②',   icon:'🎬' },
    { type:'zone',      zone:'film', qIdx:2, label:'影展③',   icon:'🎬' },
    { type:'chance',    label:'機會',     icon:'🎴' },
    { type:'knowledge', kIdx:0, label:'知識①',   icon:'❓' },
    { type:'zone',      zone:'pride', qIdx:0, label:'同志①',   icon:'🌈' },
    { type:'zone',      zone:'pride', qIdx:1, label:'同志②',   icon:'🌈' },
    { type:'zone',      zone:'pride', qIdx:2, label:'同志③',   icon:'🌈' },
    { type:'fate',      label:'命運',     icon:'💀' },
    { type:'zone',      zone:'horse', qIdx:0, label:'翃舞①',   icon:'💃' },
    { type:'zone',      zone:'horse', qIdx:1, label:'翃舞②',   icon:'💃' },
    { type:'zone',      zone:'horse', qIdx:2, label:'翃舞③',   icon:'💃' },
    { type:'rest',      label:'休息',     icon:'😴' },
    { type:'knowledge', kIdx:1, label:'知識②',   icon:'❓' },
    { type:'zone',      zone:'summerstage', qIdx:0, label:'舞台①',  icon:'🌙' },
    { type:'zone',      zone:'summerstage', qIdx:1, label:'舞台②',  icon:'🌙' },
    { type:'zone',      zone:'summerstage', qIdx:2, label:'舞台③',  icon:'🌙' },
    { type:'chance',    label:'機會',     icon:'🎴' },
    { type:'knowledge', kIdx:2, label:'知識③',   icon:'❓' },
    { type:'fate',      label:'命運',     icon:'💀' },
    { type:'knowledge', kIdx:3, label:'知識④',   icon:'❓' },
    { type:'chance',    label:'機會',     icon:'🎴' },
    { type:'fate',      label:'命運',     icon:'💀' },
  ];

  /* ── 知識問答 (4題，從GAME_DATA各主題剩餘題目取) ── */
  const KNOWLEDGE_QS = [
    GAME_DATA['lin-hwai-min'].questions[3],   // 書法太極
    GAME_DATA['nso-paiwan'].questions[3],     // 布農族祈禱小米豐收歌
    GAME_DATA['horse'].questions[3],          // 兩廳院名稱
    GAME_DATA['pride'].questions[3],          // 西門町LGBTQ+
  ];

  /* ── 機會牌 (12張) ── */
  const CHANCE_CARDS = [
    { text:'你在社群分享 Taiwan Pop，演算法大爆發！', effect:'前進 3 格', fn: p => moveBy(p, 3) },
    { text:'林懷民大師親自指導你的步伐！',           effect:'前進 2 格', fn: p => moveBy(p, 2) },
    { text:'發現台灣小吃攤，精力充沛！',             effect:'再骰一次',  fn: p => grantExtraRoll(p) },
    { text:'雲門舞集表演票抽中啦！',                 effect:'前進 4 格', fn: p => moveBy(p, 4) },
    { text:'台灣觀光局贊助旅費！',                   effect:'前進 2 格', fn: p => moveBy(p, 2) },
    { text:'遇到同鄉台灣人互相打氣！',               effect:'再骰一次',  fn: p => grantExtraRoll(p) },
    { text:'在中央公園遇到好心紐約客帶路',           effect:'前進 1 格', fn: p => moveBy(p, 1) },
    { text:'意外成為 Taiwan Pop 網紅代言人！',        effect:'前進 3 格', fn: p => moveBy(p, 3) },
    { text:'台灣外交部特別招待，搭頭等艙回出發點！', effect:'移動到出發點', fn: p => moveToStart(p) },
    { text:'紐約地鐵嚴重延誤',                       effect:'後退 2 格', fn: p => moveBy(p, -2) },
    { text:'路過珍珠奶茶店，買了一杯慢慢喝',         effect:'無事，繼續走', fn: () => {} },
    { text:'收到 SummerStage 貴賓票，直奔現場！',    effect:'前進 3 格', fn: p => moveBy(p, 3) },
  ];

  /* ── 命運牌 (12張) ── */
  const FATE_CARDS = [
    { text:'護照忘在旅館，跑回去拿',               effect:'後退 3 格', fn: p => moveBy(p, -3) },
    { text:'踩到紐約口香糖，鞋子黏住了',           effect:'停一回合',  fn: p => setSkip(p) },
    { text:'搞錯地鐵方向，坐到終點站',             effect:'後退 4 格', fn: p => moveBy(p, -4) },
    { text:'行李太重，走路超慢',                   effect:'後退 2 格', fn: p => moveBy(p, -2) },
    { text:'遇上紐約暴雨，忘了帶傘',               effect:'後退 1 格', fn: p => moveBy(p, -1) },
    { text:'時差太嚴重，在 Central Park 長椅睡著', effect:'停一回合',  fn: p => setSkip(p) },
    { text:'被紐約街頭藝人邀請上台跳舞，耽誤時間', effect:'後退 2 格', fn: p => moveBy(p, -2) },
    { text:'台灣媒體採訪你對活動的感想！',         effect:'前進 2 格', fn: p => moveBy(p, 2) },
    { text:'意外接受 CNN 採訪，介紹台灣文化！',    effect:'前進 3 格', fn: p => moveBy(p, 3) },
    { text:'找到一張 Carnegie Hall 掉落的貴賓券！',effect:'前進 2 格', fn: p => moveBy(p, 2) },
    { text:'介紹台灣食物讓美國朋友大讚！',         effect:'前進 1 格', fn: p => moveBy(p, 1) },
    { text:'成功在 Bushwick 留下一幅塗鴉留念！',   effect:'前進 2 格', fn: p => moveBy(p, 2) },
  ];

  /* ── 遊戲狀態 ── */
  const G = {
    players: [
      { id:'human', name:'玩家',  icon:'🎒', pos:0, laps:0, skip:false },
      { id:'cpu',   name:'小丸子',icon:'🤖', pos:0, laps:0, skip:false },
    ],
    turn:       0,        // 0=human, 1=cpu
    phase:      'roll',   // roll | question | card | cpu | gameover
    extraRoll:  false,
    chancePool: shuffle([...Array(12).keys()]),
    fatePool:   shuffle([...Array(12).keys()]),
    prevPos:    [0, 0],   // position before last move (for rollback on wrong answer)
  };

  /* ── DOM refs ── */
  const boardEl      = document.getElementById('bgBoard');
  const diceBtnEl    = document.getElementById('bgDiceBtn');
  const diceLabelEl  = document.getElementById('bgDiceLabel');
  const diceIconEl   = document.getElementById('bgDiceIcon');
  const diceResultEl = document.getElementById('bgDiceResult');
  const turnMsgEl    = document.getElementById('bgTurnMsg');
  const qModal       = document.getElementById('bgQuestionModal');
  const qZone        = document.getElementById('bgQZone');
  const qText        = document.getElementById('bgQText');
  const qOpts        = document.getElementById('bgQOpts');
  const qResult      = document.getElementById('bgQResult');
  const qNext        = document.getElementById('bgQNext');
  const cardModal    = document.getElementById('bgCardModal');
  const cardBox      = document.getElementById('bgCardBox');
  const cardType     = document.getElementById('bgCardType');
  const cardText     = document.getElementById('bgCardText');
  const cardEffect   = document.getElementById('bgCardEffect');
  const winModal     = document.getElementById('bgWinModal');

  if (!boardEl) return;

  /* ── Build board: calculate oval positions for 36 spaces ── */
  const BW = boardEl.offsetWidth  || 680;
  const BH = boardEl.offsetHeight || 440;
  const cx = BW / 2, cy = BH / 2;
  const rx = BW * 0.44, ry = BH * 0.40;

  // Draw SVG track ellipse
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','bg-track-svg');
  svg.setAttribute('viewBox',`0 0 ${BW} ${BH}`);
  const ellipse = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
  ellipse.setAttribute('cx', cx); ellipse.setAttribute('cy', cy);
  ellipse.setAttribute('rx', rx); ellipse.setAttribute('ry', ry);
  ellipse.setAttribute('fill','none');
  ellipse.setAttribute('stroke','rgba(255,255,255,.12)');
  ellipse.setAttribute('stroke-width','2');
  ellipse.setAttribute('stroke-dasharray','6 4');
  svg.appendChild(ellipse);
  boardEl.appendChild(svg);

  // Place spaces
  const spaceEls = SPACES.map((sp, i) => {
    const angle = (i / SPACES.length) * 2 * Math.PI - Math.PI / 2;
    const x = cx + rx * Math.cos(angle);
    const y = cy + ry * Math.sin(angle);

    const el = document.createElement('div');
    el.className = 'bg-space bg-space--' + sp.type;
    if (sp.zone) el.dataset.zone = sp.zone;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    el.innerHTML  = `<span class="bg-space-icon">${sp.icon}</span><span class="bg-space-num">${i}</span>`;
    el.title = sp.label;
    boardEl.appendChild(el);
    return { el, x, y };
  });

  // Place player pieces
  const pieceEls = G.players.map(p => {
    const piece = document.createElement('div');
    piece.className = `bg-piece bg-piece--${p.id}`;
    piece.textContent = p.icon;
    boardEl.appendChild(piece);
    return piece;
  });
  updatePieces();

  /* ── Helpers ── */
  function spacePos(idx) { return spaceEls[idx]; }

  function updatePieces() {
    G.players.forEach((p, i) => {
      const sp = spacePos(p.pos);
      pieceEls[i].style.left = sp.x + 'px';
      pieceEls[i].style.top  = sp.y + 'px';
    });
  }

  function updateStatusBar() {
    document.getElementById('bgPlayerPos').textContent  = G.players[0].pos;
    document.getElementById('bgPlayerLaps').textContent = G.players[0].laps;
    document.getElementById('bgCpuPos').textContent     = G.players[1].pos;
    document.getElementById('bgCpuLaps').textContent    = G.players[1].laps;
  }

  function setTurnMsg(msg) { if (turnMsgEl) turnMsgEl.textContent = msg; }
  function setDiceResult(txt) { if (diceResultEl) diceResultEl.textContent = txt; }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function drawCard(pool, deck) {
    if (pool.length === 0) pool.push(...shuffle([...Array(deck.length).keys()]));
    return deck[pool.shift()];
  }

  function advancePos(player, steps) {
    const prev = player.pos;
    let next = (prev + steps + SPACES.length) % SPACES.length;
    // Count laps: each time pos wraps past 0
    if (steps > 0) {
      const raw = prev + steps;
      const lapsGained = Math.floor(raw / SPACES.length);
      if (lapsGained > 0) {
        player.laps += lapsGained;
        if (player.laps >= TOTAL_LAPS) { player.pos = next; return true; } // win!
      }
    }
    player.pos = next;
    return false;
  }

  /* ── Card effect helpers ── */
  function moveBy(playerIdx, steps) {
    const p = G.players[playerIdx];
    const won = advancePos(p, steps);
    updatePieces();
    updateStatusBar();
    if (won) { setTimeout(() => showWin(playerIdx), 600); }
  }

  function moveToStart(playerIdx) {
    const p = G.players[playerIdx];
    if (p.pos !== 0) { p.laps += 1; }
    p.pos = 0;
    if (p.laps >= TOTAL_LAPS) { updatePieces(); updateStatusBar(); setTimeout(() => showWin(playerIdx), 600); return; }
    updatePieces();
    updateStatusBar();
  }

  function grantExtraRoll(playerIdx) {
    if (playerIdx === 0) { G.extraRoll = true; }
  }

  function setSkip(playerIdx) { G.players[playerIdx].skip = true; }

  /* ── Roll dice ── */
  window.bgRollDice = function() {
    if (G.phase !== 'roll') return;
    if (diceBtnEl) { diceBtnEl.disabled = true; diceBtnEl.classList.add('rolling'); }
    setTimeout(() => {
      if (diceBtnEl) diceBtnEl.classList.remove('rolling');
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceResult(`🎲 ${roll}`);
      diceLabelEl.textContent = roll + ' 步';
      doMove(0, roll);
    }, 500);
  };

  function doMove(playerIdx, roll) {
    const p  = G.players[playerIdx];
    G.prevPos[playerIdx] = p.pos;
    const won = advancePos(p, roll);
    updatePieces();
    updateStatusBar();

    if (won) { setTimeout(() => showWin(playerIdx), 600); return; }

    const sp = SPACES[p.pos];
    setTimeout(() => landOn(playerIdx, sp), 450);
  }

  function landOn(playerIdx, sp) {
    switch (sp.type) {
      case 'start':
        endTurn(playerIdx);
        break;
      case 'rest':
        setSkip(playerIdx);
        setTurnMsg(playerIdx === 0 ? '😴 踩到休息格，下回合跳過' : '🤖 小丸子在休息...');
        endTurn(playerIdx);
        break;
      case 'chance':
        showCard(playerIdx, 'chance');
        break;
      case 'fate':
        showCard(playerIdx, 'fate');
        break;
      case 'zone':
      case 'knowledge':
        showQuestion(playerIdx, sp);
        break;
      default:
        endTurn(playerIdx);
    }
  }

  /* ── Question ── */
  function showQuestion(playerIdx, sp) {
    G.phase = 'question';
    let q;
    if (sp.type === 'zone') {
      q = GAME_DATA[sp.zone].questions[sp.qIdx];
      const zd = GAME_DATA[sp.zone];
      qZone.textContent = zd.emoji + ' ' + zd.title;
      qZone.style.background = zd.colorLight;
      qZone.style.color = zd.color;
    } else {
      q = KNOWLEDGE_QS[sp.kIdx];
      qZone.textContent = '❓ 知識問答';
      qZone.style.background = '#e6f7f4';
      qZone.style.color = 'var(--primary)';
    }

    qText.textContent = q.q;
    qOpts.innerHTML = '';
    qResult.className = 'bg-modal-result hidden';
    qResult.innerHTML = '';
    qNext.className = 'bg-modal-next hidden';
    qModal.classList.remove('hidden');

    // Shuffle answer options (maintain correct index)
    const indices = shuffle([0, 1, 2, 3]);
    const correctOrigIdx = q.ans; // always 0 in GAME_DATA

    if (playerIdx === 1) {
      // CPU auto-answer
      const willCorrect = Math.random() < CPU_HIT_RATE;
      const chosenIdx = willCorrect ? correctOrigIdx : (correctOrigIdx + 1 + Math.floor(Math.random() * 3)) % 4;
      indices.forEach((origIdx, pos) => {
        const btn = document.createElement('button');
        btn.className = 'bg-opt-btn';
        btn.textContent = q.opts[origIdx];
        btn.disabled = true;
        qOpts.appendChild(btn);
      });
      setTurnMsg('🤖 小丸子思考中...');
      setTimeout(() => {
        const isCorrect = (chosenIdx === correctOrigIdx);
        const displayPos = indices.indexOf(chosenIdx);
        qOpts.children[displayPos].classList.add(isCorrect ? 'correct' : 'wrong');
        handleAnswer(playerIdx, isCorrect, q);
      }, 1500);
    } else {
      indices.forEach(origIdx => {
        const btn = document.createElement('button');
        btn.className = 'bg-opt-btn';
        btn.textContent = q.opts[origIdx];
        btn.onclick = () => {
          Array.from(qOpts.children).forEach(b => b.disabled = true);
          const isCorrect = (origIdx === correctOrigIdx);
          btn.classList.add(isCorrect ? 'correct' : 'wrong');
          handleAnswer(playerIdx, isCorrect, q);
        };
        qOpts.appendChild(btn);
      });
    }
  }

  function handleAnswer(playerIdx, isCorrect, q) {
    if (isCorrect) {
      qResult.className = 'bg-modal-result correct';
      qResult.innerHTML = `✅ 答對了！<br><small>${q.fact}</small>`;
    } else {
      qResult.className = 'bg-modal-result wrong';
      qResult.innerHTML = `❌ 答錯了！正確答案是「${q.opts[q.ans]}」<br><small>${q.fact}</small>`;
      // Roll back position
      G.players[playerIdx].pos = G.prevPos[playerIdx];
      // If laps were gained on this move, subtract them back
      // (simple: just recalc - since we only move forward by dice roll 1-6, max 1 lap gained)
      updatePieces();
      updateStatusBar();
    }
    qNext.className = 'bg-modal-next';
    qNext.dataset.player = playerIdx;
    qNext.dataset.correct = isCorrect ? '1' : '0';
  }

  window.bgQuestionDone = function() {
    qModal.classList.add('hidden');
    G.phase = 'roll';
    endTurn(parseInt(qNext.dataset.player));
  };

  /* ── Chance / Fate Card ── */
  function showCard(playerIdx, type) {
    G.phase = 'card';
    const card = type === 'chance'
      ? drawCard(G.chancePool, CHANCE_CARDS)
      : drawCard(G.fatePool,   FATE_CARDS);

    cardBox.className = `bg-card-box bg-card-box--${type}`;
    cardType.textContent  = type === 'chance' ? '🎴 機會！' : '💀 命運！';
    cardText.textContent  = card.text;
    cardEffect.textContent = '→ ' + card.effect;
    cardModal.classList.remove('hidden');

    cardModal.dataset.player = playerIdx;
    cardModal.dataset.fn = JSON.stringify({ type, text: card.text, effect: card.effect });
    // Store fn reference
    cardModal._pendingFn = () => card.fn(playerIdx);
  }

  window.bgCardDone = function() {
    cardModal.classList.add('hidden');
    const playerIdx = parseInt(cardModal.dataset.player);
    if (cardModal._pendingFn) { cardModal._pendingFn(); cardModal._pendingFn = null; }
    G.phase = 'roll';
    // Check win after card effect
    if (G.players[playerIdx].laps >= TOTAL_LAPS) {
      setTimeout(() => showWin(playerIdx), 300);
      return;
    }
    if (!G.extraRoll) {
      endTurn(playerIdx);
    } else {
      G.extraRoll = false;
      enableRoll();
    }
  };

  /* ── End turn / CPU turn ── */
  function endTurn(playerIdx) {
    if (G.phase === 'gameover') return;
    if (G.extraRoll && playerIdx === 0) {
      G.extraRoll = false;
      setTurnMsg('🎲 再骰一次！');
      enableRoll();
      return;
    }
    G.turn = playerIdx === 0 ? 1 : 0;
    if (G.turn === 1) {
      setTurnMsg('🤖 小丸子的回合...');
      setDiceResult('');
      if (diceBtnEl) diceBtnEl.disabled = true;
      setTimeout(cpuTurn, 1200);
    } else {
      if (G.players[0].skip) {
        G.players[0].skip = false;
        setTurnMsg('😴 你在休息，跳過本回合');
        setTimeout(() => endTurn(0), 1500);
      } else {
        enableRoll();
      }
    }
  }

  function enableRoll() {
    G.phase = 'roll';
    G.turn  = 0;
    setTurnMsg('輪到你了！');
    diceLabelEl.textContent = '擲骰子';
    if (diceBtnEl) diceBtnEl.disabled = false;
  }

  function cpuTurn() {
    if (G.phase === 'gameover') return;
    if (G.players[1].skip) {
      G.players[1].skip = false;
      setTurnMsg('🤖 小丸子在休息...');
      setTimeout(() => endTurn(1), 1200);
      return;
    }
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceResult(`🎲 ${roll}`);
    setTurnMsg(`🤖 小丸子擲出 ${roll} 步`);
    G.phase = 'cpu';
    setTimeout(() => doMove(1, roll), 800);
  }

  /* ── Win ── */
  function showWin(playerIdx) {
    G.phase = 'gameover';
    const isHuman = playerIdx === 0;
    winModal.classList.remove('hidden');
    document.getElementById('bgWinIcon').textContent  = isHuman ? '🎉' : '🤖';
    document.getElementById('bgWinTitle').textContent = isHuman ? '恭喜你獲勝！' : '小丸子獲勝！';
    document.getElementById('bgWinSub').textContent   = isHuman
      ? '你成功繞行紐約三圈，探索了所有台灣文化活動！'
      : '別氣餒，再試一次讓你更了解台灣文化！';
    // Confetti
    const container = document.getElementById('bgWinConfetti');
    container.innerHTML = '';
    const colors = ['#FF4D75','#008F7A','#FFD700','#FF6B35','#A8E6CF'];
    for (let i = 0; i < 60; i++) {
      const d = document.createElement('div');
      d.className = 'confetti-piece';
      d.style.cssText =
        `left:${(Math.random()*100).toFixed(1)}%;` +
        `background:${colors[i%colors.length]};` +
        `animation-delay:${(Math.random()*1.5).toFixed(2)}s;` +
        `animation-duration:${(2+Math.random()*2).toFixed(2)}s;` +
        `width:${(6+Math.random()*8).toFixed(0)}px;height:${(6+Math.random()*8).toFixed(0)}px;`;
      container.appendChild(d);
    }
  }

  window.bgRestart = function() {
    winModal.classList.add('hidden');
    G.players.forEach(p => { p.pos = 0; p.laps = 0; p.skip = false; });
    G.turn      = 0;
    G.extraRoll = false;
    G.chancePool = shuffle([...Array(12).keys()]);
    G.fatePool   = shuffle([...Array(12).keys()]);
    G.prevPos    = [0, 0];
    updatePieces();
    updateStatusBar();
    setDiceResult('');
    enableRoll();
  };

  /* ── Init ── */
  updateStatusBar();
  enableRoll();

})();

/* ---------- A-WE Character System ---------- */
(function initAwe() {
  const AWE_SPEED = 10;        // % map-width per second
  const ASPECT    = 1600 / 520; // mapStage w/h ratio — for isotropic distance
  const ENC_R     = 4;          // encounter trigger radius (normalised %)

  const CARDS = [
    { id:'k01', x:35, y:47, img:'https://picsum.photos/seed/tw001/400/200', fact:'雲門舞集由林懷民創立於 1973 年', ans:true },
    { id:'k02', x:54, y:36, img:'https://picsum.photos/seed/tw002/400/200', fact:'台灣是亞洲第一個同婚合法化的地區（2019年）', ans:true },
    { id:'k03', x:40, y:62, img:'https://picsum.photos/seed/tw003/400/200', fact:'排灣族泰武古謠已列入文化部無形文化資產', ans:true },
    { id:'k04', x:72, y:44, img:'https://picsum.photos/seed/tw004/400/200', fact:'布希維克（Bushwick）位於曼哈頓', ans:false },
    { id:'k05', x:62, y:65, img:'https://picsum.photos/seed/tw005/400/200', fact:'NSO 全名是 National Symphony Orchestra（不含 of Taiwan）', ans:false },
    { id:'k06', x:15, y:40, img:'https://picsum.photos/seed/tw006/400/200', fact:'林肯中心位於紐約上西城（Upper West Side）', ans:true },
    { id:'k07', x:30, y:55, img:'https://picsum.photos/seed/tw007/400/200', fact:'卡內基音樂廳建於 1891 年', ans:true },
    { id:'k08', x:50, y:20, img:'https://picsum.photos/seed/tw008/400/200', fact:'台灣電影《悲情城市》首部入圍威尼斯影展競賽', ans:true },
    { id:'k09', x:44, y:72, img:'https://picsum.photos/seed/tw009/400/200', fact:'IFC Center 位於格林威治村（Greenwich Village）', ans:true },
    { id:'k10', x:76, y:30, img:'https://picsum.photos/seed/tw010/400/200', fact:'紐約同志大遊行每年在 6 月舉行', ans:true },
    { id:'k11', x:22, y:68, img:'https://picsum.photos/seed/tw011/400/200', fact:'翃舞製作是以原住民文化為核心的舞蹈公司', ans:false },
    { id:'k12', x:60, y:50, img:'https://picsum.photos/seed/tw012/400/200', fact:'Central Park SummerStage 是免費戶外演出場地', ans:true },
    { id:'k13', x:36, y:28, img:'https://picsum.photos/seed/tw013/400/200', fact:'台灣護照免簽國家數全球排名前 40 名', ans:true },
    { id:'k14', x:80, y:62, img:'https://picsum.photos/seed/tw014/400/200', fact:'台灣電影金馬獎比金曲獎歷史更悠久', ans:true },
    { id:'k15', x:12, y:58, img:'https://picsum.photos/seed/tw015/400/200', fact:'珍珠奶茶發源於台中', ans:true },
  ];

  const S = {
    pos:         { x: 50, y: 50 }, // overwritten below after DOM refs are ready
    waypoints:   [],
    dir:         'front',
    moving:      false,
    paused:      false,
    pendingQid:  null,
    collected:   new Set(),
    active:      new Set(CARDS.map(c => c.id)),
    recentWrong: new Set(), // answered wrong — suppressed until a-we walks away
    lastTime:    null,
    raf:         null,
  };

  const mapStage      = document.getElementById('mapStage');
  const charEl        = document.getElementById('aweChar');
  const spriteEl      = document.getElementById('aweSprite');
  const counterEl     = document.getElementById('cardCountNum');
  const cardModal     = document.getElementById('cardModal');
  const cmFact        = document.getElementById('cmFact');
  const cmResult      = document.getElementById('cmResult');
  const cmImg         = document.getElementById('cmImg');
  const diceBtn       = document.getElementById('diceBtn');
  const diceResult    = document.getElementById('diceResult');
  const completeModal = document.getElementById('aweComplete');
  if (!charEl || !mapStage) return;

  /* Start at center of the visible viewport, not the full 1600px map */
  const mapScrollEl = document.getElementById('mapScroll');
  const stageW      = mapStage.offsetWidth || 1600;
  S.pos.x = mapScrollEl
    ? (mapScrollEl.scrollLeft + mapScrollEl.clientWidth / 2) / stageW * 100
    : 20;

  /* --- Pin click → move a-we --- */
  mapStage.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const x = parseFloat(pin.style.left);
      const y = parseFloat(pin.style.top);
      moveTo(x, y, pin.dataset.qid);
    });
  });

  updateDOM();

  /* --- Movement --- */
  function moveTo(tx, ty, qid) {
    if (S.paused) return;
    S.waypoints  = [{ x: tx, y: S.pos.y }, { x: tx, y: ty }];
    S.pendingQid = qid;
    if (!S.moving) {
      S.moving   = true;
      S.lastTime = null;
      S.raf      = requestAnimationFrame(tick);
    }
  }

  /* Straight-line movement for dice rolls (no quiz trigger) */
  function moveDirect(tx, ty) {
    if (S.paused) return;
    S.waypoints  = [{ x: tx, y: ty }];
    S.pendingQid = null;
    if (!S.moving) {
      S.moving   = true;
      S.lastTime = null;
      S.raf      = requestAnimationFrame(tick);
    }
  }

  /* Dice roll — exposed globally */
  const DICE_DIRS = ['N', 'S', 'E', 'W'];
  const DICE_STEP = 8; // % per step
  window.aweDiceRoll = function() {
    if (S.paused || S.moving) return;
    if (diceBtn) { diceBtn.disabled = true; diceBtn.classList.add('rolling'); }
    setTimeout(() => {
      if (diceBtn) { diceBtn.classList.remove('rolling'); }
      const dir   = DICE_DIRS[Math.floor(Math.random() * 4)];
      const steps = Math.floor(Math.random() * 6) + 1;
      const dist  = steps * DICE_STEP;
      let tx = S.pos.x, ty = S.pos.y;
      if (dir === 'N') ty = Math.max(5,  ty - dist);
      if (dir === 'S') ty = Math.min(95, ty + dist);
      if (dir === 'E') tx = Math.min(95, tx + dist);
      if (dir === 'W') tx = Math.max(5,  tx - dist);
      const arrows = { N:'↑北', S:'↓南', E:'→東', W:'←西' };
      // Show result in button label
      const lbl = diceBtn ? diceBtn.querySelector('.dice-label') : null;
      if (lbl) lbl.textContent = `${arrows[dir]} × ${steps} 步`;
      moveDirect(tx, ty);
    }, 500);
  };

  function tick(ts) {
    if (!S.lastTime) S.lastTime = ts;
    const dt = Math.min((ts - S.lastTime) / 1000, 0.1);
    S.lastTime = ts;

    if (S.paused) { S.raf = requestAnimationFrame(tick); return; }

    if (S.waypoints.length === 0) {
      S.moving = false;
      charEl.classList.remove('moving');
      updateDOM(); // re-enable dice button
      // Restore dice label after short delay
      if (diceBtn) {
        const lbl = diceBtn.querySelector('.dice-label');
        if (lbl && lbl.textContent !== '擲骰子') {
          setTimeout(() => { if (lbl) lbl.textContent = '擲骰子'; }, 1200);
        }
      }
      if (S.pendingQid) {
        const qid  = S.pendingQid;
        S.pendingQid = null;
        window._startQuiz && window._startQuiz(qid);
      }
      return;
    }

    const wp   = S.waypoints[0];
    const dx   = wp.x - S.pos.x;
    const dy   = wp.y - S.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const step = AWE_SPEED * dt;

    if (Math.abs(dx) > 0.2)      S.dir = dx > 0 ? 'right' : 'left';
    else if (Math.abs(dy) > 0.2) S.dir = dy > 0 ? 'front' : 'back';

    if (dist <= step) {
      S.pos = { x: wp.x, y: wp.y };
      S.waypoints.shift();
    } else {
      S.pos.x += (dx / dist) * step;
      S.pos.y += (dy / dist) * step;
    }

    checkEncounters();
    updateDOM();
    S.raf = requestAnimationFrame(tick);
  }

  /* --- Encounter detection --- */
  function checkEncounters() {
    for (const c of CARDS) {
      if (!S.active.has(c.id)) continue;
      const dx = c.x - S.pos.x;
      const dy = (c.y - S.pos.y) * ASPECT;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // If answered wrong recently, clear suppression only once far enough away
      if (S.recentWrong.has(c.id)) {
        if (dist > ENC_R * 3) S.recentWrong.delete(c.id);
        continue;
      }
      if (dist < ENC_R) { showCard(c); break; }
    }
  }

  function showCard(card) {
    S.paused = true;
    charEl.classList.remove('moving');
    if (cmImg) cmImg.src       = card.img || '';
    cmFact.textContent         = card.fact;
    cmResult.textContent       = '';
    cmResult.className         = 'cm-result hidden';
    cardModal.dataset.cid      = card.id;
    cardModal.dataset.cans     = card.ans;
    cardModal.classList.remove('hidden');
  }

  window.aweAnswer = function(userAns) {
    const card    = CARDS.find(c => c.id === cardModal.dataset.cid);
    const correct = (userAns === (cardModal.dataset.cans === 'true'));
    if (correct) {
      S.collected.add(card.id);
      S.active.delete(card.id);
      cmResult.textContent = '🎉 正確！卡片收藏成功';
      cmResult.className   = 'cm-result correct';
    } else {
      S.recentWrong.add(card.id); // suppress re-trigger until a-we walks away
      cmResult.textContent = '❌ 答錯了，下次路過再試試！';
      cmResult.className   = 'cm-result wrong';
    }
    updateCounter();
    setTimeout(() => {
      cardModal.classList.add('hidden');
      S.paused = false;
      if (S.collected.size === CARDS.length) { showCompletion(); return; }
      if (S.moving || S.waypoints.length > 0 || S.pendingQid) {
        S.moving   = true;
        S.lastTime = null;
        S.raf      = requestAnimationFrame(tick);
      }
    }, 1400);
  };

  /* --- DOM helpers --- */
  function updateDOM() {
    charEl.style.left = S.pos.x + '%';
    charEl.style.top  = S.pos.y + '%';
    spriteEl.src = 'images/awe-' + S.dir + '.png';
    charEl.classList.toggle('moving', S.moving && !S.paused);
    if (diceBtn) diceBtn.disabled = S.moving || S.paused;
  }

  function updateCounter() {
    if (counterEl) counterEl.textContent = S.collected.size;
  }

  /* --- Completion --- */
  function showCompletion() {
    if (!completeModal) return;
    const container = document.getElementById('aweCelebConfetti');
    container.innerHTML = '';
    const colors = ['#FF4D75','#008F7A','#FFD700','#FF6B35','#A8E6CF','#FF85A1','#B5EAD7'];
    for (let i = 0; i < 80; i++) {
      const d = document.createElement('div');
      d.className = 'confetti-piece';
      d.style.cssText =
        `left:${(Math.random()*100).toFixed(1)}%;` +
        `background:${colors[i % colors.length]};` +
        `animation-delay:${(Math.random()*2).toFixed(2)}s;` +
        `animation-duration:${(2 + Math.random()*2).toFixed(2)}s;` +
        `width:${(6 + Math.random()*8).toFixed(0)}px;` +
        `height:${(6 + Math.random()*8).toFixed(0)}px;` +
        `transform:rotate(${(Math.random()*360).toFixed(0)}deg)`;
      container.appendChild(d);
    }
    completeModal.classList.remove('hidden');
  }

  window.aweCloseComplete = function() {
    completeModal.classList.add('hidden');
  };
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
