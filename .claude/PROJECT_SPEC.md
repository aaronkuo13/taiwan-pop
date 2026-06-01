# Taiwan Pop — 專案規範文件

> 最後更新：2026-06-01（PR #59 events cleanup；PR #60 concept/calendar/index polish）

---

## 專案概述

Taiwan Pop 是台灣文化部與 Taipei Cultural Center in NY（TCCNY）合作的年度文化交流計畫靜態網站，透過七大藝文展演讓台灣被世界看見。

- **Live URL**: https://taiwanpop.tw（自訂網域，GitHub Pages）
- **Repo**: https://github.com/aaronkuo13/taiwan-pop
- **SSH**: git@github.com:aaronkuo13/taiwan-pop.git
- **Branch 策略**: main（保護）+ feature branch PR 流程，禁止直接 push main
- **GA4**: G-K6V2LJ748H（埋入所有頁面 `<head>`）

---

## 技術架構

- **純靜態** HTML/CSS/JS — 無框架、無建置工具
- **字體**: Montserrat + Noto Sans TC（Google Fonts）
- **Dev server**: `python3 -m http.server 3000`
- **部署**: GitHub Pages，merge to main 自動部署
- **Firebase**（CMS 系統）:
  - Firestore — 文章資料
  - Storage — 圖片上傳
  - Auth — 後台登入（Email/Password）
  - Firebase SDK: CDN `12.12.0`（ES module `type="module"`）
  - 專案 ID: `taiwanpop-b906b`

---

## 檔案結構

```
/Users/aaron/taiwanpop/
├── index.html          # 首頁：Banner、策展主題、最新消息
├── events.html         # 展演活動頁：Featured Banner + 活動 Grid
├── event.html          # 展演活動詳情頁（URL param: ?num=XX）
├── calendar.html       # 行事曆獨立頁面
├── concept.html        # 策展理念頁：臺灣上奅主視覺 + 三大策略
├── awe.html            # a-we 紐約跑酷：Canvas 跑酷遊戲 + Top 10 排行榜
├── news.html           # 最新消息文章列表（分類篩選 + 分頁）
├── article.html        # 文章詳情頁（URL param: ?id=xxx）
├── twpop-manage/
│   └── index.html      # CMS 後台（Firebase Auth 保護，不公開）
├── css/style.css       # 全站樣式
├── js/
│   ├── lang.js               # 語言字串 ZH/EN
│   ├── data.js               # EVENTS array + GAME_DATA
│   ├── components.js         # 共用 navbar + footer（頁面偵測 8 種）
│   ├── navbar.js             # scroll + hamburger + scroll spy
│   ├── events.js             # renderEvents() + renderFeaturedBanner()
│   ├── event-detail.js       # 活動詳情頁渲染（event.html）
│   ├── calendar.js           # 行事曆（calendar.html only）
│   ├── reveal.js             # Scroll-reveal 動畫
│   ├── modal.js              # 活動 Modal（calendar.html）
│   ├── awe-game.js           # a-we NYC Run Canvas 跑酷遊戲（awe.html only，ES module）
│   ├── home-awe-stage.js     # 首頁 a-we 跑酷宣傳區塊動畫（index.html only）
│   ├── firebase.js           # Firebase 初始化模組（ES module，export db/auth/storage）
│   ├── news-home.js          # 首頁最新消息動態抓取（ES module，index.html 用）
│   └── lang-init.js          # 語言初始化（必須最後載入）
├── images/
│   ├── taiwanpop_green.png   # Navbar logo
│   ├── banner_sample.png     # 展演活動 Featured Banner 示意圖（1280×390）
│   ├── 展演活動_*.png        # 活動實際照片（1080×1350，4:5）
│   ├── yoyo-front/back/left/right.png  # Yoyo 角色圖
│   ├── awe_v10_pink-walk_right/left.png  # a-we 走路動畫（2幀）
│   ├── awe_v10_pink-26~30.png            # a-we 跳躍動畫（5幀）
│   └── 場景-01~20.png                    # 遊戲障礙物：紐約場景圖
├── data/
│   └── events.json     # Featured Banner 資料源（8 筆活動，含 featured flag）
├── CNAME               # taiwanpop.tw
├── .gitignore
└── .claude/
    ├── launch.json     # Dev server 設定
    └── PROJECT_SPEC.md # 本文件
```

---

## 色彩系統（CSS 變數）

