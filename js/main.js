// main.js - gestion multilingue + insertion dynamique du contenu
const LANG_PATH = 'js/lang/';
let currentLang = localStorage.getItem('lang') || 'fr';

// util
function q(id){ return document.getElementById(id); }

// charger le fichier de langue (cache bust pour forcer reload si nécessaire)
function loadLang(lang){
  return new Promise((resolve, reject) => {
    // supprimer ancien script s'il existe
    const old = document.getElementById('lang-script');
    if(old) old.remove();

    const s = document.createElement('script');
    s.id = 'lang-script';
    s.src = `${LANG_PATH}${lang}.js`;
    s.onload = () => resolve(window.langData);
    s.onerror = () => reject(new Error('Impossible de charger la langue'));
    document.head.appendChild(s);
  });
}

function applyContent(data){
  // header
  q('nameHeader').textContent = data.nameHeader || data.name;
  q('roleHeader').textContent = data.role;

  // hero
  q('heroTitle').textContent = data.heroTitle;
  q('heroSubtitle').textContent = data.heroSubtitle;
  q('contactMail').href = `mailto:${data.email}`;
  q('linkGithub').href = data.github;

  // card
  q('nameCard').textContent = data.name;
  q('roleCard').textContent = data.role;

  // about
  q('aboutTitle').textContent = data.aboutTitle;
  q('aboutText').textContent = data.about;

  // skills
  q('skillsTitle').textContent = data.skillsTitle;
  const skillsList = q('skillsList');
  skillsList.innerHTML = '';
  data.skills.forEach(s => {
    const el = document.createElement('div');
    el.className = 'skill-pill';
    el.textContent = s;
    skillsList.appendChild(el);
  });

  // experiences
  q('expTitle').textContent = data.expTitle;
  const expList = q('expList');
  expList.innerHTML = '';
  (data.experience || []).forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `<h4>${item.title} <small style="color:var(--muted);font-weight:600"> — ${item.period}</small></h4>
                    <p>${item.desc}</p>`;
    expList.appendChild(el);
  });

  // contact & footer
  q('contactTitle').textContent = data.contactTitle;
  q('email').textContent = data.email;
  q('footerText').textContent = data.footer;

  // animations: trigger show
  document.querySelectorAll('.animated').forEach((el, i) => {
    setTimeout(()=>el.classList.add('show'), 120 * i);
  });
}

// gestion boutons langue
document.addEventListener('DOMContentLoaded', async ()=>{
  const buttons = document.querySelectorAll('.lang-switch .lang');
  buttons.forEach(b => {
    b.addEventListener('click', async (e) => {
      const lang = b.getAttribute('data-lang');
      if(lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem('lang', lang);
      buttons.forEach(x=>x.classList.toggle('active', x===b));
      try {
        const data = await loadLang(lang);
        applyContent(data);
      } catch(err){
        console.error(err);
      }
    });
    // set active class initial
    if(b.getAttribute('data-lang') === currentLang) b.classList.add('active');
  });

  // charger langue initiale
  try {
    const data = await loadLang(currentLang);
    applyContent(data);
  } catch(e){
    console.error(e);
  }
});
