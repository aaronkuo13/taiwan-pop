import { db } from './firebase.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

let cachedArticles = null;

function getLang() {
  return window.currentLang || localStorage.getItem('twpop_lang') || 'zh';
}

function excerpt(html, maxLen = 80) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  const text = (tmp.textContent || tmp.innerText || '').trim();
  return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
}

function formatDate(str) {
  return (str || '').replace(/-/g, '.');
}

function renderHomeArticles(articles) {
  const grid = document.querySelector('#articles .articles-grid');
  if (!grid) return;
  const lang = getLang();

  if (!articles || articles.length === 0) {
    grid.innerHTML = `
      <div class="news-empty-state">
        <span class="news-empty-icon">—</span>
        <p class="news-empty-title">${lang === 'en' ? 'No news yet' : '暫無最新消息'}</p>
        <p class="news-empty-sub">${lang === 'en' ? 'Check back soon for updates.' : '請稍後再回來查看最新動態'}</p>
      </div>`;
    return;
  }

  grid.innerHTML = articles.slice(0, 5).map(a => {
    const title = (lang === 'en' && a.title_en) ? a.title_en : (a.title || '');
    return `
      <a href="article.html?id=${a.id}" class="news-list-item">
        <span class="news-list-date">${formatDate(a.date)}</span>
        <span class="news-list-headline">${title}</span>
        <span class="news-list-arrow">→</span>
      </a>`;
  }).join('');
}

async function loadHomeArticles() {
  try {
    const q = query(collection(db, 'articles'), where('published', '==', true));
    const snapshot = await getDocs(q);
    const articles = [];
    snapshot.forEach(doc => articles.push({ id: doc.id, ...doc.data() }));
    articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    cachedArticles = articles;
    renderHomeArticles(articles);
  } catch (err) {
    console.error('載入文章失敗', err);
  }
}

window.reRenderNews = function () {
  if (cachedArticles) renderHomeArticles(cachedArticles);
};

loadHomeArticles();