定義於 `css/tp-shared.css`：

| 變數 | 值 | 用途 |
|------|----|------|
| `--black` | `#080808` | 全站背景 |
| `--white` | `#f4f2ec` | 主要文字、淺色背景 |
| `--green` | `#00FF57` | 霓虹綠，按鈕、active、STREET 分類 |
| `--blue` | `#3B7FFF` | IMAGE 分類識別 |
| `--pink` | `#FF2D6B` | SOUND 分類識別、部分裝飾 |
| `--border` | `rgba(255,255,255,0.08)` | 細線分隔 |

**字體**：
- `--font-d`: Bebas Neue（標題展示用）
- `--font-m`: DM Mono（標籤、日期、數字）
- `--font-b`: Noto Sans TC（內文）

**雙語切換 CSS（tp-shared.css 全局）**：
```css
.lang-en { display: none; }
html[lang="en"] .lang-zh { display: none; }
html[lang="en"] .lang-en { display: revert; }
```
> `html[lang]` 由 `lang-init.js` 的 `setLang()` 設定（`zh-TW` / `en`）。只要元素掛 `.lang-zh` / `.lang-en` class 即可自動切換，無需額外 JS。

**字級規範（Type Scale）**：  
> 規則：全站最小字體為 **18px**，任何可見文字不得小於 `--fs-base`。  
> CSS 變數定義於 `css/tp-shared.css` `:root`。

| 變數 | 值 | 換算 | 用途 |
|------|----|------|------|
| `--fs-base` | `1.125rem` | **18px** | 最小值 — 內文 / 標籤 / 按鈕 / UI 文字下限 |
| `--fs-md` | `1.25rem` | 20px | 次要強調、subtitle |
| `--fs-lg` | `1.5rem` | 24px | 卡片標題 |
| — | `clamp(...)` | 24px↑ | 大標題獨立控制，不受 fs-base 限制 |

執行規則：
- 每次改一個頁面，將該頁面內的 px/rem 小字換成 `var(--fs-base)` 或更大的值
- `html { font-size: 16px }` 不在 media query 中縮小，確保 1.125rem = 18px 在所有螢幕尺寸成立
- 標題類（Bebas Neue + `clamp()`）不受此限，自行管理響應式大小

> ⚠️ 綠色背景元素的文字色一律用 `var(--black)`（非 `#fff`）

---

## 設計風格

- Brand: Semi-Wildstyle graffiti logo，街頭塗鴉風格，強烈撞色
- YouTube banner video ID: `kYnsfLi-U8s`（autoplay, muted, loop）
- Banner logo: `images/logo-main.png`（neon glow animation）
- Navbar logo: `images/taiwanpop_green.png`（圖片，非文字）
- Navbar scrolled 狀態：黑底半透明

---

## 頁面說明

### index.html — 首頁
1. Navbar（components.js）
2. Banner — YouTube 全螢幕影片背景 + 塗鴉 logo + overlay（影片 ID: `ft2O5R9Y2LA`）
3. `#showcase` — Showcase 左右並排兩欄 Grid（PR #43 改版）
   - 左欄 `.showcase-hero`：Taiwan Pop logo（340px）+ 霓虹光暈 + 四角 L 型角標
   - 右欄 `.stats-strip`：三列直排 stat-cell（7+ / 3 / 1），左側 hover 彩色 bar
   - hover 任一 stat-cell → logo 對應色光暈變化
   - ≤960px：上下堆疊、hover bar 回到頂端橫條
4. `#themes` — 「展演主題 / EVENT THEMES」標題 + 三大展演策略色塊（SOUND/IMAGE/STREET）
   - 色塊底部 `→` 箭頭：`.tc-link .arr { font-size: 4rem }`（PR #60 放大，視覺比例一致）
5. a-we 紐約跑酷宣傳區塊（`home-awe-stage.js`）
   - section-header + 300px 高 Stage（NYC 天際線 SVG 線稿背景）
   - 30 隻 a-we 逐一以史萊姆跳躍方式登場（生成間隔遞減），最後巨大 a-we 衝場後重置
   - 「來去跑酷！」CTA 按鈕連結 awe.html
6. `#articles` — 最新消息（動態抓取 Firestore 最新 3 篇，`news-home.js`）
   - 載入中：3 個 shimmer skeleton 卡片（`.article-card-skeleton`）
   - 無資料：空值狀態（`.news-empty-state`，虛線框 + 中英文說明）
