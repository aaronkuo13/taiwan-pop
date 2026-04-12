# Taiwan Pop Project Memory

## Project Overview
Static website for "Taiwan Pop" project — 台灣流行音樂推廣計畫

## File Structure
```
/Users/aaron/taiwanpop/
├── index.html          # Main single-page site
├── css/style.css       # All styles (~1100 lines)
├── js/main.js          # Calendar, modal, navbar, scroll-reveal
├── images/             # Empty — user needs to add real images
├── CNAME               # Placeholder (not committed) — fill with real domain
├── .gitignore
└── .claude/launch.json # Dev server: python3 -m http.server 3000
```

## GitHub
- Repo: https://github.com/aaronkuo13/taiwan-pop
- SSH: git@github.com:aaronkuo13/taiwan-pop.git
- Live URL: https://aaronkuo13.github.io/taiwan-pop
- Branch: main, GitHub Pages enabled (Deploy from branch)

## Tech Stack
- Pure static HTML/CSS/JS — no frameworks, no build tools
- Fonts: Montserrat + Noto Sans TC (Google Fonts)
- Dev server: `python3 -m http.server 3000` (preview server ID may change)

## Design
- Color primary: #00FF00 (neon green), accent: #F52281 (neon pink), secondary: #0082D2 (blue), dark bg: #0D1B2A
- Global Background: `images/Taiwan Pop_Supporting Graphic 3_星光背景_拆圖版.webp` (fixed attachment)
- Vibe: Cyberpunk / Cosmic space theme
- YouTube banner video ID: OBHgltFLVK0 (autoplay, muted, loop)

## Sections
1. Navbar — sticky, transparent→white on scroll, hamburger mobile menu
2. Banner — YouTube fullscreen video bg + overlay text
3. Articles — 4 cards with picsum.photos placeholders
4. Events — 7 dark cards (七大主題活動)
5. Calendar — vanilla JS month view, event dots clickable → modal popup
6. ~~Gallery~~ — **已移除**
7. Footer — 3-col grid, social icons

## Event Data (js/main.js top — EVENTS array)
All 6 events defined with: num, icon, date, title, location, desc
Dates: 04-15, 04-22, 05-01, 05-15, 06-20, 07-10 (all 2026)

## TODO for User
- Replace picsum.photos images with real Taiwan Pop photos (put in images/)
- Update EVENTS array in js/main.js with real dates/locations/descriptions
- Add CNAME file with real domain when ready, then configure DNS
- Update footer contact info and social media links

## 文化大富翁 Board Game (feat/board-game)

### 棋盤規格
- 畫布：1080 × 760 px（橫向長方形），響應式縮放（CSS transform）
- 角格（4個）：100 × 100 px
- 上下邊一般格（各11格）：80 × 100 px
- 左右邊一般格（各7格）：100 × 80 px
- 示意圖：images/board-template.svg

### 40格配置（順時針，從左下出發）
底部[0-12]：[0]START | [1-3]林懷民 | [4]機會 | [5-7]NSO | [8]命運 | [9-11]布希維克 | [12]機會角(BR)
右側[13-20]：[13]免費通過 | [14-16]影展 | [17]命運 | [18-19]同志① | [20]命運角(TR)
頂部[21-32]：[21]同志③ | [22]機會 | [23-25]翃舞 | [26]命運 | [27-29]夏日舞台 | [30]休息 | [31]免費通過 | [32]機會角(TL)
左側[33-39]：[33]命運 | [34]免費 | [35]休息 | [36]免費 | [37]機會 | [38]免費 | [39]命運

### 角色
- a-we（玩家）：images/awe-front/back/left/right.png（需使用者提供）
- yoyo（電腦）：images/yoyo-front/back/left/right.png（已加入 repo）
- 方向邏輯：底部→right, 右側→back, 頂部→left, 左側→front
- 兩棋子偏移 ±14px 避免重疊

### 遊戲規則
- 答對留在格子，答錯退回原格（顯示正確答案）
- 踩過的格子：同一題重複出現（加深學習）；Set 追蹤每位玩家踩過的格子
- yoyo 正確率：CPU_HIT_RATE_NORM=50%，CPU_HIT_RATE_SEEN=80%（重複格）
- 骰子動畫：DICE_FACES ⚀-⚅ 在角色頭上滾動14幀 → 停定 → 逐格移動 200ms/格
- 獲勝：繞三圈 → 顯示 awe-complete.png（人類獲勝時）
- 角格機會/命運：抽牌；free格：直接過
- TOTAL_LAPS=3，chancePool/fatePool 各10張（抽完重洗）

### 機會卡（10張，實際內容）
前進3/2/4/3/2/3格、再骰一次(×2)、移動到出發點、後退2格

### 命運卡（10張，實際內容）
後退3/4/2/1/2格、前進2/3/2格、停一回合(×2)

### 題庫（js/main.js GAME_DATA）
七大活動各3題（qIdx:0,1,2）：lin-hwai-min, nso-paiwan, bushwick, film, pride, horse, summerstage

## Workflow: Update & Deploy
**Always use PR — never push directly to main.**
```bash
cd /Users/aaron/taiwanpop
# edit files, then commit to a feature branch...
git checkout -b <branch-name>
git add <files>
git commit -m "描述"
git push -u origin <branch-name>
gh pr create --title "..." --body "..."
```
GitHub Pages auto-deploys on every merge to main.
