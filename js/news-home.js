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
    grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px 0;grid-column:1/-1">暫無最新消息</p>';
    return;
  }

  grid.innerHTML = articles.slice(0, 3).map(a => {
    const title = (lang === 'en' && a.title_en) ? a.title_en : (a.title || '');
    const content = (lang === 'en' && a.content_en) ? a.content_en : (a.content || '');
    const desc = excerpt(content);
    const cat = a.category || '';
    const img = a.coverImage || `https://picsum.photos/600/400?random=${a.id.slice(0, 6)}`;
    return `
      <article class="article-card">
        <a href="article.html?id=${a.id}" class="article-img-wrap">
          <img src="${img}" alt="${title}" loading="lazy">
          <span class="article-cat">${cat}</span>
        </a>
        <div class="article-body">
          <span class="article-date">${formatDate(a.date)}</span>
          <h3><a href="article.html?id=${a.id}">${title}</a></h3>
          <p>${desc}</p>
        </div>
      </article>`;
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