7. `.spray-band` — 星光背景 + SOUND / IMAGE / STREET / TAIWANPOP 四詞自動循環點亮（2s interval），hover 進入 band 暫停、hover 單字切換 active、離開重啟
8. bc-row — 「臺灣上奅 SIŌNG PHĀNN」策展理念文案區塊（連結 concept.html）
   - hover：螢光綠從左側展開佔滿背景（Color Takeover，`::before scaleX 0→1`）
9. Footer（components.js）— 雙欄版型：左側 TAIWANPOP logo + tagline + 社群圖示；右側 主辦單位 + 紐文 logo（`images/紐文logo.png`）
### events.html — 展演活動
1. Navbar
2. `#featured-event` — Featured Banner（PR #43 改版，PR #59 i18n 更新）
   - 全幅圖片（`bannerImg || imgInner || img`），點擊連結活動詳情
   - 貼紙：ZH `即將登場` / EN `NEXT UP`（語言切換）
   - 狀態列：UPCOMING + 日期（`MM.DD WKD` 格式）+ 倒數（ZH: 倒數 N 天 / EN: N days to go）+ CTA `→`
   - 選擇邏輯：`featured:true` → 下一筆 upcoming → 最近過去
   - 資料源：`EVENTS` array（`js/data.js`），同步渲染，`bannerImg` 欄位
3. `#events` — 展演活動 Grid（三大分類，主/次兩層，PR #59 改版）
   - 分類標題格式：`01・Body & Sound`（數字 + 間隔號 + 中/英名稱）
   - 副標題：只保留「Feel the xxx」tagline + 日期，移除樂種描述前綴
   - **活動可見度**：由 Firestore `config/events_visibility` 控制（`{num: true/false}`）
   - 載入中：顯示 `LOADING · 載入中` 佔位
   - 某分類全部關閉 → 顯示 COMING SOON 卡片
   - `window.eventsVisibility = null`（sentinel）→ Firestore fetch 完成後設為實際值，觸發 re-render
4. Footer

### event.html — 活動詳情
- URL param: `?num=XX`
- `event-detail.js` 讀取 EVENTS，渲染標題/日期/地點/說明/CTA（PR #59 大幅更新）
- Hero subtitle：只保留「Feel the xxx」tagline（移除「室內樂 × 排灣族古謠」等前綴）
- Section labels：單語言（ZH: 活動介紹 / EN: ABOUT 等），不再顯示雙組
- CTA 按鈕：有 `externalUrl` → 顯示購票按鈕；無 → 完全隱藏（不顯示 disabled 狀態）
- 已移除：回上頁按鈕、演出者職業/樂器說明
- **Section 順序**：活動介紹 → 預告影片 → 演出曲目 → 演出單位 → 策展人/主講人 → 演出者 → 劇照
- **Section 說明**：
  - `detailVideo`：YouTube embed（16:9），由 `ev.youtubeId` 控制
  - `detailProgram`：演出曲目清單，支援 `premiere` 世界首演 badge
  - `detailEnsemble`：演出單位卡片，支援 `photo`（左側人像）、`logo`（白色 filter）
  - `detailSpeakers`：策展人/主講人卡片，label 由 `ev.speakersLabel` 自訂
  - `detailPerformers`：演出者 2 欄 grid，label 由 `ev.performersLabel` 自訂（只顯示名字）
  - `detailGallery`：劇照 3 欄 grid，所有圖片 aspect-ratio 4:3
- 社群連結：SVG icon-only 圓形按鈕（`socialLinks()` helper），支援 website/facebook/instagram

### concept.html — 臺灣上奅（全頁改版 PR #42，文案更新 PR #49，UI polish PR #60）
- **主標題**：「臺灣上奅 Tâi-uân siōng phānn」（取代舊版 BLACK CURRENT）
- **中英雙語**：`html[lang="en"]` CSS 切換，掛在 lang-init.js `setLang()` 機制，零額外 JS
- **RWD**：四層斷點 1024 / 960 / 720 / 420，全部樣式寫在 `<style>` 內
- **區塊順序**：
  1. `.cp-hero` — 大標題 + romanji + meta bar（tagline · ~~MAY–SEP 2026~~ 已移除）
  2. `.cp-def` — MANIFESTO「上奅是一種態度」定義區（左漸層色邊線）
  3. `.cp-35` — 35 YEARS · TCCNY（大數字 sticky 左欄 + 右側三段文案）
  4. `.cp-feel` — 三大主題（Feel the Beat / Story / Vibe），每主題左右兩欄（描述 + KEY PROGRAMS 列表）
  5. `.cp-dna` — ~~CULTURAL DNA 小標已移除~~ 文化體質 DNA（多元族群・複軌歷史・東西交會）3 欄卡片
  6. `.cp-close` — 白底結尾「臺灣上奅。曼哈頓的臺灣日常。TAIWAN POP — Feel the POP.」
  7. `.cp-partners` — 七個場域（4 欄 grid）⚠️ 目前 `display:none` 隱藏，內容待文化部確認後恢復
