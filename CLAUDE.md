# Taiwan Pop — Claude 工作規範

## 規則 1：先規劃，確認後執行

收到任何需求後，**必須先提出規劃說明**，明確等待使用者確認，才開始執行任何檔案修改或指令。

規劃說明必須包含：
- 要修改哪些檔案
- 每個檔案的具體改動內容
- 可能連帶影響的其他地方

**不可以在說明規劃的同時就開始執行。**

---

## 規則 2：執行完先等測試，再推 PR

執行完成後：
1. 告知使用者「已完成，請測試」
2. **等使用者明確說測試 OK，才執行 `gh pr create`**
3. 發 PR 前，必須提供以下格式的變動摘要

### PR 前必須提供的變動摘要格式

| 檔案 | 變動類型 | 說明 | 可能影響範圍 |
|------|---------|------|------------|
| css/tp-shared.css | 修改 | 新增 .lang-zh/.lang-en 規則 | 全站所有含 lang class 的元素 |
| concept.html | 修改 | 移除 CULTURAL DNA section | 只影響 concept 頁 |

「可能影響範圍」欄位必須誠實填寫，包含意料外的副作用。

---

## 規則 3：Merge 後更新 PRD

每次 PR merge 完成後，**不需等使用者提醒**，主動更新：

```
/Users/aaron/taiwanpop/.claude/PROJECT_SPEC.md
```

確保 PRD 永遠反映最新狀態。

---

## 專案快速參照

- **Live URL**: https://taiwanpop.tw
- **Repo**: https://github.com/aaronkuo13/taiwan-pop
- **Dev server**: `python3 -m http.server 3000`（在 /Users/aaron/taiwanpop）
- **完整規格**: `/Users/aaron/taiwanpop/.claude/PROJECT_SPEC.md`
- **最小字體**: `--fs-base: 1.125rem`（18px），任何可見文字不得低於此值
- **雙語機制**: `data-i18n` 屬性 + `js/lang.js` + `.lang-zh` / `.lang-en` CSS class

---

## Component Map — 想改什麼，去哪裡找

### 共用元件（改一個地方，全站生效）

| 想改的功能 | 檔案 | 備註 |
|-----------|------|------|
| 導覽列（桌機 + 手機）| `js/components.js` | nav + mobile overlay 都在這裡 |
| 頁尾 | `js/components.js` | footer HTML 在這裡 |
| 語言切換按鈕 | `js/components.js` | 中/EN 按鈕邏輯 |
| 語言初始化、getLang() | `js/lang-init.js` | setLang、URL ?lang= 解析 |
| 所有雙語文字 | `js/lang.js` | LANG.zh / LANG.en 物件 |
| 設計系統（顏色、字型、間距）| `css/tp-shared.css` | CSS variables 全在這裡 |
| Scroll reveal 動畫 | `js/reveal.js` | 全站 `.reveal` class |
| 所有活動資料 | `js/data.js` | EVENTS 陣列，含雙語欄位 |

### 頁面專屬元件

| 頁面 | HTML | 專屬 JS | 樣式位置 |
|------|------|---------|---------|
| 首頁 | `index.html` | `js/news-home.js` | `css/style.css` |
| 策劃理念 | `concept.html` | `js/concept-accordion.js` | `concept.html` 內的 `<style>` |
| 展演活動列表 | `events.html` | `js/events.js` | `css/style.css` |
| 活動詳情 | `event.html` | `js/event-detail.js` | `css/style.css` |
| 行事曆 | `calendar.html` | `calendar.html` 內的 `<script>` | `calendar.html` 內的 `<style>` |
| 最新消息 | `news.html` | `news.html` 內的 `<script>` + Firebase | `css/style.css` |
| 新聞文章 | `article.html` | `article.html` 內的 `<script>` + Firebase | `css/style.css` |
| AWE 遊戲 | `awe.html` | `js/awe-game.js` | `css/style.css` |

### 標準 Script 載入順序（所有頁面）

```html
<script src="js/lang.js"></script>
<script src="js/data.js"></script>
<script src="js/components.js"></script>
<script src="js/navbar.js"></script>
<script src="js/reveal.js"></script>
<script src="js/lang-init.js"></script>
<!-- 頁面專屬 script 加在最後 -->
```

⚠️ **新增全站 script 時，必須同步更新全部 8 個 HTML 檔案。**

### 高風險改動（牽連多個檔案）

| 改動類型 | 需要同步的檔案 |
|---------|-------------|
| 修改 `js/data.js`（新增/修改活動） | 所有載入 data.js 的 HTML（11 個檔案）script 標籤升版本號（如 `data.js?v=2`）。GitHub Pages 快取 10 分鐘，不升版會導致舊快取查無新活動 → event.html 強制導回列表頁 |
| 新增活動到 data.js，或修改既有活動的標題/日期 | 同上 + 同步更新 `twpop-manage/index.html` 的 `EVENTS_META` 陣列（後台清單是寫死的，不讀 data.js，新增漏加會沒有顯示開關；修改漏改會導致後台顯示舊標題/日期） |
| 新增導覽列連結 | `js/components.js` + `js/lang.js`（zh + en 各加一筆） |
| 修改 CSS variable 名稱 | `css/tp-shared.css` + 所有用到該變數的 CSS/HTML |
| 新增全站 script | 全部 8 個 HTML 檔案 |
| 修改 `data-i18n` key 名稱 | `js/lang.js` + 所有用到該 key 的 HTML |
| 修改 Firebase 結構 | `js/firebase.js` + `news.html` + `article.html` |
