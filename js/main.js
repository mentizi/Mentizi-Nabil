let currentLang = 'fr';

// Charger la langue par défaut
loadLanguage(currentLang);

// Gestion du changement de langue
document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    if (lang !== currentLang) {
      currentLang = lang;
      loadLanguage(lang);
    }
  });
});

function loadLanguage(lang) {
  const script = document.createElement('script');
  script.src = `assets/js/lang/${lang}.js`;
  script.onload = () => updateContent(window.langData);
  document.head.appendChild(script);
}

function updateContent(data) {
  document.getElementById('name').textContent = data.name;
  document.getElementById('role').textContent = data.role;
  document.getElementById('description').textContent = data.description;
  document.getElementById('skillsTitle').textContent = data.skillsTitle;

  const list = document.getElementById('skillsList');
  list.innerHTML = "";
  data.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    list.appendChild(li);
  });

  document.getElementById('contactTitle').textContent = data.contactTitle;
  document.getElementById('email').textContent = data.email;
  document.getElementById('footer').textContent = data.footer;
}