- **三大主題分類**：Beat=粉紅、Story=藍、Vibe=綠（左側 4px 色條 + 數字/標題 text-shadow）
- **活動列表**（`.cp-theme-ev`）：
  - `.cp-theme-ev-title`：Bebas Neue，手機版 `1.6rem`（≤720px）/ `1.5rem`（≤420px）
  - 手機版正文全面 `1.25rem`（20px），提升易讀性
  - 注意：≤420px 有獨立 override，勿遺漏
- **PR #49 文案更新**：Hero/MANIFESTO/ORIGIN/Three Feels/Vibe 活動全面對齊文化部版本

### awe.html — a-we 紐約跑酷（a-we NYC Run）
- Chrome 小恐龍風格 Canvas 橫向捲軸遊戲（等速 SPEED=5）
- SPACE / ↑ / TAP 跳躍，跳越建築物顯示 4 秒活動 popup
- 碰撞後 GAME OVER，彈出名稱輸入 Modal
- Top 10 排行榜存入 Firebase Firestore `leaderboard` collection
- 兩欄佈局：遊戲左欄（Canvas 800×480）+ 排行榜右欄（sticky）
- 手機版：單欄，排行榜移至下方

### calendar.html — 行事曆
- 月視圖 + 近期活動清單，點擊開 modal
- **導覽列（PR #59）**：全幅 `PREV ← [JUNE 2026] → NEXT` 導航欄，雙語切換（ZH: 上個月/下個月，月份中文格式）
- **已移除**：`CALENDAR · 行事曆` 小標、`monthSub`（2026年6月）、upcoming 地點欄位、`UPCOMING · 即將登場` 重複小標
- **字體規範**：sidebar/legend/modal 元素 → `var(--fs-base)`；格子內元素適度調大（0.75–0.8rem）
- **Modal**：`max-height:85svh; overflow-y:auto` 防爆版；`word-break:break-word`；關閉按鈕統一 `✕`
- **手機版**：modal 關閉按鈕 `✕`（不帶文字）

### news.html — 最新消息列表
- 從 Firestore 抓取 `published: true` 的文章，依日期降序排列
- 分類篩選（官方公告 / 活動預告 / 專題報導 / 媒體報導）
- 每次顯示 9 篇，「載入更多」按鈕分頁
- 語言切換透過 `window.reRenderNews` hook
- 卡片標題（`.news-grid-title`）：`-webkit-line-clamp: 3`，超過 3 行顯示 `...`

### article.html — 文章詳情
- URL param: `?id=xxx`（Firestore document ID）
- 渲染封面圖、分類、日期、標題、富文本內容
- 支援 ZH/EN 切換
- Hero 左欄：「← 最新消息」置頂，meta + 標題垂直置中（`margin: auto 0`）
- 標題字體維持原始大小 `clamp(2.5rem, 5.5vw, 5.5rem)`，完整顯示不截斷

### twpop-manage/index.html — CMS 後台
- Firebase Auth Email/Password 登入保護
- **分頁標籤**：文章管理 / 展演活動
- **文章管理**：列表（含發布狀態）、新增 / 編輯 / 刪除、Quill.js 富文本（中英各一）、Storage 圖片上傳
- **展演活動**：依日期排序的 8 筆活動，每筆含即時顯示開關 → 寫入 `config/events_visibility`；預設 01/02/03/13 顯示，04/05/06/07 隱藏
- 後台 URL：`taiwanpop.tw/twpop-manage/`

---

## 展演活動資料（js/data.js）

### EVENTS array 欄位
```
num, img?, icon, date, endDate?, time?,
title, title_en, subtitle, subtitle_en,
location, location_full?,
desc, desc_en, long_desc?, long_desc_en?,
youtubeId?,
ensemble?: { name, name_en, bio, bio_en, photo?, logo?, website?, facebook?, instagram? },
program?: [ { zh, en, premiere? } ],
performers?: [ { instrument, instrument_en, name, name_en, bio, bio_en, website?, facebook?, instagram? } ],
performersLabel?, performersLabel_en?,
speakers?: [ { name, name_en, role, role_en, bio, bio_en, website?, facebook?, instagram? } ],
speakersLabel?, speakersLabel_en?,
gallery?: [ 'images/...' ],
category, isPrimary, externalUrl
```

### 三大分類與活動

**身體與聲音 sound（品紅 #FF2D6B）**
| num | 活動 | isPrimary | 詳情完成度 |
|-----|------|-----------|-----------|
| 02 | NSO《來自臺灣》室內樂巡演 | true | ✓ 完整（program 6首、ensemble NSO、performers 6人） |
| 06 | 翃舞製作《羽人》 | true | ✓ 完整（YouTube embed、ensemble+photo、gallery 17張） |
| 07 | Taiwanese Waves 2026 @ SummerStage | true | ✓ 完整（curator Mia、performers 5人） |

**影像與敘事 image（藍 #3B7FFF）**
| num | 活動 | isPrimary | 詳情完成度 |
|-----|------|-----------|-----------|
| 01 | 臺美藝文系列對談（林懷民 × ADF 等） | true | ✓ 完整（speakers: 林懷民、Jodee Nimerichter）；文案待文化部更新 |
| 04 | 世界之間：跨越疆界的臺灣電影 | true | 待更新 |
| 13 | 嚴俊傑鋼琴講座暨示範演出 | true | ✓ 完整（performers: 嚴俊傑）；文案待文化部更新 |

**街頭與生活 street（霓虹綠 #00ff00）**
| num | 活動 | isPrimary | 詳情完成度 |
|-----|------|-----------|-----------|
| 03 | 2026 紐約布希維克街頭藝術計畫 | true | ✓ 完整（ensemble The Bushwick Collective、performers 5人） |
| 05 | 2026 紐約同志遊行 | true | ✓ 完整（curator Nymphia Wind、performers Tina Banana + Yolanda Mesula） |

### 卡片規格
- `isPrimary: true`：大卡（3 欄），aspect-ratio 4:5，hover 分類色邊框+暈光
- `isPrimary: false`：小卡（4 欄），aspect-ratio 4:5
- 無圖片欄位 → fallback 到 icon 字元佔位
- 不足 3 張主卡時不再補 MORE TO COME 佔位符，留空即可
- **RWD**：960px→主卡 2 欄/次卡 2 欄；640px→主卡 1 欄；420px→次卡 1 欄

### Featured Banner 規格（全幅圖片 + 貼紙風，PR #43）
- 位置：展演活動頁頂部，navbar 正下方
- 資料源：`EVENTS` array（`js/data.js`），同步渲染（取代舊版 async fetch events.json）
- 選擇邏輯：① `featured: true` → ② `date >= today` 升序取第一筆 → ③ 全部過期取最新一筆
- 圖片欄位優先序：`bannerImg → imgInner → img`（8 筆活動已加入 `bannerImg`）
- 結構：`.featured-wrap > .featured-banner > [.fb-sticker][.fb-image-wrap][.fb-status]`
- `.fb-sticker`：粉紅斜 -6deg，`position:absolute; top:-1.6rem`，`overflow:visible` 確保不裁切
- `.fb-status`：黑底 + 綠燈（`@keyframes fb-pulse` 脈衝動畫）+ 日期 + 倒數天數 + CTA
- Hover：`translateY(-2px)`
- RWD：960px（tablet）/ 720px（CTA 換行）/ 420px（XS 縮字）

---

## a-we NYC Run 遊戲（awe.html）

- 引擎：HTML5 Canvas（800×480），`requestAnimationFrame`，`GROUND_Y=400`
- **a-we 遊戲暫時隱藏**（展示用）：navbar 連結、首頁 section、首頁 script 均以 `<!-- [AWE-HIDDEN] -->` 標記，恢復時取消註解
- 背景色：`#ede8d5`（暖米白）+ grain 顆粒紋理（3 幀 offscreen canvas 循環）
- **角色**：awe_v10_pink 造型
  - hitbox：w=86，h=125，sprite 依自然比例繪製置中
  - 走路：`awe_v10_pink-walk_right/left.png` 每 8 幀交替
  - 跳躍：`awe_v10_pink-26~30.png` 依 vy 速度對應（-22→26 起跳，0→28 最高點，+22→30 落地）
- **加速機制**：`SPEED_INIT=5`，`SPEED_MAX=12`，`speed = min(12, 5 + score × 0.006)`
  - 整數速度里程碑：顯示橙色 `SPEED UP!` 70 幀，左上角即時顯示 `SPD x.x`
  - restart 重置速度為 SPEED_INIT
- 障礙物：20 張紐約場景圖（`場景-01~20.png`），weighted 隨機生成（easy=3, med=2, hard=1），防最近 4 個重複
  - 使用 9-param drawImage 裁切 content bbox，正確比例無壓縮
  - hitbox：8% 水平邊距、5% 頂部邊距
  - 尺寸：原始計算值 × 80%，最寬 ~140px，最高 ~187px，間距 500–900px（pixel-space 恆定）
- 物理：跳躍 `vy=-22`，`gravity=0.68`，水平跳距依速度線性增加
- **活動 popup**：跳越建築物後觸發，畫在最底層（建築物 / 角色前渲染）
  - 復古 marquee 看板樣式（700×210px），深木色外框 + 紅橙霓虹環 + 暖奶油內容區
  - 燈泡每 280ms（`Date.now()` 驅動）交替亮滅
  - 字體：事件名稱 26px、地點日期 17px
  - GAME_EVENTS：NSO、翃舞《羽人》、Taiwanese Waves、砲臺舞蹈節、臺美藝文大師、世界之間臺灣電影、布希維克街頭藝術節、2026 紐約同志遊行
- 計分：每 6 幀 +1，GAME OVER 後顯示 Modal 輸入名稱
- 排行榜：Firestore `leaderboard` collection，Top 10 按 score 降序
- Firestore 規則：`allow create: if score int 1–9999，name string 1–20`

---

## 活動資訊 CMS（已完成）

### 架構
- **Firebase Firestore** — 文章資料，collection: `articles`
- **Firebase Storage** — 圖片上傳，路徑: `articles/{timestamp}_{filename}`
- **Firebase Auth** — 後台登入（Email/Password）
- **Quill.js 1.3.7** — 富文本 HTML 編輯器
- **twpop-manage/index.html** — 後台管理介面

### Firestore 安全性規則
```
match /articles/{articleId} {
  allow read: if resource.data.published == true;
  allow read, write: if request.auth != null;
}
match /config/{document} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

### Storage 安全性規則
```
match /articles/{allPaths=**} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

### Firestore 文章欄位（collection: articles）
```
title        string    標題（中文）
title_en     string    標題（英文）
category     string    官方公告 | 活動預告 | 專題報導 | 媒體報導
date         string    YYYY-MM-DD
content      string    HTML 富文本（中文，Quill 輸出）
content_en   string    HTML 富文本（英文，Quill 輸出）
coverImage   string    圖片 URL（Storage URL 或外部連結）
published    boolean   是否公開
createdAt    Timestamp
updatedAt    Timestamp
```

---

## i18n 語言架構

- `js/lang.js` — ZH/EN 字串物件
- `data-i18n="key"` — textContent 替換
- `data-i18n-html="key"` — innerHTML 替換
- `window.currentLang` — 當前語言（`zh` | `en`）
- `localStorage('twpop_lang')` — 持久化
- `lang-init.js` 必須最後載入，`setLang()` 呼叫後 re-render 所有動態區塊
- 動態頁面（news / article）透過 `window.reRenderNews` hook 響應語言切換
- **手機版 Navbar**（PR #59）：`components.js` mobile overlay 已移除右側 EN 縮寫（CONCEPT/NEWS 等）、社群連結 icon-only（移除文字）

---

## 工作流程

```bash
# 永遠使用 feature branch
git checkout -b feat/xxx
git add <files>
git commit -m "feat: 描述"
git push -u origin feat/xxx
gh pr create --title "..." --body "..."
gh pr merge [num] --merge --delete-branch
```

> GitHub Pages 在每次 merge to main 後自動部署，約 1–2 分鐘生效。

---

## 待辦事項（TO DO）

- [ ] 填入各活動 `externalUrl` 報名連結（直接改 data.js）
- [x] concept/calendar/index UI polish（PR #60）：concept 移除日期標籤/修正機構名稱/移除 DNA 小標/手機字體；calendar 全幅導覽列 + 雙語 + modal 修正；index 箭頭放大
- [x] 全站 `.lang-zh` / `.lang-en` 雙語 CSS 移至 tp-shared.css 全局（PR #60）
- [x] P10–P13 events cleanup + calendar 大改版 + 手機版 nav（PR #59）：events 分類標題/副標題/i18n；event-detail 精簡 hero/labels/按鈕；calendar PREV/NEXT 導覽列、字體調大、modal 優化；手機版 nav icon-only
- [ ] concept.html Partners 區塊：待文化部確認場域名單後恢復（移除 `display:none`）
- [ ] footer YouTube 連結補齊（目前 `href="#"`）
- [ ] data.js Events 05/06/07 文案（title/subtitle/desc/long_desc）— 待文化部提供
- [ ] GitHub Pages 啟用 Enforce HTTPS
- [x] 文案調整：index.html「臺灣尚趴」→「臺灣上奅」；event 01 林懷民移除 IG、Jodee 移除 website & IG（PR #53）
- [x] 行事曆同步套用 eventsVisibility 過濾（PR #52）
- [x] Footer TCC logo 換檔（PR #51）
- [x] 活動顯示開關（Firestore config/events_visibility）、後台展演活動分頁、社群連結補齊（PR #50）
- [x] 文化部第一輪文案修改：lang.js、events.js、data.js、components.js、index/news/calendar/concept.html（PR #49）
- [x] EN bc-tag 改為「CONCEPT · TAIWAN POP」、concept.html 移除兩句 strong 標籤（PR #48）
- [x] 互動效果：bc-row Color Takeover、spray-band 自動循環點亮、Banner 影片更換（PR #47）
- [x] news.html 卡片標題 line-clamp、article.html 內頁回上頁置頂 + 標題置中（PR #47）
- [x] 移除 concept.html「曼哈頓文化黑潮計畫」callout 區塊（PR #44）
- [x] 首頁 Showcase 改版：Logo + 7/3/1 數據左右並排兩欄 Grid（PR #43）
- [x] 首頁展演主題區塊新增「展演主題 / EVENT THEMES」標題（PR #43）
- [x] 全站導覽「黑潮理念」→「策展理念」/ 「Black Current」→「Curatorial Vision」→ EN 再改為「TAIWAN POP」（PR #43、#48）
- [x] 首頁 bc-row 改為「臺灣上奅 SIŌNG PHĀNN」策展理念文案（PR #43）
- [x] 展演活動 Featured Banner 重設計：全幅圖片 + 粉紅貼紙 + 綠燈狀態列（PR #43）
- [x] Event hero 圖片裁切修正：移除 `height:80vh`，高度由圖片自然撐開（PR #43）
- [x] 全站英文翻譯補全：concept.html（22 個 data-i18n）、index.html stats/CTA、news.html 篩選器與分類 badge、calendar.html 近期活動
- [x] concept.html 全頁改版為「臺灣上奅」設計（PR #42），加入官方英文翻譯全頁雙語
- [x] NSO 與翃舞製作購票連結上線（PR #40、#41）
- [x] 全站「紐約文化局」→「Taipei Cultural Center in NY」校正
- [x] concept.html TCCNY 合作背景與計畫緣起文案更新
- [x] 全站 RWD：article / events / calendar / concept / event.html 補齊斷點
- [x] Featured Banner 改版為 Ticket Stub 票根風（data/events.json 驅動，分類色系）
- [x] 行事曆時區修正：buildDayMap 改用 localDateKey、預設當月、移除 firstEvent 跳月邏輯
- [x] 新增活動 num:13 嚴俊傑鋼琴講座（sound, isPrimary:true）
- [x] 刪除 5 個待更新佔位活動（num 08/09/10/11/12）
- [x] 移除 events.html MORE TO COME 佔位符
- [x] Footer 改用 logo 圖片（taiwanpop_green.png）
- [x] Event detail 全面升級：video embed、gallery、ensemble photo、social icon 按鈕
- [x] Events 01–03、05–07、13 詳情頁資料完整填入
- [x] 建立 Firebase 專案，實作活動資訊 CMS
- [x] 以 a-we NYC Run Canvas 跑酷遊戲取代文化大富翁
- [x] 更新 Firestore 安全規則：加入 leaderboard collection 資料驗證
